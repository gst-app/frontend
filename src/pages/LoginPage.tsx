import LoginForm from "@/features/auth/components/LoginForm";
import AuthModal from "@/features/auth/components/AuthModal";
import { useLocation, useNavigate } from "react-router";
import { Check } from "lucide-react";
import SuccessModal from "@/components/custom/success-modal";
import AuthLayout from "@/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

const LoginPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dismissSuccess = () => navigate(ROUTES.LOGIN, { replace: true, state: null });
  if (state?.passwordReset === true) {
    return (
      <>
        <AuthLayout />
        <SuccessModal
          open
          onOpenChange={(open) => {
            if (!open) dismissSuccess();
          }}
          title="Password reset successful"
          description="Your password has been reset successfully. You can now sign in with your new password."
          icon={<Check />}
          action={<Button onClick={dismissSuccess}>Go to sign in</Button>}
        />
      </>
    );
  }
  return (
    <AuthModal className="lg:pt-24 pb-8">
      <LoginForm />
    </AuthModal>
  );
};

export default LoginPage;
