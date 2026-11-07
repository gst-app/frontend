import { Navigate, Outlet, useLocation } from "react-router";
import { ROUTES } from "@/config/routes";
import { useAuthStore } from "@/stores/auth.store";
import SessionStatus from "@/features/auth/components/SessionStatus";
import { getAuthDestination } from "@/features/auth/auth-destination";

export default function ProtectedRoute() {
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const location = useLocation();
  if (!isInitialized) return <SessionStatus />;

  if (!user) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
        state={{ from: location.pathname + location.search + location.hash }}
      />
    );
  }

  const destination = getAuthDestination(user);
  if (destination === ROUTES.ONBOARDING && location.pathname !== ROUTES.ONBOARDING) {
    return (
      <Navigate
        to={destination}
        replace
        state={{ from: location.pathname + location.search + location.hash }}
      />
    );
  }

  if (user.onboardingCompleted && location.pathname === ROUTES.ONBOARDING) {
    const from = (location.state as { from?: string } | null)?.from;
    return <Navigate to={getAuthDestination(user, from)} replace />;
  }

  return <Outlet />;
}
