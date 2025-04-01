"use server";
import { prisma } from "@/constants/config/db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "~/auth";

// Updated validation schema with proper structure
const updateValidation = z.object({
  company: z.string().optional(),
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
  address: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
  }),
});

export const UpdateProfileAction = async (
  prevState: unknown,
  formData: FormData
) => {
  const session = await auth();
  if (!session?.user) redirect("/");

  // Convert FormData to nested object
  const rawData = {
    company: formData.get("company"),
    bio: formData.get("bio"),
    address: {
      street: formData.get("address.street"),
      city: formData.get("address.city"),
      state: formData.get("address.state"),
      postalCode: formData.get("address.postalCode"),
      country: formData.get("address.country"),
    },
  };

  // Validate data
  const validationResult = updateValidation.safeParse(rawData);

  if (!validationResult.success) {
    // Format Zod errors into user-friendly format
    const errors = validationResult.error.flatten().fieldErrors;
    return {
      success: false,
      errors,
      message: "Validation failed",
    };
  }

  try {
    // Update profile with validated data
    const updatedProfile = await prisma.profile.update({
      where: { userId: session.user.id },
      data: {
        company: validationResult.data.company,
        bio: validationResult.data.bio,
        Address: {
          update: validationResult.data.address,
        },
      },
    });

    return {
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      message: "Database error occurred",
    };
  }
};

const securityFormSchema = z.object({
  currentPassword: z
    .string()
    .min(1, { message: "Current password is required" }),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
});

export const UpdatePassword = async (
  prevState: unknown,
  formData: FormData
) => {
  const session = await auth();
  if (!session?.user) redirect("/");

  const rawData = Object.fromEntries(formData);

  const results = securityFormSchema.safeParse(rawData);

  if (!results.success) {
    // Format Zod errors into user-friendly format
    const errors = results.error.flatten().fieldErrors;
    return {
      success: false,
      errors,
      message: "Validation failed",
    };
  }

  try {
    const user = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      include: {
        User: true,
      },
    });

    if (!user) return redirect("/");

    const match = await bcrypt.compare(
      results.data.currentPassword,
      user.User.password
    );
    if (!match) {
      console.error(`Current password is Invalid`);
      return null;
    }

    const hashedPassword = await bcrypt.hash(results.data.newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "Your password has been changed successfully.",
    };
  } catch (error) {
    console.error("Error updating password:", error);
    return {
      success: false,
      error,
      message: "Failed to update password. Please try again.",
    };
  }
};
