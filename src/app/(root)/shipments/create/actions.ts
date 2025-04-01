/* eslint-disable @typescript-eslint/no-explicit-any */
// app/actions/shipment.ts
"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/constants/config/db";
import { shipmentSchema } from "@/store/schema";
import { auth } from "~/auth";

// Helper function to generate a tracking number
function generateTrackingNumber(): string {
  // Example: Generate a random alphanumeric string prefixed with 'TRK-'
  return "EUS-" + Math.random().toString(36).substring(2, 10).toUpperCase();
}

// Helper function to calculate estimated delivery based on serviceType
function calculateEstimatedDelivery(serviceType: string): Date {
  const now = new Date();
  let daysToAdd = 5; // default for "standard"
  switch (serviceType.toLowerCase()) {
    case "express":
      daysToAdd = 2;
      break;
    case "economy":
      daysToAdd = 10;
      break;
    case "standard":
    default:
      daysToAdd = 5;
      break;
  }
  now.setDate(now.getDate() + daysToAdd);
  return now;
}

export async function createShipment(formData: FormData) {
  try {
    // Get the current user
    const session = await auth();
    if (!session?.user?.id) {
      return {
        error: "Unauthorized. Please sign in to create a shipment.",
      };
    }

    // Parse formData into an object
    const rawFormData: Record<string, any> = {};
    formData.forEach((value, key) => {
      // Handle recipient specially: expect a JSON string
      if (key === "recipient") {
        try {
          rawFormData.recipient = JSON.parse(value as string);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          rawFormData.recipient = value;
        }
      }
      // Handle packages as a special case
      else if (key.startsWith("packages[")) {
        const match = key.match(/packages\[(\d+)\]\.(\w+)/);
        if (match) {
          const [, index, field] = match;
          if (!rawFormData.packages) {
            rawFormData.packages = [];
          }
          if (!rawFormData.packages[parseInt(index)]) {
            rawFormData.packages[parseInt(index)] = {};
          }
          // Convert boolean values for fields like dangerous or insurance
          if (field === "dangerous" || field === "insurance") {
            rawFormData.packages[parseInt(index)][field] = value === "true";
          } else {
            rawFormData.packages[parseInt(index)][field] = value;
          }
        }
      } else {
        rawFormData[key] = value;
      }
    });

    // Validate using Zod schema
    const validatedData = shipmentSchema.parse(rawFormData);
    const { packages, recipient, ...shipmentData } = validatedData;

    // Generate server-side fields
    const trackingNumber = generateTrackingNumber();
    // Calculate estimatedDelivery based on the serviceType from shipmentData
    const estimatedDelivery = calculateEstimatedDelivery(
      shipmentData.serviceType
    );
    const deliveredAt = null; // not delivered yet
    const isPaid = false; // default payment status

    // Create shipment record with server-generated fields
    const result = await prisma.shipment.create({
      data: {
        ...shipmentData,
        recipient: { create: recipient },
        trackingNumber,
        estimatedDelivery,
        deliveredAt,
        isPaid,
        Sender: { connect: { id: session.user.id } },
        TrackingUpdates: {
          create: {
            message: "Shipment created",
            status: "Proccessing",
            // You can optionally include location or other fields here if needed.
          },
        },
      },
    });

    // Create nested package records for the shipment
    await prisma.package.createMany({
      data: packages.map((item) => ({
        ...item,
        shipmentId: result.id,
      })),
    });

    revalidatePath("/shipments");

    return {
      success: true,
      shipmentId: result.id,
      message: "Shipment created successfully",
    };
  } catch (error: any) {
    console.error("Error creating shipment:", error);
    if (error.name === "ZodError") {
      return {
        error: "Validation error",
        issues: error.issues,
      };
    }
    return {
      error: "Failed to create shipment. Please try again.",
    };
  }

  revalidatePath("/shipments");
}
