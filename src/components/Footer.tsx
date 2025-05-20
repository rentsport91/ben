"use client";

import React from "react";
import Link from "next/link";
import { Mail, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Animation variants defined outside component for better reusability
const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: custom * 0.1,
      ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smoother easing
    },
  }),
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const buttonHoverVariants = {
  hover: {
    scale: 1.03,
    backgroundColor: "rgba(var(--top-header-rgb), 0.85)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.97,
  },
};

export const Footer: React.FC = () => {
  // Use higher threshold for better timing of animations
  const [footerRef, footerInView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
    rootMargin: "50px 0px",
  });

  // Consolidated refs for better performance
  const [linksRef, linksInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [bottomRef, bottomInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.footer
      className="bg-gray-50 pt-16 pb-8 overflow-hidden"
      ref={footerRef}
      initial="hidden"
      animate={footerInView ? "visible" : "hidden"}
      variants={fadeUpVariants}
      custom={0}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info - with custom animation delays */}
          <motion.div
            className="lg:col-span-2"
            variants={staggerContainerVariants}
          >
            <motion.div variants={fadeUpVariants} custom={0}>
              <Link href="/" className="flex items-center space-x-2 mb-5">
                <Image
                  src={"/images/logo.png"}
                  width={200}
                  height={150}
                  alt="logo"
                />
              </Link>
            </motion.div>

            <motion.p
              className="text-gray-600 mb-6 max-w-md"
              variants={fadeUpVariants}
              custom={1}
            >
              Reliable, efficient shipping and security solutions for businesses
              and individuals worldwide. Fast, secure delivery you can count on.
            </motion.p>

            <motion.div
              className="space-y-4"
              variants={staggerContainerVariants}
            >
              <motion.div
                className="flex items-center"
                variants={fadeUpVariants}
                custom={2}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail size={18} className="text-shipping-600 mr-3" />
                <span className="text-gray-700">
                  admin@amermaxlogistics.org
                </span>
              </motion.div>

              <motion.div
                className="flex items-start"
                variants={fadeUpVariants}
                custom={3}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin size={18} className="text-shipping-600 mr-3 mt-1" />
                <span className="text-gray-700">
                  6512 hillside Brooke ave Las vegas
                </span>
              </motion.div>
              <motion.div
                className="flex items-start"
                variants={fadeUpVariants}
                custom={3}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={"/images/whatsapp.png"}
                  alt="whatsapp"
                  width={20}
                  height={20}
                  className="text-shipping-600 mr-2 mt-1"
                />
                <span className="text-gray-700">+1 9129801024</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            ref={linksRef}
            initial="hidden"
            animate={linksInView ? "visible" : "hidden"}
            variants={staggerContainerVariants}
          >
            <motion.h3
              className="font-display font-medium text-lg mb-5"
              variants={fadeUpVariants}
            >
              Company
            </motion.h3>
            <motion.ul
              className="space-y-3"
              variants={staggerContainerVariants}
            >
              {["Ship", "Track Shipment", "Services"].map((item, i) => (
                <motion.li
                  key={item}
                  variants={fadeUpVariants}
                  custom={i}
                  whileHover={{ x: 3, color: "var(--shipping-600)" }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-600 hover:text-shipping-600 transition-colors"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Services */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate={linksInView ? "visible" : "hidden"}
          >
            <motion.h3
              className="font-display font-medium text-lg mb-5"
              variants={fadeUpVariants}
            >
              Services
            </motion.h3>
            <motion.ul
              className="space-y-3"
              variants={staggerContainerVariants}
            >
              {[
                { name: "Ground Shipping", url: "/services" },
                { name: "Freight Services", url: "/freight" },
                { name: "Ocean Freight", url: "/services" },
                { name: "Warehousing", url: "/services" },
                { name: "Support", url: "/support" },
              ].map((service, i) => (
                <motion.li
                  key={service.name}
                  variants={fadeUpVariants}
                  custom={i}
                  whileHover={{ x: 3, color: "var(--shipping-600)" }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={service.url}
                    className="text-gray-600 hover:text-shipping-600 transition-colors"
                  >
                    {service.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Newsletter - with enhanced animation */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate={linksInView ? "visible" : "hidden"}
          >
            <motion.h3
              className="font-display font-medium text-lg mb-5"
              variants={fadeUpVariants}
            >
              Stay Updated
            </motion.h3>
            <motion.p
              className="text-gray-600 mb-4"
              variants={fadeUpVariants}
              custom={1}
            >
              Subscribe to our newsletter for shipping tips and exclusive
              offers.
            </motion.p>
            <motion.div
              className="space-y-3"
              variants={staggerContainerVariants}
            >
              <motion.div
                className="relative"
                variants={fadeUpVariants}
                custom={2}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="pr-12 h-11 focus:ring-2 focus:ring-shipping-600 focus:border-shipping-600 transition-all"
                />
                <motion.div
                  variants={buttonHoverVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    size="sm"
                    className="text-white mt-5 hover:bg-top-header/80 bg-top-header cursor-pointer group"
                  >
                    <motion.div
                      animate={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="flex items-center"
                    >
                      Submit
                      <ArrowRight
                        size={16}
                        className="ml-1 group-hover:ml-2 transition-all"
                      />
                    </motion.div>
                  </Button>
                </motion.div>
              </motion.div>
              <motion.p
                className="text-xs text-gray-500"
                variants={fadeUpVariants}
                custom={3}
              >
                By subscribing, you agree to our
                <Link
                  href="/"
                  className="text-shipping-600 hover:underline ml-1"
                >
                  Privacy Policy
                </Link>
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        <motion.hr
          className="my-8 border-gray-200"
          ref={bottomRef}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={
            bottomInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }
          }
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        <motion.div
          className="flex flex-col md:flex-row justify-between items-center"
          initial="hidden"
          animate={bottomInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          <motion.p
            className="text-gray-500 text-sm mb-4 md:mb-0"
            variants={fadeUpVariants}
          >
            &copy; {new Date().getFullYear()} Amermax logistics. All rights
            reserved.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center space-x-4 text-sm"
            variants={staggerContainerVariants}
          >
            {[
              "Terms of Service",
              "Privacy Policy",
              "Cookie Policy",
              "Legal",
            ].map((item, i) => (
              <motion.div key={item} variants={fadeUpVariants} custom={i}>
                <Link
                  href="/"
                  className="text-gray-500 hover:text-shipping-600 mb-2 md:mb-0 transition-colors"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};
