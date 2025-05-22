"use server";
import { prisma } from "@/constants/config/db";
import { RegisterSchema } from "../../../app/(auth)/register/definitions/schema";
import bcrypt from "bcryptjs";
import disposableEmailDomains from "disposable-email-domains";

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

  const user = await prisma.user.create({
    data: {
      email,
      name: fullname,
      phone,
      password: hashedPassword,
      role: "USER",
    },
  });

  await prisma.profile.create({
    data: { User: { connect: user } },
  });

  return {
    success: true,
    message: "User Registered",
  };
}
