import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router";

import ForgotPasswordVerifyOtpForm from "@/features/auth/components/ForgotPasswordVerifyOtpForm";
import AuthModal from "@/features/auth/components/AuthModal";
import { ROUTES } from "@/config/routes";
import { emailSchema } from "@/features/auth/schemas";

const ForgotPasswordVerifyOtpPage = () => {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const [params] = useSearchParams();

  const queryEmail = params.get("email");
  const result = emailSchema.safeParse(queryEmail ?? state?.email);

  // Missing or invalid: back to the start of the flow
  if (!result.success) return <Navigate to={ROUTES.FORGOT_PASSWORD} replace />;

  const email = result.data;

  // Arrived via the email link: move the email from the URL into state
  if (queryEmail) return <Navigate to={pathname} replace state={{ email }} />;

  return (
    <AuthModal>
      <ForgotPasswordVerifyOtpForm
        email={email}
        onSubmitRequest={({ otp }) =>
          navigate(ROUTES.RESET_PASSWORD, { state: { email, token: otp } })
        }
      />
    </AuthModal>
  );
};

export default ForgotPasswordVerifyOtpPage;
