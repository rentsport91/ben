import { NextResponse } from "next/server";
import { prisma } from "@/constants/config/db";
import { RateLimiterMemory } from "rate-limiter-flexible";
import nodemailer from "nodemailer";
import { randomBytes } from "crypto";

// Set up a rate limiter: 3 requests per minute per email
const rateLimiter = new RateLimiterMemory({
  points: 3,
  duration: 60,
});

export async function POST(request: Request) {
  try {
    // Expect JSON body with the email address
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    // Apply rate limiting using the email as the key
    try {
      await rateLimiter.consume(email);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (rejRes) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please try again later.",
        },
        { status: 429 }
      );
    }

    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "No user found with that email." },
        { status: 404 }
      );
    }

    // Check if the user is already verified
    if (user.isVerified) {
      return NextResponse.json(
        { success: false, message: "Email is already verified." },
        { status: 400 }
      );
    }

    // Generate a new verification token and set its expiration (1 hour from now)
    const newToken = randomBytes(32).toString("hex");
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 1);

    // Update the user's record with the new token and expiration
    await prisma.user.update({
      where: { email },
      data: {
        verificationToken: newToken,
        verificationTokenExpiresAt: tokenExpiration,
      },
    });

    // Create a Nodemailer transporter using your SMTP configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // true for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Construct the verification URL (ensure NEXT_PUBLIC_BASE_URL is set)
    const verificationUrl = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/verify-email?token=${newToken}&email=${encodeURIComponent(email)}`;

    // Send the verification email
    await transporter.sendMail({
      from: process.env.SMTP_FROM, // e.g., "Your Company <no-reply@yourcompany.com>"
      to: email,
      subject: "Verify Your Email Address",
      text: `Please verify your email by clicking on the following link: ${verificationUrl}. This link expires in 1 hour.`,
      html: `<p>Please verify your email by clicking on the following link:</p>
             <p><a href="${verificationUrl}">Verify Email</a></p>
             <p>This link expires in 1 hour.</p>`,
    });

    return NextResponse.json(
      { success: true, message: "Verification email sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { success: false, message: "Server error." },
      { status: 500 }
    );
  }
}
