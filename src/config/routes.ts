export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  GOOGLE_CALLBACK: "/auth/google/callback",
  ONBOARDING: "/auth/onboarding",
  DASHBOARD: "/dashboard",
  VERIFY_EMAIL: "/auth/verify-email",
  SIGNUP: "/auth/signup",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  FORGOT_PASSWORD_VERIFY_OTP: "/auth/forgot-password/verify-otp",
  STUDENT: {
    DASHBOARD: "/dashboard",
    PROFILE: "/dashboard/profile",
    ASSESSMENT: "/dashboard/assessment",
    SUMMARY: "/dashboard/summary",
    PROGRESS: "/dashboard/progress",
    SETTINGS: "/dashboard/settings",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
  },
} as const;
