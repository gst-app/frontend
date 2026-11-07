import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, LoaderCircle, LockKeyhole, Mail, User } from "lucide-react";
import { useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { CustomInput } from "@/components/custom/custom-input";
import { PasswordField } from "@/components/custom/password-field";
import { CustomSelect } from "@/components/custom/custom-select";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROUTES } from "@/config/routes";
import { signupSchema, type SignupValues } from "@/features/auth/schemas";
import Layers from "@/assets/icons/layers.svg?react";
import House from "@/assets/icons/house.svg?react";
import googleIcon from "@/assets/icons/google-icon.svg";
import { FACULTIES, getDepartmentsByFaculty } from "@/config/academic";
import { useSignup } from "@/features/auth/hooks/use-signup";
import {
  getApiErrorCode,
  getApiErrorMessage,
  getApiFieldErrors,
  getRetryAfterSeconds,
} from "@/lib/api-error";
import { ERROR_CODE } from "@/config/error-codes";
import { useCountdown } from "@/hooks/use-countdown";
import { formatWait } from "@/utils/time";

function ErrorMessage({ message }: { message?: string }) {
  return message ? <p className="mt-1 text-xs text-[#d92d20]">{message}</p> : null;
}

export default function SignupForm() {
  const navigate = useNavigate();
  const signup = useSignup();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectBoundary, setSelectBoundary] = useState<HTMLElement | null>(null);
  const retryCooldown = useCountdown(0, { autoStart: false });

  const onSelectOpenChange = (open: boolean) => {
    if (open) {
      setSelectBoundary(
        formRef.current?.closest<HTMLElement>('[data-slot="dialog-content"]') ?? null,
      );
    }
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
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

  const faculty = useWatch({ control, name: "faculty" });
  const departments = getDepartmentsByFaculty(faculty);

  const onSubmit = async ({
    username,
    email,
    password,
    academicLevel,
    department,
    faculty,
  }: SignupValues) => {
    if (isSubmitting || signup.isPending || retryCooldown.isRunning) return;

    clearErrors();

    const selectedFaculty = FACULTIES.find((item) => item.id === faculty);
    const selectedDepartment = getDepartmentsByFaculty(faculty).find(
      (item) => item.id === department,
    );
    if (!selectedFaculty) {
      setError("faculty", { message: "Select a valid faculty" });
      return;
    }
    if (!selectedDepartment) {
      setError("department", { message: "Select a department belonging to your faculty" });
      return;
    }

    const payload = {
      username,
      email,
      password,
      academicInfo: {
        academicLevel,
        department: selectedDepartment.name,
        faculty: selectedFaculty.name,
      },
    };

    try {
      await signup.mutateAsync(payload);
      reset();

      navigate(ROUTES.SIGNUP, { replace: true, state: { signupEmail: email } });
    } catch (error) {
      const retryAfter = getRetryAfterSeconds(error);

      if (retryAfter) {
        retryCooldown.restart(retryAfter);
        setError("root", { message: "Too many attempts. Please wait before trying again." });

        return;
      }

      for (const [name, message] of Object.entries(getApiFieldErrors(error))) {
        const field = name.replace(/^academicInfo\./, "");

        if (
          field === "username" ||
          field === "email" ||
          field === "password" ||
          field === "confirmPassword" ||
          field === "academicLevel" ||
          field === "department" ||
          field === "faculty"
        )
          setError(field, { message });
      }

      const code = getApiErrorCode(error);

      if (code === ERROR_CODE.EMAIL_TAKEN)
        setError("email", { message: getApiErrorMessage(error) });
      else if (code === ERROR_CODE.USERNAME_TAKEN)
        setError("username", { message: getApiErrorMessage(error) });
      else toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <form
      ref={formRef}
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
                autoComplete="name"
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
            <PasswordField
              id="signup-password"
              label="Password"
              autoComplete="new-password"
              icon={<LockKeyhole />}
              registration={register("password")}
              error={errors.password?.message}
            />

            <PasswordField
              id="signup-confirm-password"
              label="Confirm password"
              autoComplete="new-password"
              icon={<LockKeyhole />}
              registration={register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
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
                <option value="postgraduate">Postgraduate</option>
              </CustomSelect>
              <ErrorMessage message={errors.academicLevel?.message} />
            </div>

            <div>
              <label htmlFor="signup-faculty" className="mt-4.25 mb-2.25 block  leading-5">
                Faculty
              </label>
              <Controller
                name="faculty"
                control={control}
                render={({ field }) => (
                  <Select
                    name={field.name}
                    value={field.value || null}
                    items={FACULTIES.map((item) => ({ value: item.id, label: item.name }))}
                    disabled={isSubmitting || signup.isPending}
                    onOpenChange={onSelectOpenChange}
                    onValueChange={(value) => {
                      field.onChange(value ?? "");
                      setValue("department", "", { shouldValidate: true });
                    }}
                  >
                    <SelectTrigger
                      id="signup-faculty"
                      ref={field.ref}
                      onBlur={field.onBlur}
                      aria-invalid={!!errors.faculty}
                      className="h-11! w-full min-w-0 gap-2 bg-accent data-placeholder:bg-muted text-base md:text-sm"
                    >
                      <House aria-hidden="true" className="size-4 text-muted-foreground" />
                      <SelectValue placeholder="Select your faculty" />
                    </SelectTrigger>
                    <SelectContent
                      align="start"
                      alignItemWithTrigger={false}
                      portalContainer={selectBoundary ?? undefined}
                      collisionBoundary={selectBoundary ?? undefined}
                      className="max-h-[min(240px,var(--available-height))]!"
                    >
                      {FACULTIES.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.id}
                          className="[&>span]:min-w-0 [&>span]:whitespace-normal! [&>span]:wrap-break-word"
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <ErrorMessage message={errors.faculty?.message} />
            </div>

            <div>
              <label htmlFor="signup-department" className="mt-4.25 mb-2.25 block  leading-5">
                Department
              </label>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <Select
                    name={field.name}
                    value={field.value || null}
                    items={departments.map((item) => ({ value: item.id, label: item.name }))}
                    disabled={!faculty || isSubmitting || signup.isPending}
                    onOpenChange={onSelectOpenChange}
                    onValueChange={(value) =>
                      setValue("department", value ?? "", {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                  >
                    <SelectTrigger
                      id="signup-department"
                      ref={field.ref}
                      onBlur={field.onBlur}
                      aria-invalid={!!errors.department}
                      className="h-11! w-full min-w-0 gap-2 bg-accent data-placeholder:bg-muted text-base md:text-sm"
                    >
                      <House aria-hidden="true" className="size-4 text-muted-foreground" />
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent
                      align="start"
                      alignItemWithTrigger={false}
                      portalContainer={selectBoundary ?? undefined}
                      collisionBoundary={selectBoundary ?? undefined}
                      className="max-h-[min(240px,var(--available-height))]!"
                    >
                      {departments.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.id}
                          className="[&>span]:min-w-0 [&>span]:whitespace-normal! [&>span]:wrap-break-word"
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <ErrorMessage message={errors.department?.message} />
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

        {errors.root?.message ? (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {errors.root.message}
          </p>
        ) : null}
        <Button
          type="submit"
          disabled={isSubmitting || signup.isPending || retryCooldown.isRunning}
          size="lg"
          className="mt-6 flex w-full items-center justify-center  text-lg shadow-[0_3px_3px_rgb(0_77_31/65%)] transition active:translate-y-0.5 active:shadow-none lg:uppercase md:w-xs min-w-fit mx-auto [animation-timing-function:linear] animation-duration-[300ms] font-body"
        >
          {isSubmitting || signup.isPending ? (
            <LoaderCircle aria-hidden="true" className="size-5 motion-safe:animate-spin" />
          ) : null}
          {isSubmitting || signup.isPending
            ? "Creating account…"
            : retryCooldown.isRunning
              ? `Try again in ${formatWait(retryCooldown.remaining)}`
              : "Create account"}
        </Button>
      </div>
    </form>
  );
}
