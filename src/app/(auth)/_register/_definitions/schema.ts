import { z } from "zod";
import libphonenumber from "google-libphonenumber";

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

export const RegisterSchema = z.object({
  firstname: z.string().min(3, { message: "Required" }),
  lastname: z.string().min(3, { message: "Field required" }),
  email: z.string().email().nonempty(),
  phone: z
    .string()
    .nonempty({ message: "Mobile number is required" })
    .refine(
      (number) => {
        try {
          const phoneNumber = phoneUtil.parse(number);
          return phoneUtil.isValidNumber(phoneNumber);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          return false;
        }
      },
      { message: "Invalid mobile number" }
    ),
  password: z
    .string()
    .nonempty()
    .min(8, { message: "Password field must be at least 8 characters long" }),
});

export type RegisterProps = z.output<typeof RegisterSchema>;
