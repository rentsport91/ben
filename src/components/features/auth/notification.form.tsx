"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

// Define notification preferences schema
const notificationFormSchema = z.object({
  email: z.boolean().default(true),
  sms: z.boolean().default(true),
  marketing: z.boolean().default(false),
  shippingUpdates: z.boolean().default(true),
  deliveryNotifications: z.boolean().default(true),
  accountActivity: z.boolean().default(true),
  promotions: z.boolean().default(false),
});

export default function NotificationForm({ userData }) {
  const [isLoading, setIsLoading] = useState(false);

  // Initialize notification preferences form
  const notificationForm = useForm({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      email: userData.notifications?.email ?? true,
      sms: userData.notifications?.sms ?? true,
      marketing: userData.notifications?.marketing ?? false,
      shippingUpdates: userData.notifications?.shippingUpdates ?? true,
      deliveryNotifications:
        userData.notifications?.deliveryNotifications ?? true,
      accountActivity: userData.notifications?.accountActivity ?? true,
      promotions: userData.notifications?.promotions ?? false,
    },
  });

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      // API call to update notification preferences
      const response = await fetch("/api/users/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update notification preferences"
        );
      }

      toast.success("Notification preferences updated", {
        description: "Your notification preferences have been saved.",
      });
    } catch (error) {
      console.error("Error updating notification preferences:", error);
      toast.error("Error", {
        description:
          "Failed to update notification preferences. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...notificationForm}>
      <form
        onSubmit={notificationForm.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Contact Methods</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={notificationForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Email Notifications
                    </FormLabel>
                    <FormDescription>
                      Receive email updates about your shipments and account
                      activity
                    </FormDescription>
                  </div>
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="accent-primary h-5 w-5"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={notificationForm.control}
              name="sms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      SMS Notifications
                    </FormLabel>
                    <FormDescription>
                      Receive text message alerts about your shipments
                    </FormDescription>
                  </div>
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="accent-primary h-5 w-5"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notification Types</h3>
          <div className="space-y-4">
            <FormField
              control={notificationForm.control}
              name="shippingUpdates"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Shipping Updates
                    </FormLabel>
                    <FormDescription>
                      Notification when your shipment status changes
                    </FormDescription>
                  </div>
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="accent-primary h-5 w-5"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={notificationForm.control}
              name="deliveryNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Delivery Notifications
                    </FormLabel>
                    <FormDescription>
                      Notification when your shipment is delivered
                    </FormDescription>
                  </div>
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="accent-primary h-5 w-5"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={notificationForm.control}
              name="accountActivity"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Account Activity
                    </FormLabel>
                    <FormDescription>
                      Notification about login attempts and security updates
                    </FormDescription>
                  </div>
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="accent-primary h-5 w-5"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={notificationForm.control}
              name="promotions"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Promotions</FormLabel>
                    <FormDescription>
                      Receive promotional offers and discounts
                    </FormDescription>
                  </div>
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="accent-primary h-5 w-5"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Preferences"
          )}
        </Button>
      </form>
    </Form>
  );
}
