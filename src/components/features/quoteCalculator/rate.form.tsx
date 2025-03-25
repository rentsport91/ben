"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { calculatorSchema } from "./schema/calculator.schema";
// import { PackageTypeSelector } from "./PackageTypeSelector";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { z } from "zod";

export default function RateCalculator({
  isloading,
  calculateShippingRate,
}: {
  isloading: boolean;
  calculateShippingRate: () => void;
}) {
  const form = useForm<z.infer<typeof calculatorSchema>>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      destination: "",
      height: 0,
      length: 0,
      weight: 0,
      width: 0,
      origin: "",
      packageType: "document",
      service: "standard",
    },
  });

  // const packageType = form.watch("packageType");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(calculateShippingRate)}
        className="mt-5 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
      >
        {/* Location fields */}
        <FormField
          control={form.control}
          name="origin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Origin</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Package type selection
        <PackageTypeSelector
          register={register("packageType")}
          value={packageType}
          error={errors.packageType}
          t={t}
        /> */}

        {/* Weight field */}
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight (kg)</FormLabel>
              <FormControl>
                <Input type="number" step={0.1} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Package dimensions */}
        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="length"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Length (cm)</FormLabel>
                <FormControl>
                  <Input type="number" step={0.1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Width (cm)</FormLabel>
                <FormControl>
                  <Input type="number" step={0.1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height (cm)</FormLabel>
                <FormControl>
                  <Input type="number" step={0.1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Service selection */}
          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger>Choose Service</SelectTrigger>
                      <SelectContent {...field}>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="express">Express</SelectItem>
                        <SelectItem value="priority">Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* Submit button */}
        <Button
          disabled={isloading}
          size={"lg"}
          className="bg-secondary hover:bg-secondary/80"
        >
          {isloading ? <Loader2 className="animate-spin" /> : "Calculate"}
        </Button>
      </form>
    </Form>
  );
}
