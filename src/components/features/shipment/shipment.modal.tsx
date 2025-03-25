// ShipmentLabelModal.js
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ShipmentLabelGenerator from "./shipment.label";
import { Shipment } from "./shipment.page";

type ShipmentLabelTypes = {
  shipment: Shipment;
  isOpen: boolean;
  onClose: () => void;
};

const ShipmentLabelModal = ({
  shipment,
  isOpen,
  onClose,
}: ShipmentLabelTypes) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-4 overflow-hidden">
        <ShipmentLabelGenerator shipment={shipment} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ShipmentLabelModal;
