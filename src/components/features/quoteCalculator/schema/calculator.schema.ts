import { z } from "zod";

export const calculatorSchema = z.object({
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
  weight: z
    .number({
      required_error: "Weight is required",
      invalid_type_error: "Weight must be a number",
    })
    .positive("Weight must be positive"),
  length: z
    .number({
      required_error: "Length is required",
      invalid_type_error: "Length must be a number",
    })
    .positive("Length must be positive"),
  width: z
    .number({
      required_error: "Width is required",
      invalid_type_error: "Width must be a number",
    })
    .positive("Width must be positive"),
  height: z
    .number({
      required_error: "Height is required",
      invalid_type_error: "Height must be a number",
    })
    .positive("Height must be positive"),
  packageType: z.enum(["parcel", "document", "pallet"], {
    required_error: "Please select a package type",
  }),
  service: z.enum(["standard", "express", "priority"], {
    required_error: "Please select a service type",
  }),
});
