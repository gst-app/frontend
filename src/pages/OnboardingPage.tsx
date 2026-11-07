import { useLocation, useNavigate } from "react-router";
import { getAuthDestination } from "@/features/auth/auth-destination";
import AuthModal from "@/features/auth/components/AuthModal";
import OnboardingForm from "@/features/auth/components/OnboardingForm";
import type { User } from "@/features/auth/types";
import { useAuthStore } from "@/stores/auth.store";

export default function OnboardingPage() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  if (!user) return null;

  const onComplete = (updatedUser: User) => {
    useAuthStore.getState().setUser(updatedUser);
    if (updatedUser.onboardingCompleted) {
      const from = (location.state as { from?: string } | null)?.from;
      void navigate(getAuthDestination(updatedUser, from), { replace: true });
    }
  };

  return (
    <AuthModal className="w-full">
      <OnboardingForm user={user} onComplete={onComplete} />
    </AuthModal>
  );
}
