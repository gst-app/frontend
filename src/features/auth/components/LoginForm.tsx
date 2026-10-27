import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { CustomInput } from "@/components/custom/custom-input";
import { ROUTES } from "@/config/routes";
import googleIcon from "@/assets/icons/google-icon.svg";
import { loginSchema, type LoginPayload, type LoginValues } from "@/features/auth/schemas";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface LoginFormProps {
  onSubmitRequest?: (payload: LoginPayload) => void;
}

function ErrorMessage({ message }: { message?: string }) {
  return message ? <p className="mt-1 text-xs text-[#d92d20]">{message}</p> : null;
}

export default function LoginForm({ onSubmitRequest }: LoginFormProps) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = ({ email, password }: LoginValues) => {
    onSubmitRequest?.({ email, password });

    if (!onSubmitRequest) {
      toast.info("Sign in will be available once the account service is connected.");
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

          <div className="">
            <label htmlFor="login-password" className="block mb-2.25">
              Password
            </label>
            <div className="relative">
              <CustomInput
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                icon={<LockKeyhole />}
                {...register("password")}
                aria-invalid={!!errors.password}
              />
              <Button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                variant="ghost"
                size="icon"
                icon={
                  showPassword ? (
                    <Eye className="size-5 stroke-[1.8]" />
                  ) : (
                    <EyeOff className="size-5 stroke-[1.8]" />
                  )
                }
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-2.5 h-13.5 w-7 self-end text-[#344054]"
              />
            </div>
            <ErrorMessage message={errors.password?.message} />
          </div>

          <div className="flex items-center justify-between text-base leading-5 lg:col-span-2">
            <label className="flex items-center gap-2">
              <Checkbox
                className="size-5 accent-[#319765] rounded-md"
                {...register("rememberMe")}
              />
              <span className="text-sm">Remember me</span>
            </label>
            <Link to={ROUTES.FORGOT_PASSWORD}>
              <Button
                type="button"
                onClick={() => toast.info("Password recovery will be available soon.")}
                variant="ghost"
                className="h-auto rounded px-1 text-sm font-bold text-[#007b37] italic hover:bg-transparent! hover:text-[#007b37]/90"
              >
                Forgot Password?
              </Button>
            </Link>
          </div>

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

      <div className="mt-16 flex justify-center lg:px-0  md:px-6">
        <Button
          type="submit"
          size="lg"
          className="text-lg shadow-[0_3px_3px_rgb(0_77_31/65%)] transition active:translate-y-0.5 active:shadow-none lg:uppercase w-full lg:w-xs min-w-fit mx-auto [animation-timing-function:linear] animation-duration-[300ms] font-body"
        >
          Sign in
        </Button>
      </div>
    </form>
  );
}
