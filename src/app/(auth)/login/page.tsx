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

const LoginPage = () => {
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
          className="bg-top-header p-8 text-white flex-col justify-between hidden md:flex"
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
              <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-gray-200 mb-6">
                Log in to access your shipping dashboard and manage your
                deliveries with ease.
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
              Log In to Your Account
            </h1>
            <p className="text-gray-600">
              Enter your credentials to access your account
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
                <div className="space-y-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Password</Label>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-secondary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
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
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm font-normal">
                      Remember me for 30 days
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
                        Signing in...
                      </>
                    ) : (
                      " Sign In"
                    )}
                  </Button>
                </motion.div>
                {/* Toggle between forms */}
                <div className="mt-6 text-center text-sm">
                  <p className="text-gray-600">
                    Don&apos;t have an account?
                    <button
                      type="button"
                      className="ml-1 text-secondary hover:underline font-medium"
                    >
                      <Link href={"/register"}>Sign up</Link>
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

export default LoginPage;
