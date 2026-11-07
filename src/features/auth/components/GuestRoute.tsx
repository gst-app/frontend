import { Navigate, Outlet, useLocation } from "react-router";
import { getAuthDestination } from "@/features/auth/auth-destination";
import { useAuthStore } from "@/stores/auth.store";
import SessionStatus from "@/features/auth/components/SessionStatus";

export default function GuestRoute() {
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const location = useLocation();
  if (!isInitialized) return <SessionStatus />;

  if (user) {
    const from = (location.state as { from?: string } | null)?.from;
    return (
      <Navigate
        to={getAuthDestination(user, from)}
        replace
        state={user.onboardingCompleted ? null : { from }}
      />
    );
  }

  return <Outlet />;
}
