/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  MessageCircle,
  Phone,
  Mail,
  HelpCircle,
  Send,
  MapPin,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Support Request Form Schema
const supportRequestSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  category: z.enum([
    "General Inquiry",
    "Shipping Issue",
    "Tracking",
    "Billing",
    "Other",
  ]),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

// Type for the support request form
type SupportRequestType = z.infer<typeof supportRequestSchema>;

export default function SupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Initialize the form with explicit typing
  const form = useForm<SupportRequestType>({
    resolver: zodResolver(supportRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      category: "General Inquiry",
      message: "",
    },
  });

  // Handle form submission with explicit typing
  const onSubmit = async (_values: SupportRequestType) => {
    setIsSubmitting(true);
    try {
      // Simulate form submission (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset form and show success message
      form.reset();
      setSubmitSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Submission error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Support Contact Channels
  const supportChannels = [
    {
      image: (
        <Image
          src="/images/whatsapp.png"
          width={50}
          height={50}
          alt="whatsApp logo"
          className="mr-2"
        />
      ),
      title: "WhatsApp Support",
      description: "Chat directly with our logistics experts",
      details: "+44 7349 38103",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Quick and convenient communication",
      details: "support@logistex.com",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant support during business hours",
      details: "Available 9 AM - 6 PM EST",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 overflow-hidden">
      {/* Animated Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Customer Support
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We&apos;re here to help you with any questions or concerns about your
          shipments. Our dedicated support team is ready to assist you.
        </p>
      </motion.div>

      {/* Animated Support Channels */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delayChildren: 0.3,
          staggerChildren: 0.2,
        }}
        className="grid md:grid-cols-3 gap-6 mb-16"
      >
        {supportChannels.map((channel, index) => (
          <motion.div
            key={channel.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <Card
              className={`hover:shadow-xl transition-all duration-300 ${channel.bgColor}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  {channel.icon ? (
                    <channel.icon className={`h-12 w-12 ${channel.color}`} />
                  ) : (
                    channel.image
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {channel.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {channel.description}
                </p>
                <p className="font-medium text-gray-700">{channel.details}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Animated Support Request Form */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl p-10"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Submit a Support Request
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        {...field}
                        className="focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        {...field}
                        className="focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Phone Number (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(555) 123-4567"
                        {...field}
                        className="focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Support Category
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="focus:ring-2 focus:ring-blue-500 transition-all duration-300">
                        <SelectValue placeholder="Select a support category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="General Inquiry">
                        General Inquiry
                      </SelectItem>
                      <SelectItem value="Shipping Issue">
                        Shipping Issue
                      </SelectItem>
                      <SelectItem value="Tracking">Tracking</SelectItem>
                      <SelectItem value="Billing">Billing</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Your Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your issue or inquiry in detail"
                      className="min-h-[120px] focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-100 text-green-800 p-4 rounded-lg text-center"
              >
                Thank you! Your support request has been submitted successfully.
              </motion.div>
            )}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/80 transition-colors duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Support Request"}
              </Button>
            </motion.div>
          </form>
        </Form>
      </motion.div>

      {/* Animated FAQ and Resources Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Can&apos;t find what you&apos;re looking for? Check out our
          comprehensive FAQ or contact our support team for immediate
          assistance.
        </p>
        <div className="flex justify-center space-x-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="outline" className="mr-4">
              <HelpCircle className="mr-2 h-5 w-5" /> View Full FAQ
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
