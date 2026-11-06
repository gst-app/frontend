import Modal from "@/components/custom/modal";
import ProfileIcon from "@/assets/icons/success-profile.svg?react";
import SuccessLoader from "@/assets/icons/success-loader.svg?react";

interface ModalProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

const SignupSuccessModal: React.FC<ModalProps> = ({ onOpenChange, open }) => {
  return (
    <Modal
      title="Account created!"
      headerClassName="sr-only"
      onOpenChange={onOpenChange}
      open={open}
      showCloseButton={false}
      width="md"
      overlayClassName="bg-slate-900/25 backdrop-blur-md"
      contentClassName="h-[min(760px,95dvh)] max-h-[90dvh] w-md! overflow-y-auto rounded-[40px] border-0 bg-white p-0 shadow-[0_12px_18px_rgb(17_24_39_/_24%)]"
    >
      <div className="px-12 py-10 flex flex-col items-center gap-6 sm:gap-10 min-h-full justify-between">
        <ProfileIcon />
        <div className="flex gap-8 items-center flex-col">
          <p className="sm:text-xl text-lg text-center text-black font-heading">
            Please wait a moment while the app is preparing....
          </p>
          <SuccessLoader width={80} height={80} strokeWidth={0.5} />
        </div>
      </div>
    </Modal>
  );
};

export default SignupSuccessModal;
