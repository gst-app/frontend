import { z } from "zod";
import { FACULTIES, getDepartmentsByFaculty } from "@/config/academic";

const emailField = z
  .email("Enter a valid email address")
  .trim()
  .min(1, "Email is required")
  .max(255, "Email is too long");

const passwordField = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be 128 characters or fewer");

const confirmPasswordField = z
  .string()
  .min(1, "Confirm your password")
  .max(128, "Password must be 128 characters or fewer");

export const OTP_LENGTH = 5;

export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
  rememberMe: z.boolean(),
});

export const signupSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username must be 50 characters or fewer")
      .regex(/^[a-zA-Z0-9_]+$/, "Username may only contain letters, numbers, and underscores"),
    email: emailField,
    academicLevel: z
      .string()
      .refine(
        (value) =>
          [
            "100_level",
            "200_level",
            "300_level",
            "400_level",
            "500_level",
            "postgraduate",
          ].includes(value),
        "Select your level",
      ),
    department: z.string().trim().min(1, "Select your department"),
    faculty: z.string().trim().min(1, "Select your faculty"),
    password: passwordField,
    confirmPassword: confirmPasswordField,
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((values) => FACULTIES.some((faculty) => faculty.id === values.faculty), {
    message: "Select a valid faculty",
    path: ["faculty"],
  })
  .refine(
    (values) =>
      getDepartmentsByFaculty(values.faculty).some(
        (department) => department.id === values.department,
      ),
    {
      message: "Select a department belonging to your faculty",
      path: ["department"],
    },
  );

export const forgotPasswordSchema = z.object({ email: emailField });

export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .length(OTP_LENGTH, `Enter the ${OTP_LENGTH}-digit code`)
    .regex(/^\d+$/, "Code must contain only numbers"),
});

export const createNewPasswordSchema = z
  .object({
    newPassword: passwordField,
    confirmPassword: confirmPasswordField,
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type VerifyOtpValues = z.infer<typeof verifyOtpSchema>;
export type CreateNewPasswordValues = z.infer<typeof createNewPasswordSchema>;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface CreateUserPayload {
  username: string;
  email: string;
  password: string;
  academicInfo: {
    academicLevel: string;
    department: string;
    faculty: string;
  };
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  token: string;
  newPassword: string;
}
