"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner"; // optional toast for notifications

export default function ResendVerification() {
  const searchParams = useSearchParams();
  // Retrieve the email from the query string (e.g., ?email=user@example.com)
  const email = searchParams.get("email") || "";
  const [loading, setLoading] = useState(false);

  async function handleResend() {
    if (!email) {
      toast.error("Email address not found.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      toast.error("An error occurred. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        <p className="mb-6">
          If you haven&apos;t received your verification email, click below to
          resend it.
        </p>
        <button
          onClick={handleResend}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          {loading ? "Sending..." : "Resend Verification Email"}
        </button>
      </div>
    </div>
  );
}
