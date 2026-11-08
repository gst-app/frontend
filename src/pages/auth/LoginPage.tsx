import LoginForm from "@/features/auth/components/LoginForm";
import AuthModal from "@/features/auth/components/AuthModal";

const LoginPage = () => {
  return (
    <AuthModal className="lg:pt-24 pb-8">
      <LoginForm />
    </AuthModal>
  );
};

export default LoginPage;
