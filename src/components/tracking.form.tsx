"use client";

import React, { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const TrackingForm = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (!trackingNumber.trim()) return;
    if (!trackingNumber) {
      toast.error("Please enter a tracking number");
      return;
    }

    console.log("pressed");

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Tracking request submitted", {
        description: `Tracking number: ${trackingNumber}`,
      });
      setTrackingNumber("");
      router.push(
        `/tracking/results?number=${encodeURIComponent(trackingNumber.trim())}`
      );
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative w-full max-w-3xl glass rounded-xl p-1.5 transition-all duration-300",
        "shadow-elevation-1 hover:shadow-xl focus-within:shadow-2xl",
        "border border-white/20 backdrop-blur-md bg-white"
      )}
    >
      <div className="flex items-center ">
        <div className="flex-none pl-3">
          <Search className="text-top-header animate-pulse-soft" size={24} />
        </div>

        <Input
          type="text"
          placeholder="Enter your tracking number"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="flex-grow border-0 bg-transparent text-lg h-14 px-4 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
        />

        <Button
          type="submit"
          className={cn(
            "flex-none bg-shipping-600 hover:bg-secondary text-white h-12 px-6 rounded-lg bg-secondary/80",
            "flex items-center gap-2 transition-all duration-300 ease-in-out",
            "transform hover:scale-105 text-lg"
          )}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-pulse">Processing...</div>
          ) : (
            <>
              <span>Track</span>
              <ArrowRight size={18} />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default TrackingForm;
