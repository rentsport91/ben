// ShipmentLabelGenerator.js
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { Shipment } from "./shipment.page";

const ShipmentLabelGenerator = ({
  shipment,
  onClose,
}: {
  shipment: Shipment;
  onClose: () => void;
}) => {
  // Function to handle printing
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className=" p-4">
      <Card className=" mx-auto border-2 border-gray-800">
        <CardContent className="px-4">
          <div className="mb-2 text-center">
            <p className="text-sm text-gray-500">Tracking Number</p>
            <p className="font-bold text-lg">{shipment.tracking_number}</p>
          </div>

          <div className="border-t border-gray-300 my-2"></div>

          <div className="mb-4">
            <p className="text-sm text-gray-500">FROM:</p>
            <p className="font-bold">Shipping Origin</p>
            <p className="text-sm">{shipment.origin}</p>
            <p className="text-sm">Date: {shipment.date}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500">TO:</p>
            <p className="font-bold">{shipment.recipient.name}</p>
            <p className="text-sm">{shipment.destination}</p>
            <p className="text-sm">Expected Delivery: {shipment.eta}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500">Package Details</p>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-sm">
                <span className="font-bold">Weight:</span> {shipment.weight}
              </p>
              <p className="text-sm">
                <span className="font-bold">Items:</span> {shipment.items}
              </p>
              <p className="text-sm">
                <span className="font-bold">Type:</span> {shipment.type}
              </p>
              <p className="text-sm">
                <span className="font-bold">Value:</span> {shipment.value}
              </p>
              <p className="text-sm">
                <span className="font-bold">Status:</span>{" "}
                {shipment.status.charAt(0).toUpperCase() +
                  shipment.status.slice(1)}
              </p>
            </div>
          </div>

          <div className="flex justify-between mb-4">
            <svg
              className="w-32 h-16"
              viewBox="0 0 100 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="5" y="10" width="5" height="20" fill="black" />
              <rect x="15" y="5" width="5" height="30" fill="black" />
              <rect x="25" y="15" width="5" height="10" fill="black" />
              <rect x="35" y="0" width="5" height="40" fill="black" />
              <rect x="45" y="10" width="5" height="20" fill="black" />
              <rect x="55" y="5" width="5" height="30" fill="black" />
              <rect x="65" y="15" width="5" height="10" fill="black" />
              <rect x="75" y="0" width="5" height="40" fill="black" />
              <rect x="85" y="10" width="5" height="20" fill="black" />
              <rect x="95" y="5" width="5" height="30" fill="black" />
            </svg>

            {/* Dummy QR Code */}
            <svg
              className="w-16 h-16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="3" width="7" height="7" fill="black" />
              <rect x="3" y="13" width="7" height="7" fill="black" />
              <rect x="13" y="3" width="7" height="7" fill="black" />
              <rect x="13" y="13" width="7" height="7" fill="black" />
              <rect x="5" y="5" width="3" height="3" fill="white" />
              <rect x="15" y="5" width="3" height="3" fill="white" />
              <rect x="5" y="15" width="3" height="3" fill="white" />
            </svg>
          </div>

          <div className="border-t border-gray-300 my-2"></div>
        </CardContent>

        <div className="flex justify-center print:hidden">
          <Button
            onClick={handlePrint}
            className="bg-gray-800 hover:bg-gray-900 mr-4"
          >
            <Printer className="mr-2 h-4 w-4" />
            Print Label
          </Button>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ShipmentLabelGenerator;
