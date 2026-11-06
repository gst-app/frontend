import { Navigate, Outlet, useLocation } from "react-router";
import { ROUTES } from "@/config/routes";
import { useAuthStore } from "@/stores/auth.store";
import SessionStatus from "@/features/auth/components/SessionStatus";

export default function GuestRoute() {
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const location = useLocation();
  if (!isInitialized) return <SessionStatus />;

  if (user) {
    const from = (location.state as { from?: string } | null)?.from;
    const destination =
      typeof from === "string" &&
      from.startsWith("/") &&
      !from.startsWith("//") &&
      !from.includes("\\") &&
      !from.startsWith("/auth/")
        ? from
        : ROUTES.DASHBOARD;
    return <Navigate to={destination} replace />;
  }

  return <Outlet />;
}
