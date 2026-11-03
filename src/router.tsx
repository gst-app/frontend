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

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Outlet />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.VERIFY_EMAIL, element: <VerifyEmailPage /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: ROUTES.DASHBOARD, element: <DashboardHome /> }],
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
