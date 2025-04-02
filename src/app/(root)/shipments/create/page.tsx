"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { shipmentSchema, ShipmentFormValues } from "@/store/schema";
import { createShipment } from "./actions";
import { useSession } from "next-auth/react";

// Package types for the dropdown
const PACKAGE_TYPES = [
  { value: "box", label: "Box" },
  { value: "envelope", label: "Envelope" },
  { value: "pallet", label: "Pallet" },
  { value: "tube", label: "Tube" },
  { value: "custom", label: "Custom" },
];

// Shipping options
export const SHIPPING_OPTIONS = [
  {
    id: "standard",
    label: "Standard Delivery",
    description: "20-30 business days",
    price: 19.99, // Cheapest slowest option
  },
  {
    id: "economy",
    label: "Economy Delivery",
    description: "10-15 business days",
    price: 39.99, // Mid-tier price
  },
  {
    id: "express",
    label: "Express Delivery",
    description: "3-5 business days",
    price: 59.99, // Most expensive fastest option
  },
];

export default function CreateShipmentPage() {
  const router = useRouter();
  const session = useSession();

  // Initialize form with react-hook-form and zod validation
  const form = useForm<ShipmentFormValues>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: {
      originAddress: "",
      originCity: "",
      originState: "",
      originPostalCode: "",
      originCountry: "",

      // Recipient info
      destinationAddress: "",
      destinationCity: "",
      destinationState: "",
      destinationPostalCode: "",
      destinationCountry: "",

      // Service info
      serviceType: "express",
      packages: [
        {
          packageType: "box",
          weight: 0,
          length: 0,
          width: 0,
          height: 0,
          declaredValue: 0,
          description: "",
          pieces: 1,
          dangerous: false,
          insurance: false,
        },
      ],
      recipient: {
        company: "",
        email: "",
        name: "",
        phone: "",
      },
    },
  });

  // Field array for handling multiple packages
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "packages",
  });

  if (session.status !== "authenticated") {
    router.push("/login");
    return;
  }

  const onSubmit = async (data: ShipmentFormValues) => {
    try {
      const formData = new FormData();
      // Add all shipment fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "packages") {
          if (key === "recipient") {
            // Serialize recipient object so that it isn't converted to "[object Object]"
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        }
      });
      // Add package fields with array notation
      data.packages.forEach((pkg, index) => {
        Object.entries(pkg).forEach(([field, value]) => {
          formData.append(`packages[${index}].${field}`, String(value));
        });
      });

      const result = await createShipment(formData);
      if (result.error) {
        toast.error(result.error);
        console.error("Validation issues:", result.issues);
      } else {
        toast.success("Shipment created successfully!");
        router.push("/shipments/history");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    }
  };

  const calculateSummary = () => {
    const packages = form.watch("packages");
    const serviceType = form.watch("serviceType");

    // Find selected shipping option
    const selectedShipping = SHIPPING_OPTIONS.find(
      (option) => option.id === serviceType.toLowerCase()
    );

    // Default to standard if not found
    const shippingCost = selectedShipping?.price ?? 89.99;
    const shippingLabel = selectedShipping?.label ?? "Standard Delivery";

    const insuranceCost = 10.0;
    const taxAmount = 13.5;

    // Format summary data for packages
    const packageSummary = packages.map((pkg, index) => ({
      number: index + 1,
      weight: pkg.weight > 0 ? `${pkg.weight} kg` : "-",
      dimensions:
        pkg.length > 0 && pkg.width > 0 && pkg.height > 0
          ? `${pkg.length} x ${pkg.width} x ${pkg.height} cm`
          : "-",
    }));

    return {
      packages: packageSummary,
      shippingMethod: shippingLabel,
      shippingCost: `$${shippingCost.toFixed(2)}`,
      insuranceCost: `$${insuranceCost.toFixed(2)}`,
      tax: `$${taxAmount.toFixed(2)}`,
    };
  };

  const summary = calculateSummary();

  return (
    <div className="container mx-auto py-6">
      <div className="px-7">
        <h1 className="text-3xl font-semibold">Create Shipment</h1>
        <p className="text-sm text-gray-600">
          Fill out the information below to create a new international shipment.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) =>
            console.error("Validation Errors", errors)
          )}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Sender & Recipient Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Sender Information Section */}
              <div className="bg-white rounded-md p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Origin Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormField
                    control={form.control}
                    name="originCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="Select Counrty" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="originAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <FormField
                    control={form.control}
                    name="originPostalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter zip code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="originCity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="originState"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter state" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Recipient Information Section */}
              <div className="bg-white rounded-md p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Recipient Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormField
                    control={form.control}
                    name="recipient.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="recipient.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormField
                    control={form.control}
                    name="recipient.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="recipient.company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="destinationAddress"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter street address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="destinationCountry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <FormField
                    control={form.control}
                    name="destinationCity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="destinationPostalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter postal code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="destinationState"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter state" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Package Add Button */}
              <div className="flex justify-start px-8">
                <Button
                  type="button"
                  variant="outline"
                  className="text-purple-600 border-purple-600"
                  onClick={() =>
                    append({
                      packageType: "box",
                      weight: 0,
                      length: 0,
                      width: 0,
                      height: 0,
                      declaredValue: 0,
                      description: "",
                      pieces: 1,
                      dangerous: false,
                      insurance: false,
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Package
                </Button>
              </div>

              {/* Package Details Sections */}
              {fields.map((field, index) => (
                <div key={field.id} className="bg-white rounded-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      Package Details #{index + 1}
                    </h2>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        className="text-red-500"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`packages.${index}.weight`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weight (kg)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`packages.${index}.length`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Length (cm)</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`packages.${index}.height`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Height (cm)</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`packages.${index}.packageType`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Package Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select package type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {PACKAGE_TYPES.map((type) => (
                                  <SelectItem
                                    key={type.value}
                                    value={type.value}
                                  >
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`packages.${index}.width`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Width (cm)</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`packages.${index}.pieces`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Pieces</FormLabel>
                            <FormControl>
                              <Input type="number" min="1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <FormField
                      control={form.control}
                      name={`packages.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Package Contents Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the contents of your package"
                              className="resize-none"
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`packages.${index}.declaredValue`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Declared Value (USD)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name={`packages.${index}.dangerous`}
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Dangerous Goods</FormLabel>
                          <FormDescription>
                            This shipment contains dangerous goods as defined by
                            international shipping regulations.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              ))}

              {/* Shipping Options Section */}
              <div className="bg-white rounded-md p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Options</h2>

                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-3"
                        >
                          {SHIPPING_OPTIONS.map((option) => (
                            <div
                              key={option.id}
                              className="flex items-center justify-between space-x-2 rounded-md border p-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value={option.id}
                                  id={option.id}
                                />
                                <div className="grid gap-1">
                                  <Label
                                    htmlFor={option.id}
                                    className="font-medium"
                                  >
                                    {option.label}
                                  </Label>
                                  <p className="text-sm text-gray-500">
                                    {option.description}
                                  </p>
                                </div>
                              </div>
                              <p className="text-lg font-semibold">
                                ${option.price.toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Special Instructions */}
              <div className="bg-white rounded-md p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Special Instructions
                </h2>

                <Textarea
                  placeholder="Enter any special handling instructions or notes"
                  className="resize-none h-24"
                />
              </div>
            </div>

            {/* Right column - Order Summary */}
            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {summary.packages.map((pkg, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-medium">Package #{pkg.number}</h3>
                      <div className="grid grid-cols-2 text-sm">
                        <span className="text-gray-500">Package Weight</span>
                        <span className="text-right">{pkg.weight}</span>
                      </div>
                      <div className="grid grid-cols-2 text-sm">
                        <span className="text-gray-500">Dimensions</span>
                        <span className="text-right">{pkg.dimensions}</span>
                      </div>
                      {index < summary.packages.length - 1 && (
                        <Separator className="my-2" />
                      )}
                    </div>
                  ))}

                  <Separator />

                  <div className="grid grid-cols-2 text-sm">
                    <span className="text-gray-500">Shipping Method</span>
                    <span className="text-right font-medium">
                      {summary.shippingMethod}
                    </span>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-gray-500">Total Shipping Cost</span>
                      <span className="text-right">{summary.shippingCost}</span>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-gray-500">Insurance</span>
                      <span className="text-right">
                        {summary.insuranceCost}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-gray-500">Tax</span>
                      <span className="text-right">{summary.tax}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-between gap-4">
                    <Button variant="outline" type="button" className="flex-1">
                      Cancel
                    </Button>
                    <Button variant="outline" type="submit" className="flex-1">
                      Save Draft
                    </Button>
                    <Button
                      className="flex-1 bg-secondary hover:bg-secondary/90 cursor-pointer"
                      disabled={form.formState.isSubmitting}
                      type="submit"
                    >
                      {form.formState.isSubmitting
                        ? "Creating..."
                        : "Create Shipment"}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
