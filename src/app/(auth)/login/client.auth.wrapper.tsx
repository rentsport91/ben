"use client";

import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { MotionDiv } from "@/components/motion.div";
import { LoginForm } from "@/components/features/auth/login.form";
import ResendVerification from "@/components/features/auth/resend.verification";

export default function ClientAuthWrapper() {
  const searchParams = useSearchParams();
  // Check for unverified flag and optionally the email address
  const unverified = searchParams.get("unverified");

  return (
    <>
      {unverified === "true" && (
        <div className="mb-6">
          {/* Render the ResendVerification component */}
          <ResendVerification />
        </div>
      )}
      <AnimatePresence mode="wait">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <LoginForm />
        </MotionDiv>
      </AnimatePresence>
    </>
  );
}
