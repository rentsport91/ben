"use server";

import { prisma } from "@/constants/config/db"; // Adjust the import based on your Prisma client location
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "~/auth";

// Define the expected schema for the form data, with a preprocessor for trackingUpdateId.
const updateTrackingStatusSchema = z.object({
  shipmentId: z.string().nonempty(),
  trackingUpdateId: z.preprocess(
    (val) => (val === null ? undefined : val),
    z.string().optional()
  ),
  location: z.string().nonempty(),
  message: z.string().nonempty(),
  // Define allowed statuses – adjust these values as needed
  status: z.enum([
    "pending",
    "on_hold",
    "in_transit",
    "delivered",
    "returned",
    "failed",
    "picked_up",
    "information_received",
  ]),
});

export async function updateTrackingStatus(formData: FormData) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    return redirect("/login");
  }

  // Extract form values into an object
  const rawData = {
    shipmentId: formData.get("shipmentId"),
    trackingUpdateId: formData.get("trackingUpdateId"),
    location: formData.get("location"),
    message: formData.get("message"),
    status: formData.get("status"),
  };

  // Validate and parse the form data using Zod
  const parsedData = updateTrackingStatusSchema.safeParse(rawData);
  if (!parsedData.success) {
    console.error("Validation failed:", parsedData.error.flatten());
    throw new Error("Invalid form data");
  }

  const { shipmentId, trackingUpdateId, location, message, status } =
    parsedData.data;

  const shipmentExists = await prisma.shipment.findUnique({
    where: { id: shipmentId },
  });
  if (!shipmentExists) {
    throw new Error(`Shipment with id ${shipmentId} does not exist.`);
  }

  try {
    if (trackingUpdateId && trackingUpdateId.trim() !== "") {
      // Update an existing tracking update
      await prisma.trackingUpdate.update({
        where: { id: trackingUpdateId },
        data: { location, message, status },
      });
    } else {
      // Create a new tracking update
      await prisma.trackingUpdate.create({
        data: {
          shipment: { connect: { id: shipmentId } },
          location,
          message,
          status,
        },
      });
    }
  } catch (error) {
    console.error("Error updating tracking status:", error);
    throw error;
  }
}
