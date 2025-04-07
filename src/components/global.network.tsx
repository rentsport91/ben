"use client";

import { Globe, MapPin } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

export const GlobalNetwork = () => {
  const { ref: leftSectionRef, inView: isLeftInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const { ref: rightSectionRef, inView: isRightInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const fadeInRight = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div>
      <section className="py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              ref={leftSectionRef}
              initial="hidden"
              animate={isLeftInView ? "visible" : "hidden"}
              variants={fadeInRight}
            >
              <motion.span
                variants={itemVariant}
                className="inline-block py-1 px-3 rounded-full bg-secondary/25 text-secondary text-sm font-medium mb-4"
              >
                Global Network
              </motion.span>
              <motion.h2
                variants={itemVariant}
                className="text-top-header font-bold text-4xl md:text-4xl mb-5"
              >
                Connecting Businesses Worldwide
              </motion.h2>
              <motion.p variants={itemVariant} className="text-gray-600 mb-6">
                Our extensive global network ensures your shipments reach
                virtually any destination with efficiency and reliability. With
                strategic hubs across continents, we optimize routes for speed
                and cost-effectiveness.
              </motion.p>

              <motion.div
                variants={staggerItems}
                className="flex flex-col space-y-4"
              >
                <motion.div variants={itemVariant} className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-secondary/25 flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin size={20} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      220+ Countries & Territories
                    </h3>
                    <p className="text-gray-600">
                      Comprehensive global coverage for all your shipping needs
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariant} className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-secondary/25 flex items-center justify-center mr-4 flex-shrink-0">
                    <Globe size={20} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Strategic Global Hubs
                    </h3>
                    <p className="text-gray-600">
                      Optimized routing through key logistics centers worldwide
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              ref={rightSectionRef}
              initial="hidden"
              animate={isRightInView ? "visible" : "hidden"}
              variants={fadeInLeft}
              className="relative"
            >
              {/* Animated World Map */}
              <div className="relative">
                <motion.div
                  animate={{
                    opacity: [0.1, 0.15, 0.1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute -top-10 -left-10 -right-10 -bottom-10 bg-dots-pattern opacity-10"
                ></motion.div>

                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src={"/images/map.png"}
                    alt="Global shipping network"
                    width={200}
                    height={200}
                    className="w-full h-auto max-w-lg mx-auto lg:ml-auto"
                  />
                </motion.div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md max-h-md">
                  {/* Pulse points with staggered animations */}
                  {[
                    { top: "30%", left: "20%", delay: 0 },
                    { top: "40%", left: "48%", delay: 0.5 },
                    { top: "35%", left: "70%", delay: 1 },
                    { top: "65%", left: "35%", delay: 1.5 },
                    { top: "60%", left: "80%", delay: 2 },
                  ].map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                      style={{
                        top: point.top,
                        left: point.left,
                        position: "absolute",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(59, 130, 246, 0.7)",
                        boxShadow: "0 0 0 rgba(59, 130, 246, 0.4)",
                      }}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 2, 1],
                          opacity: [0.7, 0, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "loop",
                          delay: point.delay,
                        }}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          borderRadius: "50%",
                          backgroundColor: "rgba(59, 130, 246, 0.4)",
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
