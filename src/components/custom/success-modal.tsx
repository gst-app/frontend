import type { ReactNode } from "react";
import Modal from "@/components/custom/modal";

interface SuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  icon: ReactNode;
  action?: ReactNode;
  dismissible?: boolean;
  appearance?: "default" | "registration" | "password-reset";
}

export default function SuccessModal({
  open,
  onOpenChange,
  title,
  description,
  icon,
  action,
  dismissible = true,
  appearance = "default",
}: SuccessModalProps) {
  if (appearance !== "default") {
    return (
      <Modal
        open={open}
        onOpenChange={onOpenChange}
        showCloseButton={dismissible}
        title={title}
        description={description}
        overlayClassName="bg-slate-900/25 backdrop-blur-md motion-reduce:animate-none"
        headerClassName="relative text-center mt-auto gap-6 sm:gap-10 [&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:leading-tight [&>h2]:text-primary sm:[&>h2]:text-[40px] [&>p]:text-lg [&>p]:leading-tight [&>p]:text-card-foreground [&>p]:break-words sm:[&>p]:text-[26px]"
        contentClassName="isolate flex! h-[min(818px,calc(100dvh-2rem))] max-h-[calc(100dvh-2rem)] flex-col gap-8 overflow-x-hidden overflow-y-auto rounded-[40px] border-0 bg-card px-6 py-10 text-card-foreground ring-0 sm:!max-w-[588px] sm:rounded-[60px] sm:px-20 sm:py-14 [&>[data-slot=dialog-close]]:top-5 [&>[data-slot=dialog-close]]:right-5 [&>[data-slot=dialog-close]]:text-muted-foreground motion-reduce:animate-none"
      >
        <div
          aria-hidden="true"
          className="relative order-first mx-auto aspect-square w-full max-w-80 shrink-0"
        >
          <svg viewBox="0 0 320 320" className="size-full text-primary">
            <g fill="currentColor" opacity="0.6">
              <circle cx="22" cy="24" r="22" />
              <circle cx="184" cy="8" r="6" />
              <circle cx="300" cy="55" r="14" />
              <circle cx="8" cy="142" r="4" />
              <circle cx="312" cy="188" r="4" />
              <circle cx="10" cy="254" r="10" />
              <circle cx="90" cy="306" r="6" />
              <circle cx="204" cy="300" r="4" />
              <circle cx="296" cy="284" r="8" />
            </g>
            <circle cx="164" cy="168" r="124" fill="currentColor" />
            {appearance === "registration" ? (
              <g className="text-primary-foreground" fill="currentColor">
                <circle cx="164" cy="144" r="21" />
                <rect x="130" y="172" width="68" height="43" rx="21" />
              </g>
            ) : null}
          </svg>
          {appearance === "password-reset" ? (
            <div className="absolute top-[52.5%] left-[51.25%] flex size-[29%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[28%] bg-primary-foreground text-primary [&>svg]:size-3/4 [&>svg]:stroke-[3]">
              {icon}
            </div>
          ) : null}
        </div>
        {action ? <div className="relative mt-auto pt-4 text-center">{action}</div> : null}
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      showCloseButton={dismissible}
      overlayClassName="motion-reduce:animate-none"
      title={title}
      description={description}
      headerClassName="relative z-10 text-center [&>h2]:text-3xl [&>h2]:leading-tight [&>p]:text-base [&>p]:leading-relaxed"
      contentClassName="isolate max-h-[calc(100dvh-2rem)] overflow-x-hidden overflow-y-auto rounded-3xl bg-card p-8 text-card-foreground shadow-xl sm:!max-w-lg sm:p-12 motion-reduce:animate-none"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-16 size-48 rounded-full bg-accent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -bottom-10 size-32 rounded-full bg-muted"
      />
      <div
        aria-hidden="true"
        className="relative z-10 order-first mx-auto flex size-24 items-center justify-center rounded-full bg-accent text-primary [&>svg]:size-12"
      >
        {icon}
      </div>
      {action ? (
        <div className="relative z-10 mt-4 flex flex-col gap-3 text-center">{action}</div>
      ) : null}
    </Modal>
  );
}
