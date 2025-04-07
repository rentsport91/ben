"use server";

import { auth } from "~/auth";
import { prisma } from "@/constants/config/db";

export async function getShipmentHistory(page = 1, limit = 10) {
  const session = await auth();
  if (!session?.user) {
    return {
      error: "You must be logged in to view shipment history",
    };
  }

  try {
    const skip = (page - 1) * limit;

    const shipments = await prisma.shipment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    const totalCount = await prisma.shipment.count({
      where: {
        userId: session.user.id,
      },
    });

    return {
      success: true,
      shipments,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching shipment history:", error);
    return {
      success: false,
      error: "Failed to fetch shipment history",
    };
  }
}
