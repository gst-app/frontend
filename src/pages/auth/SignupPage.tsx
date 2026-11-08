import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { ROUTES } from "@/config/routes";
import SignupForm from "@/features/auth/components/SignupForm";
import AuthModal from "@/features/auth/components/AuthModal";
import { forgotPasswordSchema } from "@/features/auth/schemas";
import AuthLayout from "@/components/layouts/AuthLayout";
import SignupSuccessModal from "@/features/auth/components/SignupSuccessModal";

const SignupPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.signupEmail;
  const signupComplete =
    typeof email === "string" && forgotPasswordSchema.safeParse({ email }).success;

  useEffect(() => {
    if (!signupComplete) return;
    const timer = window.setTimeout(() => {
      void navigate(ROUTES.LOGIN, { replace: true, state: null });
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [signupComplete, email, navigate]);

  if (signupComplete) {
    const signIn = () => navigate(ROUTES.LOGIN, { replace: true, state: null });
    return (
      <>
        <AuthLayout />
        <SignupSuccessModal
          open
          onOpenChange={(open) => {
            if (!open) signIn();
          }}
        />
      </>
    );
  }

  return (
    <AuthModal className="w-full">
      <SignupForm />
    </AuthModal>
  );
};

export default SignupPage;
