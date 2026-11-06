import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useForgotPassword } from "@/features/auth/hooks/use-forgot-password";
import { getApiErrorMessage, getApiFieldErrors, getRetryAfterSeconds } from "@/lib/api-error";
import { CustomInput } from "@/components/custom/custom-input";
import { ROUTES } from "@/config/routes";
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/features/auth/schemas";
import { Button } from "@/components/ui/button";
import { useCountdown } from "@/hooks/use-countdown";

function ErrorMessage({ message }: { message?: string }) {
  return message ? <p className="mt-1 text-xs text-[#d92d20]">{message}</p> : null;
}

const formatWait = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const forgotPassword = useForgotPassword();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const retryCooldown = useCountdown(0, { autoStart: false });

  const onSubmit = async ({ email }: ForgotPasswordValues) => {
    if (isSubmitting || forgotPassword.isPending || retryCooldown.isRunning) return;

    clearErrors();

    try {
      await forgotPassword.mutateAsync({ email });

      navigate(`${ROUTES.FORGOT_PASSWORD_VERIFY_OTP}?email=${encodeURIComponent(email)}`);
    } catch (error) {
      const retryAfter = getRetryAfterSeconds(error);

      if (retryAfter) {
        retryCooldown.restart(retryAfter);
        setError("root", { message: "Too many attempts. Please wait before trying again." });

        return;
      }

      const fields = getApiFieldErrors(error);

      if (fields.email) setError("email", { message: fields.email });
      setError("root", { message: getApiErrorMessage(error) });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex min-h-dvh w-full flex-col gap-6 bg-white px-6 pt-6 pb-8 text-[#344054] lg:static lg:grid lg:h-full lg:min-h-0 lg:grid-rows-[1fr_auto_1fr] lg:bg-transparent lg:px-10 lg:py-8"
    >
      {/* Mobile-only back button → returns to login */}
      <Button
        type="button"
        onClick={() => navigate(ROUTES.LOGIN)}
        variant="ghost"
        size="icon-sm"
        icon={<ArrowLeft className="size-6 stroke-[1.5]" />}
        className="text-[#475467] lg:hidden"
        aria-label="Back to sign in"
      />

      <div className="grid grid-cols-1 lg:row-start-2 lg:grid-cols-2 lg:items-center">
        {/* Desktop heading */}
        <section className="lg:flex hidden">
          <h2 className="text-[clamp(3.5rem,5vw,5rem)] leading-[0.98] font-medium tracking-[-0.055em] text-[#111827]">
            Forgot
            <br />
            Password 🔐
          </h2>
        </section>

        {/* Mobile heading */}
        <div className="mb-4 lg:hidden">
          <h1 className="font-heading text-[30px] leading-12 font-semibold text-[#111827]">
            Forgot Password 🔐
          </h1>
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-base leading-6 text-[#6B7280] lg:text-lg">
            Enter your email address to get an OTP code to reset your password.
          </p>

          <div>
            <label htmlFor="forgot-email" className="block mb-2.25 tracking-wide">
              Email
            </label>
            <CustomInput
              id="forgot-email"
              type="email"
              placeholder="johndoe@example.com"
              autoComplete="email"
              icon={<Mail />}
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            <ErrorMessage message={errors.email?.message} />
            {errors.root?.message ? (
              <p role="alert" className="mt-2 text-sm text-destructive">
                {errors.root.message}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex justify-center max-lg:mt-auto md:px-6 lg:row-start-3 lg:mt-0 lg:self-end lg:px-0">
        <Button
          type="submit"
          disabled={isSubmitting || forgotPassword.isPending || retryCooldown.isRunning}
          size="lg"
          className="text-lg shadow-[0_3px_3px_rgb(0_77_31/65%)] transition active:translate-y-0.5 active:shadow-none lg:uppercase w-full lg:w-xs min-w-fit mx-auto [animation-timing-function:linear] animation-duration-[300ms] font-body"
        >
          {isSubmitting || forgotPassword.isPending
            ? "Sending code…"
            : retryCooldown.isRunning
              ? `Try again in ${formatWait(retryCooldown.remaining)}`
              : "Continue"}
        </Button>
      </div>
    </form>
  );
}
