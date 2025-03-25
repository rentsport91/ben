"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateTrackingStatus } from "@/app/dashboard/shipments/action";
import type { Shipment } from "./shipmane.table"; // adjust the path as needed

interface TrackingUpdateSheetProps {
  shipment: Shipment;
  trackingUpdateId?: string;
  onClose?: () => void;
}

export function TrackingUpdateSheet({
  shipment,
  trackingUpdateId,
  onClose,
}: TrackingUpdateSheetProps) {
  const [open, setOpen] = React.useState(true);
  const [isPending, setIsPending] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(formRef.current!);
    // Include shipment id and, if applicable, the tracking update id.
    formData.set("shipmentId", shipment.id);

    if (trackingUpdateId) {
      formData.set("trackingUpdateId", trackingUpdateId);
    }
    try {
      await updateTrackingStatus(formData);
      setOpen(false);
      onClose?.();
    } catch (error) {
      console.error("Failed to update tracking status", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(openState) => {
        setOpen(openState);
        if (!openState) onClose?.();
      }}
    >
      <SheetContent className="p-5">
        <SheetHeader>
          <SheetTitle>
            {trackingUpdateId
              ? "Update Tracking Status"
              : "Add Tracking Update"}
          </SheetTitle>
        </SheetHeader>
        {/* Shipment details display */}
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <p>
            <strong>Tracking Number:</strong> {shipment.trackingNumber || "N/A"}
          </p>
          <p>
            <strong>Origin:</strong> {shipment.originCity}
          </p>
          <p>
            <strong>Destination:</strong> {shipment.destinationCity}
          </p>
          <p>
            <strong>Service Type:</strong> {shipment.serviceType}
          </p>
          <p>
            <strong>Estimated Delivery:</strong>{" "}
            {shipment.estimatedDelivery
              ? new Date(shipment.estimatedDelivery).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <strong>Payment Status:</strong>{" "}
            {shipment.isPaid ? "Paid" : "Not Paid"}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(shipment.createdAt).toLocaleDateString()}
          </p>
        </div>
        {/* Form for updating tracking status */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Please update the shipment tracking status below:
          </p>
          <Input name="location" placeholder="Location" required />
          <Input name="message" placeholder="Message" required />
          <Select name="status" defaultValue="pending">
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="on_hold">On Hold</SelectItem>
              <SelectItem value="in transit">In Transit</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="returned">Returned</SelectItem>
              <SelectItem value="picked up">Picked Up</SelectItem>
              <SelectItem value="information received">
                Information Received
              </SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              {/* Add more statuses as needed */}
            </SelectContent>
          </Select>
          <Button type="submit" disabled={isPending} className="bg-secondary">
            {isPending ? "Updating..." : "Submit"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
