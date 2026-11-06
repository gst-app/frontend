import { Navigate, useNavigate, useSearchParams } from "react-router";
import { forgotPasswordSchema } from "@/features/auth/schemas";

import ForgotPasswordVerifyOtpForm from "@/features/auth/components/ForgotPasswordVerifyOtpForm";
import AuthModal from "@/features/auth/components/AuthModal";
import { ROUTES } from "@/config/routes";

const ForgotPasswordVerifyOtpPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");
  if (!forgotPasswordSchema.safeParse({ email }).success) {
    return <Navigate to={ROUTES.FORGOT_PASSWORD} replace />;
  }

  return (
    <AuthModal>
      <ForgotPasswordVerifyOtpForm
        onSubmitRequest={({ otp }) =>
          navigate(ROUTES.RESET_PASSWORD, { state: { email, token: otp } })
        }
      />
    </AuthModal>
  );
};

export default ForgotPasswordVerifyOtpPage;
