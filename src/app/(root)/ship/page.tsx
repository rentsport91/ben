"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  MapPin,
  Phone,
  Mail,
  Shield,
  Clock,
  Ship,
  Truck,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";

// Comprehensive quote request schema
const quoteRequestSchema = z.object({
  // Shipment Details
  shipmentType: z.enum(["document", "package", "freight", "special"]),
  weight: z.coerce.number().min(0.1, "Weight must be greater than 0"),

  // Dimensions
  length: z.coerce.number().min(1, "Length must be greater than 0"),
  width: z.coerce.number().min(1, "Width must be greater than 0"),
  height: z.coerce.number().min(1, "Height must be greater than 0"),

  // Location Details
  originCountry: z.string().min(2, "Origin country is required"),
  originCity: z.string().min(2, "Origin city is required"),
  destinationCountry: z.string().min(2, "Destination country is required"),
  destinationCity: z.string().min(2, "Destination city is required"),

  // Additional Details
  specialInstructions: z.string().optional(),
  declaredValue: z.coerce
    .number()
    .min(0, "Value must be non-negative")
    .optional(),
});

function GetQuotePage() {
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteReference, setQuoteReference] = useState<string | null>(null);

  // Initialize form with zod schema
  const form = useForm<z.infer<typeof quoteRequestSchema>>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      shipmentType: "package",
      weight: undefined,
      length: undefined,
      width: undefined,
      height: undefined,
      specialInstructions: "",
      declaredValue: undefined,
    },
  });

  // Generate a mock quote reference number
  const generateQuoteReference = () => {
    return `QUOTE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  // Form submission handler
  const onSubmit = (data: z.infer<typeof quoteRequestSchema>) => {
    // Mock quote submission process
    console.log("Quote Request Submitted:", data);

    // Generate and set quote reference
    const reference = generateQuoteReference();
    setQuoteReference(reference);
    setQuoteSubmitted(true);

    // In a real application, you would send this to your backend
    // axios.post('/api/quotes', data)
  };

  // Reset form for new quote
  const handleNewQuote = () => {
    setQuoteSubmitted(false);
    setQuoteReference(null);
    form.reset();
  };

  // Render quote submission form
  const renderQuoteForm = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-6 w-6" />
              Shipment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            {/* Shipment Type */}
            <FormField
              control={form.control}
              name="shipmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipment Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select shipment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="package">Package</SelectItem>
                      <SelectItem value="freight">Freight</SelectItem>
                      <SelectItem value="special">Special Handling</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Weight */}
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Shipment weight"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dimensions */}
            <FormField
              control={form.control}
              name="length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Length (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Package length"
                      {...field}
                    />
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
                    <Input
                      type="number"
                      placeholder="Package width"
                      {...field}
                    />
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
                    <Input
                      type="number"
                      placeholder="Package height"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Declared Value */}
            <FormField
              control={form.control}
              name="declaredValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Declared Value ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Shipment value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Location Details Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-6 w-6" />
              Shipping Locations
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="originCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Origin Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Origin country" {...field} />
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
                  <FormLabel>Origin City</FormLabel>
                  <FormControl>
                    <Input placeholder="Origin city" {...field} />
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
                  <FormLabel>Destination Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Destination country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destinationCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination City</FormLabel>
                  <FormControl>
                    <Input placeholder="Destination city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Special Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="specialInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any special handling or additional details"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full bg-secondary hover:bg-secondary/80 cursor-pointer"
          size="lg"
        >
          Request Quote
        </Button>
      </form>
    </Form>
  );

  const QuoteSidebar = () => (
    <div className="sticky top-24 space-y-6 bg-accent/10 p-6 rounded-lg">
      <div className="text-center">
        <Ship className="mx-auto h-12 w-12 text-secondary mb-4" />
        <h2 className="text-2xl font-bold mb-2">Get a Custom Shipping Quote</h2>
        <p className="text-muted-foreground">
          We&apos;ll help you find the most cost-effective shipping solution.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
          <Clock className="h-8 w-8 text-secondary" />
          <div>
            <h3 className="font-semibold">Quick Response</h3>
            <p className="text-sm text-muted-foreground">
              Quotes processed within 2 business hours
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
          <Shield className="h-8 w-8 text-green-600" />
          <div>
            <h3 className="font-semibold">Guaranteed Pricing</h3>
            <p className="text-sm text-muted-foreground">
              No hidden fees or surprise charges
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
          <Truck className="h-8 w-8 text-blue-600" />
          <div>
            <h3 className="font-semibold">Flexible Shipping Options</h3>
            <p className="text-sm text-muted-foreground">
              Multiple delivery methods available
            </p>
          </div>
        </div>
      </div>

      <div className="bg-secondary/10 p-4 rounded-lg text-center">
        <p className="text-sm font-medium mb-2">Need Immediate Assistance?</p>
        <div className="flex justify-center gap-2">
          <Button variant="outline" size="sm" className="cursor-pointer">
            <Phone className="mr-2 h-4 w-4" /> WhatsApp Us
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-top-header hover:bg-top-header/80 cursor-pointer text-white"
          >
            <Mail className="mr-2 h-4 w-4" /> Email Support
          </Button>
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground">
        <p>
          Shipping rates are estimates and may vary based on current market
          conditions.
        </p>
      </div>
    </div>
  );

  // Render quote confirmation
  const renderQuoteConfirmation = () => (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          Quote Submitted Successfully
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-green-600">
            Quote Reference: {quoteReference}
          </h2>
          <p className="text-muted-foreground mt-2">
            Our team will review your quote request and contact you soon.
          </p>
        </div>
        <div className="space-y-2">
          <p>
            We&apos;ve received your shipping quote request. You&apos;ll be
            contacted shortly with a detailed quote.
          </p>
          <Button onClick={handleNewQuote} variant="outline">
            Request Another Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Sidebar - 1 column on medium screens */}
        <div className="md:col-span-1 hidden md:block">
          <QuoteSidebar />
        </div>

        {/* Form - 2 columns on medium screens */}
        <div className="md:col-span-2">
          {quoteSubmitted ? renderQuoteConfirmation() : renderQuoteForm()}
        </div>

        {/* Mobile Sidebar - shown only on mobile */}
        <div className="md:hidden">
          <Card>
            <CardContent className="p-6">
              <QuoteSidebar />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default GetQuotePage;
