"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2, Mail, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Image from "next/image";

const AuthForms = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      // Handle success - redirect or show success message
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Left Column - Brand & Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-top-header p-8 text-white flex flex-col justify-between hidden md:flex"
        >
          <div>
            <div className="mb-8">
              <Image
                src="/images/logo.svg"
                alt="EuroSwift Logo"
                width={150}
                height={50}
                className="mb-6"
              />
              <h2 className="text-2xl font-bold mb-4">Join Our Network</h2>
              <p className="text-gray-200 mb-6">
                Create an account to start shipping with the most reliable
                logistics partner worldwide.
              </p>
            </div>

            <div className="bg-black/20 p-6 rounded-lg mb-6">
              <div className="flex items-start mb-4">
                <Package className="text-secondary mr-3 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold mb-1">
                    Global Shipping Network
                  </h3>
                  <p className="text-sm text-gray-200">
                    Access to over 200 countries and territories worldwide
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Package className="text-secondary mr-3 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold mb-1">Real-time Tracking</h3>
                  <p className="text-sm text-gray-200">
                    Monitor your shipments with precision and ease
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-300">
            <p>&copy; 2025 EuroSwift Shipping. All rights reserved.</p>
          </div>
        </motion.div>

        {/* Right Column - Auth Forms */}
        <div className="p-8 sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-600">
              Fill in the form below to join our platform
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmit}>
                {/* Registration Form Fields */}

                <div className="space-y-4 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a secure password"
                        className="pr-10"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Password must be at least 8 characters with a number and
                      special character
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm font-normal">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-secondary hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-secondary hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-secondary hover:bg-secondary hover:opacity-80 text-white py-2 h-11 mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </motion.div>

                {/* Toggle between forms */}
                <div className="mt-6 text-center text-sm">
                  <p className="text-gray-600">
                    Already have an account?
                    <button
                      type="button"
                      className="ml-1 text-secondary hover:underline font-medium"
                    >
                      <Link href={"/login"}>Sign up</Link>
                    </button>
                  </p>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthForms;
