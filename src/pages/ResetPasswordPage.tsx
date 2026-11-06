import { Navigate, useLocation, useNavigate } from "react-router";
import AuthLayout from "@/layouts/AuthLayout";
import { ROUTES } from "@/config/routes";
import CreateNewPasswordForm from "@/features/auth/components/CreateNewPasswordForm";
import type { ResetPasswordPayload } from "@/features/auth/schemas";
import { forgotPasswordSchema, verifyOtpSchema } from "@/features/auth/schemas";
import AuthModal from "@/features/auth/components/AuthModal";
import ResetPasswordSuccessModal from "@/features/auth/components/ResetPasswordSuccessModal";

type ResetState = Partial<Pick<ResetPasswordPayload, "email" | "token">> & {
  passwordReset?: boolean;
};

const ResetPasswordPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if ((state as ResetState | null)?.passwordReset === true) {
    const goToLogin = () => navigate(ROUTES.LOGIN, { replace: true, state: null });

    return (
      <>
        <AuthLayout />
        <ResetPasswordSuccessModal
          open
          onOpenChange={(open) => {
            if (!open) goToLogin();
          }}
        />
      </>
    );
  }

  // Set by the verify-otp step. Empty means someone opened this URL directly.
  const { email, token } = (state ?? {}) as ResetState;

  if (
    !email ||
    !token ||
    !forgotPasswordSchema.safeParse({ email }).success ||
    !verifyOtpSchema.safeParse({ otp: token }).success
  ) {
    return <Navigate to={ROUTES.FORGOT_PASSWORD} replace />;
  }

  return (
    <AuthModal>
      <CreateNewPasswordForm email={email} token={token} />
    </AuthModal>
  );
};

export default ResetPasswordPage;
