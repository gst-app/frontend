import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import SignupPage from "@/pages/SignupPage";
import GlobalErrorBoundary from "@/pages/GlobalErrorBoundary";
import { Outlet, createBrowserRouter } from "react-router";
import { ROUTES } from "@/config/routes";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ForgotPasswordVerifyOtpPage from "@/pages/ForgotPasswordVerifyOtpPage";
import GuestRoute from "@/features/auth/components/GuestRoute";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import DashboardHome from "@/pages/dashboard";
import VerifyEmailPage from "@/pages/VerifyEmailPage";
import GoogleCallbackPage from "@/pages/GoogleCallbackPage";
import OnboardingPage from "@/pages/OnboardingPage";

if (window.location.pathname === ROUTES.GOOGLE_CALLBACK && window.location.hash) {
  const mfaRequired =
    new URLSearchParams(window.location.hash.slice(1)).get("status") === "mfa_required";
  const search = mfaRequired ? "?status=mfa_required" : "?status=invalid";
  window.history.replaceState(null, "", `${ROUTES.GOOGLE_CALLBACK}${search}`);
}

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Outlet />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.VERIFY_EMAIL, element: <VerifyEmailPage /> },
      { path: ROUTES.GOOGLE_CALLBACK, element: <GoogleCallbackPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: ROUTES.DASHBOARD, element: <DashboardHome /> },
          { path: ROUTES.ONBOARDING, element: <OnboardingPage /> },
        ],
      },
      {
        element: <GuestRoute />,
        children: [
          { path: ROUTES.SIGNUP, element: <SignupPage /> },
          { path: ROUTES.LOGIN, element: <LoginPage /> },
          { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
          { path: ROUTES.FORGOT_PASSWORD_VERIFY_OTP, element: <ForgotPasswordVerifyOtpPage /> },
          { path: ROUTES.RESET_PASSWORD, element: <ResetPasswordPage /> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
