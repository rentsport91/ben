// app/lib/schemas.ts
import { SHIPPING_OPTIONS } from "@/app/(root)/shipments/create/type";
import { z } from "zod";

// Package schema
export const packageSchema = z.object({
  packageType: z.string().min(1, "Package type is required"),
  weight: z.coerce.number().positive("Weight must be a positive number"),
  length: z.coerce.number().positive("Length must be a positive number"),
  width: z.coerce.number().positive("Width must be a positive number"),
  height: z.coerce.number().positive("Height must be a positive number"),
  declaredValue: z.coerce
    .number()
    .nonnegative("Declared value must be a non-negative number"),
  description: z.string().min(1, "Description is required"),
  pieces: z.coerce
    .number()
    .int()
    .positive("Number of pieces must be a positive integer"),
  dangerous: z.boolean().default(false),
  insurance: z.boolean().default(false),
});

export const SERVICE_TYPE_IDS = SHIPPING_OPTIONS.map((option) => option.id);
const SERVICE_TYPES = SHIPPING_OPTIONS.map((option) => option.id) as [
  string,
  ...string[]
];
// Main shipment schema
export const shipmentSchema = z.object({
  // Origin address
  originAddress: z.string().min(1, "Origin address is required"),
  originCity: z.string().min(1, "Origin city is required"),
  originState: z.string().min(1, "Origin state is required"),
  originPostalCode: z.string().min(1, "Origin postal code is required"),
  originCountry: z.string().min(1, "Origin country is required"),

  // Destination address
  destinationAddress: z.string().min(1, "Destination address is required"),
  destinationCity: z.string().min(1, "Destination city is required"),
  destinationState: z.string().min(1, "Destination state is required"),
  destinationPostalCode: z
    .string()
    .min(1, "Destination postal code is required"),
  destinationCountry: z.string().min(1, "Destination country is required"),
  // Updated service type with enum validation
  serviceType: z.enum(SERVICE_TYPES),

  packages: z.array(packageSchema).min(1, "At least one package is required"),

  specialInstructions: z.string().optional(),

  recipient: z.object({
    name: z.string().nonempty({ message: "Name field is required" }),
    company: z.string().optional(),
    email: z.string().email({ message: "Email field is required" }),
    phone: z.string().min(10),
  }),
});

export type ShipmentFormValues = z.infer<typeof shipmentSchema>;
export type PackageFormValues = z.infer<typeof packageSchema>;
