"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { TrendingUp, Users, CheckCircle } from "lucide-react";
import { ReactNode } from "react";

// Define TypeScript interfaces for our data structures
interface ProgressMetric {
  label: string;
  value: number;
  icon: ReactNode;
}

export const Choice = () => {
  // Create refs for the elements we want to animate when they come into view
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [progressRef, progressInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Parallax effect for the image
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Type-safe progress variants
  const progressVariants = {
    hidden: { width: "0%", opacity: 0 },
    visible: (value: number) => ({
      width: `${value}%`,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.3,
      },
    }),
  };

  // Progress metrics - expanded with additional data
  const progressMetrics: ProgressMetric[] = [
    {
      label: "Successful Delivery Rate",
      value: 96,
      icon: <TrendingUp size={18} className="text-secondary" />,
    },
    {
      label: "Customer Satisfaction",
      value: 98,
      icon: <Users size={18} className="text-secondary" />,
    },
    {
      label: "On-Time Performance",
      value: 94,
      icon: <CheckCircle size={18} className="text-secondary" />,
    },
  ];

  // Additional achievements for the list
  const achievements: string[] = [
    "Certified Logistics Excellence",
    "Carbon-Neutral Operations",
    "Advanced Tracking Technology",
    "Global Network Coverage",
  ];

  return (
    <div className="bg-[url('/images/banner_bg.jpg')] bg-cover bg-fixed py-12 md:py-20 lg:py-32 relative">
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left Content Section */}
          <motion.div
            ref={contentRef}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            variants={staggerContainerVariants}
            className="w-full lg:w-1/2 space-y-4 md:space-y-5 lg:space-y-6"
          >
            <motion.p
              variants={fadeInUpVariants}
              className="uppercase font-medium text-secondary text-sm md:text-base tracking-wider"
            >
              Our Excellence Record
            </motion.p>

            <motion.h2
              variants={fadeInUpVariants}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-top-header drop-shadow-md leading-tight"
            >
              Setting Industry Standards Through Performance Excellence
            </motion.h2>

            <motion.p
              variants={fadeInUpVariants}
              className="w-full lg:w-5/6 text-sm md:text-base text-gray-700 leading-relaxed"
            >
              At Amermax logistics, we&apos;re committed to delivering top-tier
              logistics services with unmatched reliability and efficiency. Our
              comprehensive approach combines advanced technology, expert teams,
              and sustainable practices to ensure your shipments arrive safely
              and on time.
            </motion.p>

            {/* Achievement List */}
            <motion.div
              variants={staggerContainerVariants}
              className="grid grid-cols-2 gap-3 md:gap-4 pt-2 md:pt-4"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUpVariants}
                  className="flex items-center gap-2"
                >
                  <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span className="text-sm md:text-base text-gray-800 font-medium">
                    {achievement}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Progress Bars */}
            <motion.div
              ref={progressRef}
              initial="hidden"
              animate={progressInView ? "visible" : "hidden"}
              variants={staggerContainerVariants}
              className="space-y-4 md:space-y-5 pt-4 md:pt-6"
            >
              {progressMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUpVariants}
                  className="grid gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {metric.icon}
                      <span className="text-sm md:text-base text-gray-800">
                        {metric.label}
                      </span>
                    </div>
                    <span className="text-sm md:text-base font-semibold text-secondary">
                      {metric.value}%
                    </span>
                  </div>
                  <div className="h-2 md:h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      custom={metric.value}
                      variants={progressVariants}
                      className="h-full bg-secondary rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image Section - Centered */}
          <motion.div
            ref={imageRef}
            className="w-full lg:w-1/2 relative mt-10 lg:mt-0 flex justify-center items-center"
            style={{
              perspective: "1000px",
            }}
          >
            <motion.div
              initial="hidden"
              animate={imageInView ? "visible" : "hidden"}
              variants={imageVariants}
              style={{ y: imageY }}
              className="relative mx-auto"
            >
              <motion.div
                className="absolute -inset-4 bg-gradient-to-br from-primary-text/20 to-transparent rounded-2xl blur-md"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              />

              <Image
                src="/images/gold.jpeg"
                alt="Gold standard logistics"
                width={500}
                height={500}
                className="relative max-w-full h-auto rounded-xl shadow-xl mx-auto"
              />

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-6 -left-6 md:bottom-6 md:left-6 bg-white py-2 px-4 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <TrendingUp size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">
                      Since 1995
                    </p>
                    <p className="text-sm font-semibold text-secondary">
                      Industry Leader
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
