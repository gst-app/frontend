import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { ROUTES } from "@/config/routes";
import SignupForm from "@/features/auth/components/SignupForm";
import AuthModal from "@/features/auth/components/AuthModal";
import { User } from "lucide-react";
import { forgotPasswordSchema } from "@/features/auth/schemas";
import SuccessModal from "@/components/custom/success-modal";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/AuthLayout";

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
        <SuccessModal
          open
          appearance="registration"
          onOpenChange={(open) => {
            if (!open) signIn();
          }}
          title="Account created!"
          description={`Your account has been created. Check ${email} for a verification link before signing in.`}
          icon={<User />}
          action={
            <Button size="lg" className="w-full normal-case shadow-md" onClick={signIn}>
              Go to sign in
            </Button>
          }
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
