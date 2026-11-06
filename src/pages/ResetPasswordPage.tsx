import { Navigate, useLocation, useNavigate } from "react-router";
import { Check } from "lucide-react";
import SuccessModal from "@/components/custom/success-modal";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/AuthLayout";
import { ROUTES } from "@/config/routes";
import CreateNewPasswordForm from "@/features/auth/components/CreateNewPasswordForm";
import type { ResetPasswordPayload } from "@/features/auth/schemas";
import { forgotPasswordSchema, verifyOtpSchema } from "@/features/auth/schemas";
import AuthModal from "@/features/auth/components/AuthModal";

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
        <SuccessModal
          open
          appearance="password-reset"
          title="Welcome Back!"
          description="You have successfully reset and created a new password."
          icon={<Check />}
          onOpenChange={(open) => {
            if (!open) goToLogin();
          }}
          action={
            <Button size="lg" className="w-full normal-case shadow-md" onClick={goToLogin}>
              Go to Login
            </Button>
          }
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
