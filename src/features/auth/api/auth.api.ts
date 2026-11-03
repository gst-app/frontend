import type {
  CreateUserPayload,
  ForgotPasswordPayload,
  LoginPayload,
  ResetPasswordPayload,
} from "@/features/auth/schemas";
import type { LoginResponse, User } from "@/features/auth/types";
import { apiClient } from "@/lib/api-client";
import type { MessageResponse } from "@/lib/api-types";

// Public endpoints use skipAuth, so a wrong password (401) is never mistaken for an expired session.
const PUBLIC = { skipAuth: true } as const;

export const authApi = {
  signup: (payload: CreateUserPayload) =>
    apiClient.post<User>("/auth/signup", payload, PUBLIC).then((res) => res.data),

  verifyEmail: (payload: { email: string; token: string }) =>
    apiClient.post<MessageResponse>("/auth/verify-email", payload, PUBLIC).then((res) => res.data),

  resendVerification: (payload: { email: string }) =>
    apiClient
      .post<MessageResponse>("/auth/resend-verification", payload, PUBLIC)
      .then((res) => res.data),

  me: () => apiClient.get<User>("/users/me", { _retry: true }).then((res) => res.data),

  login: (payload: LoginPayload) =>
    apiClient.post<LoginResponse>("/auth/login", payload, PUBLIC).then((res) => res.data),

  logout: () => apiClient.post<void>("/auth/logout", null, PUBLIC),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    apiClient
      .post<MessageResponse>("/auth/forgot-password", payload, PUBLIC)
      .then((res) => res.data),

  resetPassword: (payload: ResetPasswordPayload) =>
    apiClient
      .post<MessageResponse>("/auth/reset-password", payload, PUBLIC)
      .then((res) => res.data),
};
