"use client";

import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const Achievement = () => {
  // Create refs for the elements we want to animate when they come into view
  const [containerRef, containerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [statsRef, statsInView] = useInView({
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
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const countUpVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const dividerVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  // Array of stats for cleaner rendering
  const stats = [
    {
      icon: "/images/order.png",
      value: "9.8M",
      label: "Successful Deliveries",
      delay: 0,
    },
    {
      icon: "/images/earth.png",
      value: "12.4K",
      label: "Global Business Partners",
      delay: 0.2,
    },
    {
      icon: "/images/truck.png", // Added new stat with truck icon
      value: "98%",
      label: "On-time Delivery Rate",
      delay: 0.4,
    },
  ];

  return (
    <div className="bg-primary-text py-12 md:py-16 lg:py-20 text-white">
      <div ref={containerRef} className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={containerInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
        >
          {/* Left side - Image with animation */}
          <motion.div
            ref={imageRef}
            initial="hidden"
            animate={imageInView ? "visible" : "hidden"}
            variants={imageVariants}
            className="p-4 md:p-6 lg:p-10 w-full lg:w-2/5"
          >
            <motion.div
              className="relative mx-auto lg:mx-0 w-full max-w-[320px] md:max-w-[380px] lg:size-[450px] aspect-square bg-gray-200 rounded-3xl lg:rounded-4xl overflow-hidden shadow-lg"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <Image
                src="/images/port.jpg"
                alt="Port operations with cargo containers"
                fill
                className="object-cover"
              />
              {/* Overlay gradient for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              {/* Achievement badge */}
              <motion.div
                className="absolute bottom-6 right-6 bg-secondary text-white px-4 py-2 rounded-full font-medium text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                25+ Years of Excellence
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right side content */}
          <div className="space-y-5 md:space-y-6 mt-4 lg:mt-0 w-full lg:w-3/5">
            <motion.p
              variants={itemVariants}
              className="uppercase font-medium text-sm md:text-base text-secondary tracking-wider"
            >
              Why Choose Us
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight"
            >
              Setting New Standards in Global Logistics & Supply Chain
              Excellence
            </motion.h2>

            <div className="flex flex-col md:flex-row items-start justify-between gap-8 lg:gap-10 h-full">
              <motion.div
                variants={containerVariants}
                className="grid gap-5 lg:gap-6 w-full md:w-3/5"
              >
                <motion.p
                  variants={itemVariants}
                  className="text-sm md:text-base text-gray-200 leading-relaxed"
                >
                  We combine industry expertise with cutting-edge technology to
                  ensure your shipments are secure, timely, and efficient. Our
                  comprehensive logistics network spans across 120+ countries,
                  providing reliable delivery solutions for businesses of all
                  sizes.
                </motion.p>

                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="font-semibold flex items-center gap-2 w-fit px-5 md:px-6 py-3 bg-white text-primary-text rounded-md cursor-pointer shadow-lg transition-transform"
                >
                  <span>Discover Our Services</span>
                  <ArrowRight size={18} />
                </motion.button>
              </motion.div>

              {/* Animated divider */}
              <motion.div
                variants={dividerVariants}
                className="hidden md:block h-32 lg:h-48 w-1 bg-secondary/60 rounded-full"
                style={{ originY: 0 }}
              />

              {/* Stats section */}
              <motion.div
                ref={statsRef}
                initial="hidden"
                animate={statsInView ? "visible" : "hidden"}
                variants={containerVariants}
                className="w-full md:w-2/5 grid gap-8 mt-6 md:mt-0"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={countUpVariants}
                    custom={index}
                    transition={{ delay: stat.delay }}
                    className="flex items-center gap-4"
                  >
                    <motion.div
                      whileHover={{
                        rotate: [0, -10, 10, -10, 0],
                        transition: { duration: 0.5 },
                      }}
                      className="bg-white/10 p-3 rounded-2xl"
                    >
                      <Image
                        src={stat.icon}
                        width={50}
                        height={50}
                        alt={`${stat.label} icon`}
                        className="w-12 h-12 md:w-14 md:h-14 object-contain"
                      />
                    </motion.div>
                    <div className="flex flex-col items-start">
                      <motion.span
                        className="text-2xl md:text-3xl font-bold text-secondary"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + stat.delay, duration: 0.5 }}
                      >
                        {stat.value}
                      </motion.span>
                      <motion.p
                        className="text-xs md:text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + stat.delay, duration: 0.5 }}
                      >
                        {stat.label}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
