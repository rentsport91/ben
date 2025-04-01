"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ActiveShipment = () => {
  const [count, setCount] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchShipmentCount() {
      try {
        const res = await fetch("/api/active-shipment"); // adjust the path if necessary
        if (!res.ok) {
          throw new Error("Failed to fetch active shipment count");
        }
        const data = await res.json();
        setCount(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    }

    fetchShipmentCount();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (count === null)
    return (
      <Button variant="outline" disabled>
        <Loader2 className="animate-spin repeat-infinite" />
      </Button>
    );
  return (
    <Button variant="outline">
      <Link href={"/shipments/history"}>Active {count}</Link>
    </Button>
  );
};
