import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { CustomInput } from "@/components/custom/custom-input";
import { CustomSelect } from "@/components/custom/custom-select";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { signupSchema, type CreateUserPayload, type SignupValues } from "@/features/auth/schemas";
import Layers from "@/assets/icons/layers.svg?react";
import House from "@/assets/icons/house.svg?react";
import googleIcon from "@/assets/icons/google-icon.svg";

interface SignupFormProps {
  onSubmitRequest?: (payload: CreateUserPayload) => void;
}

function ErrorMessage({ message }: { message?: string }) {
  return message ? <p className="mt-1 text-xs text-[#d92d20]">{message}</p> : null;
}

export default function SignupForm({ onSubmitRequest }: SignupFormProps) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      academicLevel: "",
      department: "",
      faculty: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = ({
    username,
    email,
    password,
    academicLevel,
    department,
    faculty,
  }: SignupValues) => {
    onSubmitRequest?.({
      username,
      email,
      password,
      academicInfo: { academicLevel, department, faculty },
    });

    if (!onSubmitRequest) {
      toast.info("Account creation will be available once the account service is connected.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex min-h-dvh w-full flex-col bg-white  lg:bg-transparent md:p-8 md:py-6 p-6"
    >
      <Button
        type="button"
        onClick={() => navigate(ROUTES.HOME)}
        variant="ghost"
        size="icon-sm"
        icon={<ArrowLeft className="size-6 stroke-[1.5]" />}
        className="absolute top-12 left-6 text-[#475467] lg:hidden"
        aria-label="Back to home"
      />
      <div className="">
        <header className="text-center lg:col-span-2 mb-3">
          <h1 className="font-heading text-3xl pb-2 font-semibold text-[#111827]">
            Create an account ✍️
          </h1>
          <p className="text-[#6B7280]">Please fill in the details below</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="mb-6 text-sm leading-4 font-bold tracking-[0.02em] text-[#374151] uppercase">
              Personal info
            </h2>

            <div>
              <label htmlFor="signup-username" className="mb-2.25 block">
                Username
              </label>
              <CustomInput
                id="signup-username"
                placeholder="johndoe"
                autoComplete="username"
                icon={<User />}
                {...register("username")}
                aria-invalid={!!errors.username}
              />
              <ErrorMessage message={errors.username?.message} />
            </div>

            <div>
              <label htmlFor="signup-email" className="mb-2.25 block">
                Email
              </label>
              <CustomInput
                id="signup-email"
                type="email"
                placeholder="johndoe@example.com"
                autoComplete="email"
                icon={<Mail />}
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              <ErrorMessage message={errors.email?.message} />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="mb-6 text-sm leading-4 font-bold tracking-[0.02em] text-[#374151] uppercase">
              Security
            </h2>
            <div>
              <label htmlFor="signup-password" className="mb-2.25 block">
                Password
              </label>
              <div className="relative">
                <CustomInput
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
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
                  className="absolute inset-y-0 right-2.5 h-13.5 w-7 text-[#374151]"
                />
              </div>
              <ErrorMessage message={errors.password?.message} />
            </div>

            <div>
              <label htmlFor="signup-confirm-password" className="mb-2.25 block">
                Confirm password
              </label>
              <div className="relative">
                <CustomInput
                  id="signup-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  icon={<LockKeyhole />}
                  aria-invalid={!!errors.confirmPassword}
                />
                <Button
                  type="button"
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  variant="ghost"
                  size="icon"
                  icon={
                    showConfirmPassword ? (
                      <Eye className="size-5 stroke-[1.8]" />
                    ) : (
                      <EyeOff className="size-5 stroke-[1.8]" />
                    )
                  }
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-2.5 h-[54px] w-7 text-[#374151]"
                />
              </div>
              <ErrorMessage message={errors.confirmPassword?.message} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
          <div className="space-y-4">
            <h2 className="mb-4 text-sm leading-4 font-bold tracking-[0.02em] text-[#374151] uppercase">
              Academic info
            </h2>
            <div>
              <label htmlFor="signup-level" className="mb-2.25 block leading-5">
                Level
              </label>
              <CustomSelect
                id="signup-level"
                icon={<Layers />}

                {...register("academicLevel")}
                aria-invalid={!!errors.academicLevel}
              >
                <option value="">Select your level</option>
                <option value="100_level">100 level</option>
                <option value="200_level">200 level</option>
                <option value="300_level">300 level</option>
                <option value="400_level">400 level</option>
                <option value="500_level">500 level</option>
              </CustomSelect>
              <ErrorMessage message={errors.academicLevel?.message} />
            </div>

            <div>
              <label htmlFor="signup-department" className="mt-4.25 mb-2.25 block  leading-5">
                Department
              </label>
              <CustomSelect
                id="signup-department"
                icon={<House />}
                {...register("department")}
                aria-invalid={!!errors.department}
              >
                <option value="">Computer Science</option>
                <option value="computer-science">Computer Science</option>
                <option value="business">Business Administration</option>
                <option value="engineering">Engineering</option>
              </CustomSelect>
              <ErrorMessage message={errors.department?.message} />
            </div>

            <div>
              <label htmlFor="signup-faculty" className="mt-4.25 mb-2.25 block  leading-5">
                Faculty
              </label>
              <CustomSelect
                id="signup-faculty"
                icon={<House />}
                {...register("faculty")}
                aria-invalid={!!errors.faculty}
              >
                <option value="">Physical Sciences</option>
                <option value="physical-sciences">Physical Sciences</option>
                <option value="arts">Arts</option>
                <option value="social-sciences">Social Sciences</option>
              </CustomSelect>
              <ErrorMessage message={errors.faculty?.message} />
            </div>
          </div>
          <div className="space-y-5">
            <div className="mt-8 flex items-center gap-2.5 text-sm text-[#667085] lg:col-span-2 font-heading">
              <span className="h-px flex-1 bg-[#D9D9D9]" />
              <span>or</span>
              <span className="h-px flex-1 bg-[#D9D9D9]" />
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

        <Button
          type="submit"
          size="lg"
          className="mt-6 flex w-full items-center justify-center  text-lg shadow-[0_3px_3px_rgb(0_77_31/65%)] transition active:translate-y-0.5 active:shadow-none lg:uppercase md:w-xs min-w-fit mx-auto [animation-timing-function:linear] animation-duration-[300ms] font-body"
        >
          Create account
        </Button>
      </div>
    </form>
  );
}
