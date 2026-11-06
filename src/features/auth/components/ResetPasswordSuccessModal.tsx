import Modal from "@/components/custom/modal";
import MessageIcon from "@/assets/icons/reset-message.svg?react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { ROUTES } from "@/config/routes";

interface ModalProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

const ResetPasswordSuccessModal: React.FC<ModalProps> = ({ onOpenChange, open }) => {
  const navigate = useNavigate();
  const goToLogin = () => navigate(ROUTES.LOGIN, { replace: true, state: null });

  return (
    <Modal
      title="Welcome Back!"
      headerClassName="sr-only"
      onOpenChange={onOpenChange}
      open={open}
      showCloseButton={false}
      width="md"
      overlayClassName="bg-slate-900/25 backdrop-blur-md"
      contentClassName="h-auto max-h-[90dvh] w-md! overflow-y-auto rounded-[40px] border-0 bg-white p-0 shadow-[0_12px_18px_rgb(17_24_39_/_24%)]"
    >
      <div className="px-12 py-10 flex flex-col items-center gap-6 sm:gap-10 min-h-full">
        <MessageIcon />
        <div className="h-full flex gap-8 items-center flex-col justify-between">
          <div className="flex flex-col gap-10 items-center text-center">
            <h2 className="sm:text-3xl text-2xl text-primary!">Welcome Back!</h2>
            <p className="text-heading sm:text-xl text-lg text-black">
              You have successfully reset and created a new password.
            </p>
          </div>

          <Button size="lg" className="w-full" onClick={goToLogin}>
            Go to Login
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ResetPasswordSuccessModal;
