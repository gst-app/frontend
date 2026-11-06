import { Navigate, Outlet, useLocation } from "react-router";
import { ROUTES } from "@/config/routes";
import { useAuthStore } from "@/stores/auth.store";
import SessionStatus from "@/features/auth/components/SessionStatus";

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

  return <Outlet />;
}
