import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { OtpInput } from "@/components/custom/otp-input";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { OTP_LENGTH, verifyOtpSchema, type VerifyOtpValues } from "@/features/auth/schemas";
import { useCountdown } from "@/hooks/use-countdown";
import { useForgotPassword } from "@/features/auth/hooks/use-forgot-password";
import { getApiErrorMessage } from "@/lib/api-error";

const RESEND_SECONDS = 60;

interface VerifyOtpFormProps {
  email: string;
  onSubmitRequest: (values: VerifyOtpValues) => void;
  onResend?: () => void;
}

export default function ForgotPasswordVerifyOtpForm({
  email,
  onResend,
  onSubmitRequest,
}: VerifyOtpFormProps) {
  const navigate = useNavigate();
  const resend = useForgotPassword();
  const { remaining, isRunning, restart } = useCountdown(RESEND_SECONDS);
  const {
    control,
    handleSubmit,
    resetField,
    setFocus,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { otp: "" },
  });

  const onSubmit = async (values: VerifyOtpValues) => {
    if (isSubmitting || resend.isPending) return;

    await onSubmitRequest(values);
  };

  const handleResend = async () => {
    if (isRunning || resend.isPending || isSubmitting) return;
    clearErrors("root");
    try {
      if (onResend) await onResend();
      else await resend.mutateAsync({ email });
      restart();
      resetField("otp");
      setFocus("otp");
      toast.success("A new code has been sent.");
    } catch (error) {
      setError("root", { message: getApiErrorMessage(error) });
    }
  };

  const describedBy = ["otp-description", errors.otp && "otp-error"].filter(Boolean).join(" ");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex min-h-dvh w-full flex-col gap-6 bg-white px-6 pt-6 pb-8 text-[#344054] lg:static lg:grid lg:h-full lg:min-h-0 lg:grid-rows-[1fr_auto_1fr] lg:bg-transparent lg:px-10 lg:py-8"
    >
      {/* Mobile-only back button → returns to forgot password */}
      <Button
        type="button"
        onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
        variant="ghost"
        size="icon-sm"
        icon={<ArrowLeft className="size-6 stroke-[1.5]" />}
        className="text-[#475467] lg:hidden"
        aria-label="Back to forgot password"
      />

      <div className="grid grid-cols-1 lg:row-start-2 lg:grid-cols-2 lg:items-center">
        {/* Desktop heading */}
        <section className="lg:flex hidden">
          <h2 className="text-[clamp(3.5rem,5vw,5rem)] leading-[0.98] font-medium tracking-[-0.055em] text-[#111827]">
            You’ve got
            <br />
            mail 📩
          </h2>
        </section>

        {/* Mobile heading */}
        <div className="mb-4 lg:hidden">
          <h1 className="font-heading text-[30px] leading-12 font-semibold text-[#111827]">
            You’ve got mail 📩
          </h1>
        </div>

        <div className="flex flex-col gap-6">
          <p
            id="otp-description"
            className="text-lg leading-6 text-[#6B7280] lg:text-lg lg:leading-7"
          >
            We have sent the OTP verification code to your email address. Check your email and enter
            the code below.
          </p>

          <div>
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <OtpInput
                  {...field}
                  length={OTP_LENGTH}
                  autoFocus
                  disabled={resend.isPending || isSubmitting}
                  aria-label="Verification code"
                  aria-invalid={!!errors.otp}
                  aria-describedby={describedBy}
                />
              )}
            />
            {errors.otp ? (
              <p id="otp-error" role="alert" className="mt-2 text-xs text-[#d92d20]">
                {errors.otp.message}
              </p>
            ) : null}
            {errors.root?.message ? (
              <p role="alert" className="mt-2 text-sm text-destructive">
                {errors.root.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col items-center gap-1 text-center text-base text-[#111827] lg:gap-3">
            <p>Didn’t receive email?</p>
            {isRunning ? (
              <p>
                You can resend code in{" "}
                <span className="font-semibold tabular-nums text-[#007b37]">{remaining}</span> s
              </p>
            ) : (
              <Button
                type="button"
                onClick={handleResend}
                disabled={resend.isPending || isSubmitting}
                variant="ghost"
                className="h-auto rounded px-1 text-base font-bold text-[#007b37] hover:bg-transparent! hover:text-[#007b37]/90"
              >
                {resend.isPending ? "Sending code…" : "Resend code"}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center max-lg:mt-auto md:px-6 lg:row-start-3 lg:mt-0 lg:self-end lg:px-0">
        <Button
          type="submit"
          disabled={isSubmitting || resend.isPending}
          size="lg"
          className="text-lg shadow-[0_3px_3px_rgb(0_77_31/65%)] transition active:translate-y-0.5 active:shadow-none lg:uppercase w-full lg:w-xs min-w-fit mx-auto [animation-timing-function:linear] animation-duration-[300ms] font-body"
        >
          Continue
        </Button>
      </div>
    </form>
  );
}
