// app/shipments/page.tsx
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "~/auth";

import { prisma } from "@/constants/config/db";
import { ShipmentsPage } from "@/components/features/shipment/shipment.page";
import { ShipmentStatus } from "@/components/features/shipment/shipment.page";

export const metadata: Metadata = {
  title: "My Shipments | Shipping Dashboard",
  description: "Manage and track all your shipments in one place",
};

export default async function ShipmentsRoute() {
  // Check authentication
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  // Get shipments from database
  const shipments = await prisma.shipment.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      originAddress: true,
      originCity: true,
      originState: true,
      originCountry: true,
      destinationAddress: true,
      destinationCity: true,
      destinationState: true,
      destinationCountry: true,
      createdAt: true,
      estimatedDelivery: true,
      deliveredAt: true,
      trackingNumber: true,
      packages: {
        select: {
          id: true,
          weight: true,
          description: true,
          packageType: true,
          declaredValue: true,
        },
      },
      recipient: {
        select: {
          name: true,
          company: true,
          email: true,
          phone: true,
        },
      },
      serviceType: true,
      TrackingUpdates: {
        orderBy: {
          timestamp: "desc",
        },
        take: 1,
        select: {
          message: true,
          status: true,
          location: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Transform the Prisma data to match our client component's expected format
  const formattedShipments = shipments.map((shipment) => {
    const origin = `${shipment.originCity}, ${shipment.originCountry}`;
    const destination = `${shipment.destinationCity}, ${shipment.destinationCountry}`;

    // Calculate total weight and value
    const totalWeight = shipment.packages.reduce(
      (acc, pkg) => acc + (pkg.weight || 0),
      0
    );
    const totalValue = shipment.packages.reduce(
      (acc, pkg) => acc + (pkg.declaredValue || 0),
      0
    );

    // Format dates
    const dateFormatted = new Date(shipment.createdAt).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );

    const etaFormatted = shipment.estimatedDelivery
      ? new Date(shipment.estimatedDelivery).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "N/A";

    const deliveredFormatted = shipment.deliveredAt
      ? new Date(shipment.deliveredAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : null;

    return {
      id: shipment.id,
      tracking_number: shipment.trackingNumber,
      origin: origin,
      destination: destination,
      date: dateFormatted,
      eta: etaFormatted,
      delivered: deliveredFormatted,
      items: shipment.packages.length,
      weight: `${totalWeight.toFixed(1)} kg`,
      type: shipment.serviceType,
      value: `$${totalValue.toFixed(2)}`,
      status: shipment.TrackingUpdates[0].status as ShipmentStatus,

      lastUpdate:
        shipment.TrackingUpdates[0]?.message || "No updates available",
      recipient: {
        name: shipment.recipient.name,
      },
    };
  });

  return <ShipmentsPage shipments={formattedShipments} />;
}
