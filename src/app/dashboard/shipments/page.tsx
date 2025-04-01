import { ShipmentsDataTable } from "@/components/features/dashboard/shipments/shipmane.table";
import { prisma } from "@/constants/config/db";
import { redirect } from "next/navigation";
import { auth } from "~/auth";

const ShipmentsPage = async () => {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login");
  }

  const data = await prisma.shipment.findMany({
    include: { TrackingUpdates: true },
  });

  const shipments = data.map((shipment) => ({
    ...shipment,
    estimatedDelivery: shipment.estimatedDelivery
      ? shipment.estimatedDelivery.toISOString()
      : null,
    createdAt: shipment.createdAt.toISOString(),
  }));

  return (
    <div>
      <ShipmentsDataTable data={shipments} />
    </div>
  );
};
export default ShipmentsPage;
