import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { CustomInput } from "@/components/custom/custom-input";
import { PasswordField } from "@/components/custom/password-field";
import { ROUTES } from "@/config/routes";
import googleIcon from "@/assets/icons/google-icon.svg";
import { loginSchema, type LoginValues } from "@/features/auth/schemas";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useLogin } from "@/features/auth/hooks/use-login";
import { getApiErrorCode, getApiErrorMessage } from "@/lib/api-error";
import { useResendVerification } from "@/features/auth/hooks/use-resend-verification";
import { ERROR_CODE } from "@/config/error-codes";
import { useCountdown } from "@/hooks/use-countdown";

function ErrorMessage({ message }: { message?: string }) {
  return message ? <p className="mt-1 text-xs text-[#d92d20]">{message}</p> : null;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const login = useLogin();
  const resend = useResendVerification();
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const cooldown = useCountdown(60, { autoStart: false });

  const {
    control,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = async ({ email, password, rememberMe }: LoginValues) => {
    if (isSubmitting || login.isPending || resend.isPending) return;

    clearErrors();
    setUnverifiedEmail(null);
    resend.reset();

    try {
      const result = await login.mutateAsync({ email, password, rememberMe });

      if (result.status === "mfa_required") {
        setError("root", {
          message:
            "This account requires multi-factor authentication. That feature is not available here yet.",
        });
      }
    } catch (error) {
      if (getApiErrorCode(error) === ERROR_CODE.EMAIL_UNVERIFIED) setUnverifiedEmail(email);

      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative min-h-dvh flex w-full flex-col bg-white px-6 text-[#344054] lg:static lg:h-full lg:min-h-0 lg:bg-transparent lg:px-10 lg:pt-0 lg:pb-0 space-y-6 pt-6 pb-8"
    >
      <Button
        type="button"
        onClick={() => navigate(ROUTES.HOME)}
        variant="ghost"
        size="icon-sm"
        icon={<ArrowLeft className="size-6 stroke-[1.5]" />}
        className="text-[#475467] lg:hidden"
        aria-label="Back to home"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <section className="lg:flex hidden">
          <h2 className="mt-15.5 max-w-87.5  text-[clamp(3.5rem,5vw,5rem)] leading-[0.98] font-medium tracking-[-0.055em] text-[#111827]">
            Welcome
            <br />
            Back 👋
          </h2>
        </section>

        <div className="mb-9 lg:hidden">
          <h1 className="font-heading text-[30px] leading-9 font-semibold text-[#111827]">
            Welcome Back 👋
          </h1>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="login-email" className="block mb-2.25">
              Email
            </label>
            <CustomInput
              id="login-email"
              type="email"
              placeholder="johndoe@example.com"
              autoComplete="email"
              icon={<Mail />}
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            <ErrorMessage message={errors.email?.message} />
          </div>

          <PasswordField
            id="login-password"
            label="Password"
            autoComplete="current-password"
            icon={<LockKeyhole />}
            registration={register("password")}
            error={errors.password?.message}
          />

          <div className="flex items-center justify-between text-base leading-5 lg:col-span-2">
            <label className="flex items-center gap-2">
              <Controller
                control={control}
                name="rememberMe"
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    name={field.name}
                    onBlur={field.onBlur}
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                    ref={field.ref}
                    aria-describedby="remember-me-description"
                    className="size-5 accent-[#319765] rounded-md"
                  />
                )}
              />
              <span className="text-sm">Remember me</span>
            </label>
            <Link to={ROUTES.FORGOT_PASSWORD}>
              <Button
                type="button"
                variant="ghost"
                className="h-auto rounded px-1 text-sm font-bold text-[#007b37] italic hover:bg-transparent! hover:text-[#007b37]/90"
              >
                Forgot Password?
              </Button>
            </Link>
          </div>
          {/* <p id="remember-me-description" className="text-xs text-muted-foreground">
            Remember me will be available after the session service is updated.
          </p> */}
          {errors.root?.message ? (
            <p role="alert" className="text-sm text-destructive">
              {errors.root.message}
            </p>
          ) : null}
          {unverifiedEmail ? (
            <div className="space-y-2">
              <Button
                type="button"
                variant="link"
                className="h-auto p-0"
                disabled={resend.isPending || isSubmitting || cooldown.isRunning}
                onClick={() =>
                  resend.mutate(
                    { email: unverifiedEmail },
                    {
                      onSuccess: (data) => {
                        toast.success(data.message);
                        cooldown.restart();
                      },
                      onError: (error) => toast.error(getApiErrorMessage(error)),
                    },
                  )
                }
              >
                {resend.isPending
                  ? "Sending…"
                  : cooldown.isRunning
                    ? `Resend in ${cooldown.remaining}s`
                    : "Resend verification email"}
              </Button>
            </div>
          ) : null}

          <div className="md:px-6 space-y-8 mt-11 lg:mt-12">
            <div className="flex items-center gap-2.5 text-[13px] text-[#667085] lg:col-span-2 ">
              <span className="h-px flex-1 bg-[#d6d8dc]" />
              <span>OR</span>
              <span className="h-px flex-1 bg-[#d6d8dc]" />
            </div>

            <Button
              type="button"
              onClick={() => toast.info("Google sign in will be available soon.")}
              variant="outline"
              icon={<img src={googleIcon} alt="" className="size-6" />}
              className="h-13.75 w-full gap-4 rounded-full border-[#EFEFEF] bg-white! text-base text-[#111827] shadow-[0_1px_2.5px_#EFEFEF] hover:bg-slate-50! focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:col-span-2"
            >
              Continue with Google
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center lg:px-0  md:px-6">
        <Button
          type="submit"
          disabled={isSubmitting || login.isPending || resend.isPending}
          size="lg"
          className="text-lg shadow-[0_3px_3px_rgb(0_77_31/65%)] transition active:translate-y-0.5 active:shadow-none lg:uppercase w-full lg:w-xs min-w-fit mx-auto [animation-timing-function:linear] animation-duration-[300ms] font-body"
        >
          {isSubmitting || login.isPending ? "Signing in…" : "Sign in"}
        </Button>
      </div>
    </form>
  );
}
