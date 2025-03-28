"use server";
import { prisma } from "@/constants/config/db";
import { RegisterSchema } from "./_definitions/schema";
import bcrypt from "bcryptjs";
import disposableEmailDomains from "disposable-email-domains";
import nodemailer from "nodemailer";
import { randomBytes } from "crypto";

export type FormState = {
  success: boolean;
  message: string;
  errorMessage?: unknown;
};

export async function registerAction(
  _previousState: unknown,
  formData: FormData
): Promise<FormState> {
  const registerFormData = Object.fromEntries(formData);
  const results = RegisterSchema.safeParse(registerFormData);

  if (!results.success)
    return {
      success: false,
      errorMessage: results.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input",
    };

  const { email, firstname, lastname, password, phone } = results.data;
  const fullname = `${firstname} ${lastname}`;

  // Check for disposable email domains
  const emailDomain = email.split("@")[1].toLowerCase();
  if (disposableEmailDomains.includes(emailDomain)) {
    return {
      success: false,
      message: "Please use a valid, non-disposable email address.",
    };
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser)
    return {
      success: false,
      message: "Email already exist",
    };

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationToken = randomBytes(32).toString("hex");
  const tokenExpiration = new Date();
  tokenExpiration.setHours(tokenExpiration.getHours() + 1);

  await prisma.user.create({
    data: {
      email,
      name: fullname,
      phone,
      password: hashedPassword,
      role: "USER",
      verificationToken,
      verificationTokenExpiresAt: tokenExpiration,
    },
  });

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465, // true for port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Build the verification URL (make sure NEXT_PUBLIC_BASE_URL is set in your env)
  const verificationUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;

  // Send the verification email
  await transporter.sendMail({
    from: process.env.SMTP_FROM, // e.g. '"Your Company" <no-reply@yourcompany.com>'
    to: email,
    subject: "Verify your email address",
    text: `Hi ${fullname},\n\nPlease verify your email by clicking on the following link:\n\n${verificationUrl}\n\nIf you did not sign up for this account, please ignore this email.\n\nThanks,\nYour Company`,
    html: `<p>Hi ${fullname},</p>
           <p>Please verify your email by clicking the link below:</p>
           <p><a href="${verificationUrl}">Verify Email</a></p>
           <p>If you did not sign up for this account, please ignore this email.</p>
           <p>Thanks,<br>Your Company</p>`,
  });

  return {
    success: true,
    message: "User Registered",
  };
}
