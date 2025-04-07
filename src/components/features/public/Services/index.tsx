"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

export const Service = () => {
  // Create refs for the elements we want to animate when they come into view
  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Pulse animation for the dots on the map
  const pulseVariants = {
    initial: { scale: 0.8, opacity: 0.3 },
    animate: {
      scale: 1.2,
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 1.5,
      },
    },
  };

  return (
    <div className="bg-gray-200">
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <motion.div
              ref={imageRef}
              initial="hidden"
              animate={imageInView ? "visible" : "hidden"}
              variants={imageVariants}
              className="relative"
            >
              {/* Animated World Map */}
              <div className="relative aspect-square">
                <motion.div
                  className="absolute -top-10 -left-10 -right-10 -bottom-10 bg-dots-pattern opacity-10"
                  animate={{
                    opacity: [0.05, 0.15, 0.05],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="relative w-full h-full max-w-lg mx-auto lg:ml-auto"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src="/images/box.jpeg"
                    alt="Global shipping network"
                    fill
                    className="w-full h-auto"
                  />
                </motion.div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md max-h-md">
                  {/* Pulse points */}
                  {[
                    { top: "30%", left: "20%" },
                    { top: "40%", left: "48%" },
                    { top: "35%", left: "70%" },
                    { top: "65%", left: "35%" },
                    { top: "60%", left: "80%" },
                  ].map((position, index) => (
                    <motion.div
                      key={index}
                      className="absolute w-3 h-3 bg-secondary rounded-full shadow-lg"
                      style={position}
                      variants={pulseVariants}
                      initial="initial"
                      animate="animate"
                      transition={{
                        delay: index * 0.3,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              ref={contentRef}
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <motion.span
                variants={itemVariants}
                className="inline-block py-1 px-3 rounded-full bg-secondary/25 text-secondary text-sm font-medium mb-4"
              >
                Container Shipping
              </motion.span>

              <motion.h2
                variants={itemVariants}
                className="text-top-header font-bold text-3xl sm:text-4xl mb-5"
              >
                Efficient Container Transport Solutions
              </motion.h2>

              <motion.p variants={itemVariants} className="text-gray-600 mb-6">
                From standard containers to specialized equipment, we provide
                comprehensive container shipping services for all your cargo
                needs, with expert handling and reliable delivery.
              </motion.p>

              <motion.div
                variants={containerVariants}
                className="flex flex-col space-y-4"
              >
                {[
                  "Standard, refrigerated, and specialized containers",
                  "Full container (FCL) and less than container (LCL) shipments",
                  "Real-time container tracking and monitoring",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center"
                  >
                    <motion.div
                      className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center mr-4 flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Check size={18} className="text-white" />
                    </motion.div>
                    <p className="text-gray-600">{feature}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
