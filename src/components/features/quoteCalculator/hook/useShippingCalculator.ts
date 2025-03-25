import { useState } from "react";

export const useShippingCalculator = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<
    | {
        service: string;
        deliveryTime: string;
        price: number;
      }[]
    | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const calculateVolume = (length: number, width: number, height: number) => {
    return length * width * height;
  };

  const calculateShippingRate = async (data) => {
    setIsCalculating(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const volume = calculateVolume(data.length, data.width, data.height);
      const volumetricWeight = volume / 5000; // Industry standard formula
      const billableWeight = Math.max(data.weight, volumetricWeight);

      // Mock shipping rates calculation
      const baseRate = data.packageType === "document" ? 15 : 25;
      const distanceFactor = Math.random() * 2 + 1; // Simulating distance calculation

      const rateResults = [
        {
          service: "Standard Shipping",
          deliveryTime: "3-5 business days",
          price:
            Math.round((baseRate + billableWeight * 2) * distanceFactor * 100) /
            100,
        },
        {
          service: "Express Shipping",
          deliveryTime: "1-2 business days",
          price:
            Math.round(
              (baseRate + billableWeight * 3.5) * distanceFactor * 100
            ) / 100,
        },
        {
          service: "Priority Shipping",
          deliveryTime: "Next business day",
          price:
            Math.round((baseRate + billableWeight * 5) * distanceFactor * 100) /
            100,
        },
      ];

      setResults(rateResults);
    } catch (err) {
      console.error("Error calculating shipping rate:", err);
      setError("Failed to calculate shipping rates. Please try again.");
    } finally {
      setIsCalculating(false);
    }
  };

  return {
    isCalculating,
    results,
    error,
    calculateShippingRate,
  };
};
