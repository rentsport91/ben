import { revalidatePath } from "next/cache";
import { prisma } from "@/constants/config/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export async function addTrackingUpdate(formData: FormData) {
  "use server";
  const shipmentId = formData.get("shipmentId") as string;
  const status = formData.get("status") as string;
  const message = formData.get("message") as string;
  const location = formData.get("location") as string;

  if (!status || !message) {
    throw new Error("Status and message are required.");
  }

  await prisma.trackingUpdate.create({
    data: {
      shipmentId,
      status,
      message,
      location: location || undefined,
    },
  });

  // Revalidate the shipment detail page so the new update appears immediately.
  revalidatePath(`/shipment/${shipmentId}`);
}

interface TrackingUpdateFormProps {
  shipmentId: string;
}

export const TrackingUpdateForm = async ({
  shipmentId,
}: TrackingUpdateFormProps) => {
  return (
    <form action={addTrackingUpdate} method="POST" className="space-y-4">
      <input type="hidden" name="shipmentId" value={shipmentId} />

      <div className="flex flex-col gap-2">
        <Label htmlFor="status">Status</Label>
        <Select name="status" required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="information_received">
              Information Received
            </SelectItem>
            <SelectItem value="picked_up">Picked Up</SelectItem>
            <SelectItem value="in_transit">In Transit</SelectItem>
            <SelectItem value="arrived">Arrived</SelectItem>
            <SelectItem value="departed">Departed</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col">
        <Label htmlFor="message">Message</Label>
        <Input
          id="message"
          name="message"
          type="text"
          placeholder="Enter update message"
          required
        />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="location">Location (Optional)</Label>
        <Input
          id="location"
          name="location"
          type="text"
          placeholder="Enter location"
        />
      </div>
      <Button type="submit" className="bg-secondary hover:bg-secondary/80">
        Submit Update
      </Button>
    </form>
  );
};
