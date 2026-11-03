import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, LoaderCircle, LockKeyhole, ShieldHalf } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { useResetPassword } from "@/features/auth/hooks/use-reset-password";
import { getApiErrorMessage, getApiFieldErrors } from "@/lib/api-error";
import { PasswordField } from "@/components/custom/password-field";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { createNewPasswordSchema, type CreateNewPasswordValues } from "@/features/auth/schemas";

interface CreateNewPasswordFormProps {
  /** From the five-digit recovery code entry step. */
  email: string;
  token: string;
}

export default function CreateNewPasswordForm({ email, token }: CreateNewPasswordFormProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const resetPassword = useResetPassword();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateNewPasswordValues>({
    resolver: zodResolver(createNewPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async ({ newPassword }: CreateNewPasswordValues) => {
    if (isSubmitting || resetPassword.isPending) return;
    clearErrors();
    try {
      await resetPassword.mutateAsync({ email, token, newPassword });
      reset();
      navigate(pathname, { replace: true, state: { passwordReset: true } });
    } catch (error) {
      for (const [field, message] of Object.entries(getApiFieldErrors(error))) {
        if (field === "newPassword" || field === "confirmPassword") setError(field, { message });
      }
      setError("root", { message: getApiErrorMessage(error) });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex min-h-dvh w-full flex-col gap-6 bg-white px-6 pt-6 pb-8 text-[#344054] lg:static lg:grid lg:h-full lg:min-h-0 lg:grid-rows-[1fr_auto_1fr] lg:bg-transparent lg:px-10 lg:py-8"
    >
      {/* Mobile-only back button */}
      <Button
        type="button"
        onClick={() =>
          navigate(`${ROUTES.FORGOT_PASSWORD_VERIFY_OTP}?email=${encodeURIComponent(email)}`, {
            replace: true,
          })
        }
        variant="ghost"
        size="icon-sm"
        icon={<ArrowLeft className="size-6 stroke-[1.5]" />}
        className="text-[#475467] lg:hidden"
        aria-label="Back to verification code"
      />

      <div className="grid grid-cols-1 lg:row-start-2 lg:grid-cols-2 lg:items-center">
        {/* Desktop heading */}
        <section className="lg:flex hidden">
          <h2 className="text-[clamp(3.5rem,5vw,5rem)] leading-[0.98] font-medium tracking-[-0.055em] text-[#111827]">
            Create New
            <br />
            Password 🔐
          </h2>
        </section>

        {/* Mobile heading */}
        <div className="mb-4 lg:hidden">
          <h1 className="font-heading text-[30px] leading-12 font-semibold text-[#111827]">
            Create new password 🔐
          </h1>
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-base leading-6 text-[#667085] lg:text-lg lg:leading-7">
            Save the new password in a safe place.
          </p>

          <div className="space-y-5">
            <PasswordField
              id="new-password"
              autoComplete="new-password"
              label={
                <>
                  <span className="lg:hidden">Create a new password</span>
                  <span className="hidden lg:inline">Password</span>
                </>
              }
              icon={<LockKeyhole />}
              registration={register("newPassword")}
              error={errors.newPassword?.message}
            />
            <PasswordField
              id="confirm-new-password"
              autoComplete="new-password"
              label={
                <>
                  <span className="lg:hidden">Confirm the new password</span>
                  <span className="hidden lg:inline">Confirm Password</span>
                </>
              }
              icon={<ShieldHalf />}
              registration={register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
          </div>
          {errors.root?.message ? (
            <p role="alert" className="text-sm text-destructive">
              {errors.root.message}
            </p>
          ) : null}
          <Button
            type="button"
            variant="ghost"
            onClick={() =>
              navigate(`${ROUTES.FORGOT_PASSWORD_VERIFY_OTP}?email=${encodeURIComponent(email)}`, {
                replace: true,
              })
            }
          >
            Correct or resend your code
          </Button>
        </div>
      </div>

      <div className="flex justify-center max-lg:mt-auto md:px-6 lg:row-start-3 lg:mt-0 lg:self-end lg:px-0">
        <Button
          type="submit"
          disabled={isSubmitting || resetPassword.isPending}
          size="lg"
          className="text-lg shadow-[0_3px_3px_rgb(0_77_31/65%)] transition active:translate-y-0.5 active:shadow-none lg:uppercase w-full lg:w-xs min-w-fit mx-auto [animation-timing-function:linear] animation-duration-[300ms] font-body"
        >
          {isSubmitting || resetPassword.isPending ? (
            <LoaderCircle aria-hidden="true" className="size-5 motion-safe:animate-spin" />
          ) : null}
          {isSubmitting || resetPassword.isPending ? "Resetting password…" : "Confirm"}
        </Button>
      </div>
    </form>
  );
}
