import { cn } from "cn";
import { forwardRef, type ReactNode } from "react";

type CustomInputProps = React.ComponentPropsWithoutRef<"input"> & {
  icon?: ReactNode;
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-muted-foreground [&>svg:not([class*='size-'])]:size-4"
          >
            {icon}
          </span>
        ) : null}
        <input
          ref={ref}
          data-slot="custom-input"
          className={cn(
            "h-11 w-full min-w-0 rounded-lg border border-input bg-[#F9FAFB] px-2.5 py-1 text-sm transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 placeholder:text-[#9CA3AF] md:text-sm  dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 not-placeholder-shown:bg-[#E6FBE9] ",
            icon && "pl-9",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

CustomInput.displayName = "CustomInput";

export { CustomInput };
export type { CustomInputProps };
