"use client";

import { Info } from "lucide-react";
import Image from "next/image";
import TrackingForm from "../../../tracking.form";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

export const Hero = () => {
  // Using react-intersection-observer hooks
  const { ref: leftSectionRef, inView: isLeftInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const { ref: headingRef, inView: isHeadingInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: formRef, inView: isFormInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: rightSectionRef, inView: isRightInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, delay: 0.2 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="bg-[url('/images/banner_bg.jpg')] bg-cover relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, rotate: -180 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.5 }}
      >
        <Image
          src={"/images/globe.webp"}
          className="absolute animate-spin duration-30000 origin-center top-12 -left-44 hidden lg:block"
          width={350}
          height={350}
          alt="globe"
        />
      </motion.div>
      <div className="relative flex flex-col md:flex-row gap-5 container mx-auto w-full z-10 px-4">
        {/* left side */}
        <motion.div
          ref={leftSectionRef}
          initial="hidden"
          animate={isLeftInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="w-full md:w-1/2 pt-16 md:pt-24 lg:pt-32 pb-10 md:pb-16 lg:pb-28"
        >
          <div className="flex flex-col gap-3 md:gap-4 lg:gap-5">
            <motion.p
              variants={fadeInUp}
              className="uppercase text-primary-text font-semibold text-sm md:text-base"
            >
              Fastest & Secure Shipping
            </motion.p>

            <motion.div
              ref={headingRef}
              initial="hidden"
              animate={isHeadingInView ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <h1 className="capitalize text-top-header text-3xl md:text-4xl lg:text-5xl leading-tight lg:leading-14 font-bold">
                We Deliver Your <br className="hidden md:block" /> Product
                Anywhere!
              </h1>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-xs md:text-sm">
              Fast, secure, and reliable shipping solutions for businesses and
              individuals. Track your packages in real-time and enjoy peace of
              mind.
            </motion.p>

            <motion.div
              ref={formRef}
              initial="hidden"
              animate={isFormInView ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <TrackingForm />

              <div className="flex items-center gap-2 mt-2">
                <Info size={15} className="text-secondary" />
                <p className="text-xs text-muted-foreground">
                  Enter your tracking number (usually 8-12 digits) found in your
                  order confirmation email or shipping label.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* right side */}
        <motion.div
          ref={rightSectionRef}
          initial={{ opacity: 0, x: 50 }}
          animate={isRightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative w-full md:w-1/2 md:self-end mx-auto md:mx-0 hidden md:flex justify-center"
        >
          <Image
            src={"/images/delivery-man.png"}
            width={400}
            height={400}
            alt="delivery-man"
            className=""
          />
        </motion.div>
      </div>
    </div>
  );
};
