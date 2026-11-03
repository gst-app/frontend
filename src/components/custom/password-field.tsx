import { Eye, EyeOff } from "lucide-react";
import { useState, type ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { CustomInput } from "@/components/custom/custom-input";
import { Button } from "@/components/ui/button";

interface PasswordFieldProps {
  id: string;
  label: ReactNode;
  icon: ReactNode;
  registration: UseFormRegisterReturn;
  error?: string;
  autoComplete: "current-password" | "new-password";
  labelClassName?: string;
  inputClassName?: string;
  toggleClassName?: string;
}

export function PasswordField({
  id,
  label,
  icon,
  registration,
  error,
  autoComplete,
  labelClassName = "",
  inputClassName = "pr-11",
  toggleClassName = "",
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className={`block mb-2.25 ${labelClassName}`}>
        {label}
      </label>
      <div className="relative">
        <CustomInput
          id={id}
          type={visible ? "text" : "password"}
          placeholder="••••••••"
          autoComplete={autoComplete}
          icon={icon}
          className={inputClassName}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...registration}
        />
        <Button
          type="button"
          onClick={() => setVisible((current) => !current)}
          variant="ghost"
          size="icon"
          icon={
            visible ? (
              <Eye className="size-5 stroke-[1.8]" />
            ) : (
              <EyeOff className="size-5 stroke-[1.8]" />
            )
          }
          aria-label={visible ? "Hide password" : "Show password"}
          className={`absolute inset-y-0 right-2.5 my-auto h-8 w-7 text-[#374151] ${toggleClassName}`}
          tabIndex={-1}
        />
      </div>
      {error ? (
        <p id={errorId} role="alert" className="mt-1 text-xs text-[#d92d20]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
