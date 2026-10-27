import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(255, "Email is too long")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be 128 characters or fewer"),
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
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .max(255, "Email is too long")
      .email("Enter a valid email address"),
    academicLevel: z.string().trim().min(1, "Select your level"),
    department: z.string().trim().min(1, "Select your department"),
    faculty: z.string().trim().min(1, "Select your faculty"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be 128 characters or fewer"),
    confirmPassword: z
      .string()
      .min(1, "Confirm your password")
      .max(128, "Password must be 128 characters or fewer"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;

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
