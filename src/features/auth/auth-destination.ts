import { ROUTES } from "@/config/routes";
import type { User } from "@/features/auth/types";

export function getAuthDestination(user: User, from?: unknown): string {
  if (!user.onboardingCompleted) return ROUTES.ONBOARDING;

  return typeof from === "string" &&
    from.startsWith("/") &&
    !from.startsWith("//") &&
    !from.includes("\\") &&
    !from.startsWith("/auth/")
    ? from
    : ROUTES.DASHBOARD;
}
