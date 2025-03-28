import { Package } from "lucide-react";
import Link from "next/link";

export const ShipmentStatus = () => (
  // use prisma to check of shipment that is active
  <div>
    <Link
      href="/shipments"
      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
    >
      <Package size={18} className="text-secondary" />
      <span>Active: 1</span>
    </Link>
  </div>
);
