import { NextResponse } from "next/server";
import { prisma } from "@/constants/config/db";
import { RateLimiterMemory } from "rate-limiter-flexible";

// Create an in-memory rate limiter: 5 requests per 60 seconds per email
const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60,
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  const token = url.searchParams.get("token");

  // Check if required query parameters are present
  if (!email || !token) {
    return NextResponse.json(
      { success: false, message: "Missing email or token." },
      { status: 400 }
    );
  }

  // Apply rate limiting using the email as the key
  try {
    await rateLimiter.consume(email);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (rejRes) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // Look up the user by email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { success: false, message: "Invalid verification link." },
      { status: 400 }
    );
  }

  // Check that the verification token matches
  if (user.verificationToken !== token) {
    return NextResponse.json(
      { success: false, message: "Invalid verification token." },
      { status: 400 }
    );
  }

  // Check if the token has expired
  if (
    user.verificationTokenExpiresAt &&
    user.verificationTokenExpiresAt < new Date()
  ) {
    return NextResponse.json(
      { success: false, message: "Verification token has expired." },
      { status: 400 }
    );
  }

  // Everything is valid; update the user to mark the email as verified
  await prisma.user.update({
    where: { email },
    data: {
      isVerified: true,
      verificationToken: null,
      verificationTokenExpiresAt: null,
    },
  });

  return NextResponse.json(
    { success: true, message: "Email verified successfully." },
    { status: 200 }
  );
}
