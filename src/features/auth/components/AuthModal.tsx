import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import Modal from "@/components/custom/modal";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { useMediaQuery } from "@/hooks/use-media-query";
import AuthLayout from "@/layouts/AuthLayout";
import { cn } from "cn";

interface AuthModalProps {
  children: ReactNode;
  /** Classes for the scrolling wrapper around the form (desktop modal only). */
  className?: string;
}

/** Full screen on mobile, centred modal over the auth background on desktop. */
export default function AuthModal({ children, className }: AuthModalProps) {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const navigate = useNavigate();

  const closeModal = () => navigate(ROUTES.HOME);

  if (isMobile) return <>{children}</>;

  return (
    <>
      <AuthLayout />
      <Modal
        open
        title="Account access"
        headerClassName="sr-only"
        onOpenChange={(open) => {
          if (!open) closeModal();
        }}
        width="4xl"
        showCloseButton={false}
        overlayClassName="bg-slate-900/25 backdrop-blur-md"
        contentClassName="h-[min(760px,95dvh)] max-h-[95dvh] w-[calc(100%-2rem)] sm:!max-w-[956px] overflow-y-auto rounded-[40px] border-0 bg-white p-0 shadow-[0_12px_18px_rgb(17_24_39_/_24%)] box-border"
      >
        <div className="relative h-full bg-white box-border">
          <div className={cn("relative h-full overflow-y-auto!", className)}>{children}</div>

          <Button
            type="button"
            onClick={closeModal}
            variant="ghost"
            size="icon-sm"
            icon={<X className="size-6 stroke-[1.7]" />}
            className="absolute top-6 right-7 z-20 text-[#9ca3af] hover:text-slate-600 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Close"
          />
        </div>
      </Modal>
    </>
  );
}
