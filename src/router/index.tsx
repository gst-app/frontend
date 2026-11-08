import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import SignupPage from "@/pages/auth/SignupPage";
import GlobalErrorBoundary from "@/pages/GlobalErrorBoundary";
import { createBrowserRouter } from "react-router";
import { ROUTES } from "@/config/routes";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ForgotPasswordVerifyOtpPage from "@/pages/auth/ForgotPasswordVerifyOtpPage";
import GuestRoute from "@/features/auth/components/GuestRoute";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import VerifyEmailPage from "@/pages/auth/VerifyEmailPage";
import GoogleCallbackPage from "@/pages/auth/GoogleCallbackPage";
import OnboardingPage from "@/pages/auth/OnboardingPage";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { ADMIN_NAV, STUDENT_NAV } from "@/components/layouts/nav-config";
import RootLayout from "@/components/layouts/RootLayout";
import { Loader2 } from "lucide-react";
import { lazyPage } from "@/router/lazy-page";

// Handle Google OAuth callback with MFA requirement
if (window.location.pathname === ROUTES.GOOGLE_CALLBACK && window.location.hash) {
  const mfaRequired =
    new URLSearchParams(window.location.hash.slice(1)).get("status") === "mfa_required";
  const search = mfaRequired ? "?status=mfa_required" : "?status=invalid";
  window.history.replaceState(null, "", `${ROUTES.GOOGLE_CALLBACK}${search}`);
}

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    errorElement: <GlobalErrorBoundary />,
    HydrateFallback: () => (
      <div className="flex min-h-svh items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.VERIFY_EMAIL, element: <VerifyEmailPage /> },
      { path: ROUTES.GOOGLE_CALLBACK, element: <GoogleCallbackPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: ROUTES.ONBOARDING, element: <OnboardingPage /> },

          // student routes
          {
            element: <DashboardLayout navItems={STUDENT_NAV} />,
            children: [
              {
                path: ROUTES.STUDENT.DASHBOARD,
                lazy: lazyPage(() => import("@/pages/student/StudentDashboardPage")),
              },
              {
                path: ROUTES.STUDENT.PROFILE,
                lazy: lazyPage(() => import("@/pages/student/StudentProfilePage")),
              },
              {
                path: ROUTES.STUDENT.ASSESSMENT,
                lazy: lazyPage(() => import("@/pages/student/AssessmentPage")),
              },
              {
                path: ROUTES.STUDENT.SUMMARY,
                lazy: lazyPage(() => import("@/pages/student/SummaryPage")),
              },
              {
                path: ROUTES.STUDENT.PROGRESS,
                lazy: lazyPage(() => import("@/pages/student/StudentProgressPage")),
              },
              {
                path: ROUTES.STUDENT.SETTINGS,
                lazy: lazyPage(() => import("@/pages/student/SettingsPage")),
              },
            ],
          },

          // Admin routes
          {
            element: <DashboardLayout navItems={ADMIN_NAV} />,
            children: [
              {
                path: ROUTES.ADMIN.DASHBOARD,
                lazy: lazyPage(() => import("@/pages/admin/AdminDashboardPage")),
              },
            ],
          },
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
