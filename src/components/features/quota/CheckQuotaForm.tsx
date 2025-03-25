"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Allow filtering by any field. All fields are optional.
const checkQuotaSchema = z.object({
  region: z.string().optional(),
  origin: z.string().optional(),
  destination: z.string().optional(),
  packageType: z.string().optional(),
});

type CheckQuotaFormData = z.infer<typeof checkQuotaSchema>;

interface CheckQuotaFormProps {
  onSubmit: (data: CheckQuotaFormData) => void;
}

export function CheckQuotaForm({ onSubmit }: CheckQuotaFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckQuotaFormData>({
    resolver: zodResolver(checkQuotaSchema),
  });

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Filter Quotas</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <div>
            <Input placeholder="Region" {...register("region")} />
            {errors.region && (
              <p className="text-sm text-red-600">{errors.region.message}</p>
            )}
          </div>
          <div>
            <Input placeholder="Origin" {...register("origin")} />
            {errors.origin && (
              <p className="text-sm text-red-600">{errors.origin.message}</p>
            )}
          </div>
          <div>
            <Input placeholder="Destination" {...register("destination")} />
            {errors.destination && (
              <p className="text-sm text-red-600">
                {errors.destination.message}
              </p>
            )}
          </div>
          <div>
            <Controller
              control={control}
              name="packageType"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Package Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Express">Express</SelectItem>
                    <SelectItem value="Economy">Economy</SelectItem>
                    {/* Add more package types as needed */}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.packageType && (
              <p className="text-sm text-red-600">
                {errors.packageType.message}
              </p>
            )}
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-end">
            <Button type="submit" className="bg-secondary">
              Apply Filter
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
