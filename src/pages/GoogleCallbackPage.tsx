import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { ERROR_CODE } from "@/config/error-codes";
import { ROUTES } from "@/config/routes";
import { startGoogleAuth } from "@/features/auth/api/auth.api";
import { initializeAuth } from "@/features/auth/api/initialize-auth";
import { getAuthDestination } from "@/features/auth/auth-destination";
import SessionStatus from "@/features/auth/components/SessionStatus";
import { useAuthStore } from "@/stores/auth.store";

export default function GoogleCallbackPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const status = params.get("status");

  useEffect(() => {
    if (status === "success") void initializeAuth();
    else if (!useAuthStore.getState().isInitialized) useAuthStore.getState().setInitialized();
  }, [status]);

  useEffect(() => {
    if (status === "success" && isInitialized && user) {
      void navigate(getAuthDestination(user), { replace: true });
    }
  }, [status, isInitialized, user, navigate]);

  if (status === "success" && (!isInitialized || user)) return <SessionStatus />;

  const message =
    status === "mfa_required"
      ? "This account requires multi-factor authentication. Google MFA login is not supported yet."
      : status === "error" && params.get("code") === ERROR_CODE.GOOGLE_LOGIN_FAILED
        ? "Google sign-in failed or was cancelled. Please try again."
        : status === "success"
          ? "Couldn’t restore your Google session. Please sign in again."
          : "This Google sign-in callback is invalid or unsuccessful. Please try again.";

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-2xl">Couldn’t sign in with Google</h1>
      <p role="alert">{message}</p>
      <Button type="button" onClick={startGoogleAuth}>
        Try Google again
      </Button>
      <Button type="button" variant="link" onClick={() => window.location.replace(ROUTES.LOGIN)}>
        Back to sign in
      </Button>
    </main>
  );
}
