"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import Image from "next/image";

interface PageTransitionProps {
  children: ReactNode;
}

// Animation for the logo overlay (adjust timing as needed)
const logoVariants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: { duration: 0.8, ease: "easeIn" },
  },
};

// Animation for the page content sliding in from right to left
const pageVariants = {
  initial: { opacity: 0, x: "100%" },
  animate: {
    opacity: 1,
    x: "0%",
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
  },
  exit: {
    opacity: 0,
    x: "-100%",
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    // When the pathname changes, show the logo first
    setShowLogo(true);
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 1500); // Adjust the duration as needed
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {showLogo ? (
        <motion.div
          key="logo"
          variants={logoVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 flex items-center justify-center bg-white z-50"
        >
          {/* Replace with your actual logo image */}
          <Image
            src="/logos/logo-light.png"
            alt="Logo"
            width={200}
            height={200}
          />
        </motion.div>
      ) : (
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="overflow-x-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
