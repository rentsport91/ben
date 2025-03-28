import React from "react";
import Link from "next/link";
import {
  Mail,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-5">
              <Image
                src={"/images/logo.svg"}
                width={150}
                height={150}
                alt="logo"
              />
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              Reliable, efficient shipping solutions for businesses and
              individuals worldwide. Fast, secure delivery you can count on.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone size={18} className="text-shipping-600 mr-3" />
                <span className="text-gray-700">+44 7349 381036</span>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="text-shipping-600 mr-3" />
                <span className="text-gray-700">info@logistex.com</span>
              </div>
              <div className="flex items-start">
                <MapPin size={18} className="text-shipping-600 mr-3 mt-1" />
                <span className="text-gray-700">
                  71 Cherry Court Southampton SO53 5PD{" "}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-medium text-lg mb-5">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-shipping-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-600 hover:text-shipping-600 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-gray-600 hover:text-shipping-600 transition-colors"
                >
                  News & Updates
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="text-gray-600 hover:text-shipping-600 transition-colors"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  href="/investors"
                  className="text-gray-600 hover:text-shipping-600 transition-colors"
                >
                  Investors
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-medium text-lg mb-5">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/express"
                  className="text-gray-600 hover:text-shipping-600 transition-colors"
                >
                  Express Shipping
                </Link>
              </li>
              <li>
                <Link
                  href="/freight"
                  className="text-gray-600 hover:text-shipping-600 transition-colors"
                >
                  Freight Services
                </Link>
              </li>
              <li>
                <Link
                  href="/ecommerce"
                  className="text-gray-600 hover:text-shipping-600 transition-colors"
                >
                  E-commerce Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/customs"
                  className="text-gray-600 hover:text-shipping-600 transition-colors"
                >
                  Customs Support
                </Link>
              </li>
              <li>
                <Link
                  href="/business"
                  className="text-gray-600 hover:text-shipping-600 transition-colors"
                >
                  Business Shipping
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-medium text-lg mb-5">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for shipping tips and exclusive
              offers.
            </p>
            <div className="space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="pr-12 h-11"
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1 h-9 w-9 p-0 flex items-center justify-center bg-shipping-600 hover:bg-shipping-700"
                >
                  <ArrowRight size={16} />
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our
                <Link
                  href="/privacy"
                  className="text-shipping-600 hover:underline ml-1"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <h3 className="font-display font-medium text-lg mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-shipping-50 flex items-center justify-center text-gray-600 hover:text-shipping-600 transition-colors"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-shipping-50 flex items-center justify-center text-gray-600 hover:text-shipping-600 transition-colors"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-shipping-50 flex items-center justify-center text-gray-600 hover:text-shipping-600 transition-colors"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-shipping-50 flex items-center justify-center text-gray-600 hover:text-shipping-600 transition-colors"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-shipping-50 flex items-center justify-center text-gray-600 hover:text-shipping-600 transition-colors"
                >
                  <Youtube size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Logistex. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center space-x-4 text-sm">
            <Link
              href="/terms"
              className="text-gray-500 hover:text-shipping-600 mb-2 md:mb-0"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-shipping-600 mb-2 md:mb-0"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="text-gray-500 hover:text-shipping-600 mb-2 md:mb-0"
            >
              Cookie Policy
            </Link>
            <Link
              href="/legal"
              className="text-gray-500 hover:text-shipping-600"
            >
              Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
