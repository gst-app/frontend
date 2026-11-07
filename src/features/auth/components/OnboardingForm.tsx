import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle, Mail, User as UserIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import House from "@/assets/icons/house.svg?react";
import Layers from "@/assets/icons/layers.svg?react";
import { CustomInput } from "@/components/custom/custom-input";
import { CustomSelect } from "@/components/custom/custom-select";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FACULTIES, getDepartmentsByFaculty } from "@/config/academic";
import { ERROR_CODE } from "@/config/error-codes";
import { authApi } from "@/features/auth/api/auth.api";
import { onboardingSchema, type OnboardingValues } from "@/features/auth/schemas";
import type { User } from "@/features/auth/types";
import { getApiErrorCode, getApiErrorMessage, getApiFieldErrors } from "@/lib/api-error";
import { useAuthStore } from "@/stores/auth.store";

function ErrorMessage({ message }: { message?: string }) {
  return message ? (
    <p role="alert" className="mt-1 text-xs text-destructive">
      {message}
    </p>
  ) : null;
}

export default function OnboardingForm({
  user,
  onComplete,
}: {
  user: User;
  onComplete: (user: User) => void;
}) {
  const update = useMutation({ mutationFn: authApi.completeOnboarding });
  const formRef = useRef<HTMLFormElement>(null);
  const submitting = useRef(false);
  const [selectBoundary, setSelectBoundary] = useState<HTMLElement | null>(null);
  const initialFaculty = FACULTIES.find((item) => item.name === user.academicInfo?.faculty);
  const initialDepartment = getDepartmentsByFaculty(initialFaculty?.id ?? "").find(
    (item) => item.name === user.academicInfo?.department,
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      username: user.username,
      academicLevel: user.academicInfo?.academicLevel ?? "",
      faculty: initialFaculty?.id ?? "",
      department: initialDepartment?.id ?? "",
    },
  });

  const faculty = useWatch({ control, name: "faculty" });
  const departments = getDepartmentsByFaculty(faculty);
  const busy = isSubmitting || update.isPending;

  const onSelectOpenChange = (open: boolean) => {
    if (open) {
      setSelectBoundary(
        formRef.current?.closest<HTMLElement>('[data-slot="dialog-content"]') ?? null,
      );
    }
  };

  const onSubmit = async (values: OnboardingValues) => {
    if (submitting.current) return;
    clearErrors();

    const selectedFaculty = FACULTIES.find((item) => item.id === values.faculty);
    const selectedDepartment = getDepartmentsByFaculty(values.faculty).find(
      (item) => item.id === values.department,
    );
    if (!selectedFaculty) {
      setError("faculty", { message: "Select a valid faculty" });
      return;
    }
    if (!selectedDepartment) {
      setError("department", { message: "Select a department belonging to your faculty" });
      return;
    }

    submitting.current = true;
    const version = useAuthStore.getState().sessionVersion;
    try {
      const updatedUser = await update.mutateAsync({
        username: values.username,
        academicInfo: {
          academicLevel: values.academicLevel,
          faculty: selectedFaculty.name,
          department: selectedDepartment.name,
        },
      });
      if (useAuthStore.getState().sessionVersion !== version) return;
      onComplete(updatedUser);
      if (!updatedUser.onboardingCompleted) {
        setError("root", {
          message:
            "Your profile was saved, but onboarding is not complete. Please review your academic information and try again.",
        });
      }
    } catch (error) {
      for (const [name, message] of Object.entries(getApiFieldErrors(error))) {
        const field = name.replace(/^academicInfo\./, "");
        if (
          field === "username" ||
          field === "academicLevel" ||
          field === "faculty" ||
          field === "department"
        ) {
          setError(field, { message });
        }
      }
      if (getApiErrorCode(error) === ERROR_CODE.USERNAME_TAKEN) {
        setError("username", { message: getApiErrorMessage(error) });
      } else {
        setError("root", { message: getApiErrorMessage(error) });
      }
    } finally {
      submitting.current = false;
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      className="relative flex min-h-dvh w-full flex-col bg-white p-6 md:p-8 md:py-6 lg:min-h-full lg:bg-transparent"
    >
      <h1 className="font-heading text-[30px] leading-9 font-semibold text-foreground">
        Complete your profile
      </h1>
      <p className="mt-4 text-muted-foreground">
        Add your academic information to continue to your dashboard.
      </p>
      <div className="flex  flex-1 flex-col justify-between">
        <div>
          <fieldset disabled={busy} className="grid grid-cols-1 gap-8 mt-6">
            <legend className="sr-only">Profile and academic information</legend>
            <div className="space-y-4">
              <h2 className="mb-4 text-sm leading-4 font-bold uppercase text-muted-foreground">
                Personal info
              </h2>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="onboarding-username" className="mb-2.25 block">
                    Username
                  </label>
                  <CustomInput
                    id="onboarding-username"
                    autoComplete="username"
                    icon={<UserIcon />}
                    {...register("username")}
                    aria-invalid={!!errors.username}
                    aria-describedby={errors.username ? "onboarding-username-error" : undefined}
                  />
                  <div id="onboarding-username-error">
                    <ErrorMessage message={errors.username?.message} />
                  </div>
                </div>
                <div>
                  <label htmlFor="onboarding-email" className="mb-2.25 block">
                    Email
                  </label>
                  <CustomInput
                    id="onboarding-email"
                    type="email"
                    autoComplete="email"
                    value={user.email}
                    readOnly
                    icon={<Mail />}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="mb-4 text-sm leading-4 font-bold uppercase text-muted-foreground">
                Academic info
              </h2>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="onboarding-level" className="mb-2.25 block leading-5">
                    Level
                  </label>
                  <CustomSelect
                    id="onboarding-level"
                    icon={<Layers />}
                    {...register("academicLevel")}
                    aria-invalid={!!errors.academicLevel}
                    aria-describedby={errors.academicLevel ? "onboarding-level-error" : undefined}
                  >
                    <option value="">Select your level</option>
                    <option value="100_level">100 level</option>
                    <option value="200_level">200 level</option>
                    <option value="300_level">300 level</option>
                    <option value="400_level">400 level</option>
                    <option value="500_level">500 level</option>
                    <option value="postgraduate">Postgraduate</option>
                  </CustomSelect>
                  <div id="onboarding-level-error">
                    <ErrorMessage message={errors.academicLevel?.message} />
                  </div>
                </div>
                <div>
                  <label htmlFor="onboarding-faculty" className="mb-2.25 block leading-5">
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
                        disabled={busy}
                        onOpenChange={onSelectOpenChange}
                        onValueChange={(value) => {
                          field.onChange(value ?? "");
                          setValue("department", "", { shouldValidate: true });
                        }}
                      >
                        <SelectTrigger
                          id="onboarding-faculty"
                          ref={field.ref}
                          onBlur={field.onBlur}
                          aria-invalid={!!errors.faculty}
                          aria-describedby={errors.faculty ? "onboarding-faculty-error" : undefined}
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
                  <div id="onboarding-faculty-error">
                    <ErrorMessage message={errors.faculty?.message} />
                  </div>
                </div>
                <div>
                  <label htmlFor="onboarding-department" className="mb-2.25 block leading-5">
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
                        disabled={!faculty || busy}
                        onOpenChange={onSelectOpenChange}
                        onValueChange={(value) =>
                          setValue("department", value ?? "", {
                            shouldValidate: true,
                            shouldDirty: true,
                          })
                        }
                      >
                        <SelectTrigger
                          id="onboarding-department"
                          ref={field.ref}
                          onBlur={field.onBlur}
                          aria-invalid={!!errors.department}
                          aria-describedby={
                            errors.department ? "onboarding-department-error" : undefined
                          }
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
                  <div id="onboarding-department-error">
                    <ErrorMessage message={errors.department?.message} />
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
          <div className="mt-8">
            <ErrorMessage message={errors.root?.message} />
          </div>
        </div>
        <Button
          type="submit"
          disabled={busy}
          size="lg"
          icon={busy ? <LoaderCircle className="motion-safe:animate-spin" /> : undefined}
          className="mt-8 w-full md:w-xs mx-auto"
        >
          {busy ? "Saving…" : "Complete onboarding"}
        </Button>
      </div>
    </form>
  );
}
