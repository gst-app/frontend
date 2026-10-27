import { ChevronDownIcon } from "lucide-react";
import { cn } from "cn";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

type CustomSelectProps = ComponentPropsWithoutRef<"select"> & {
  icon?: React.ReactNode;
};

const CustomSelect = forwardRef<HTMLSelectElement, CustomSelectProps>(
  ({ className, icon, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-2.5 z-10 flex items-center text-muted-foreground [&>svg:not([class*='size-'])]:size-4"
          >
            {icon}
          </span>
        ) : null}
        <select
          ref={ref}
          data-slot="custom-select"
          className={cn(
            "h-11 w-full min-w-0 appearance-none rounded-lg border border-input has-[option[value='']:checked]:bg-[#F9FAFB] py-1 pr-8 pl-2.5 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 md:text-sm dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 bg-[#E6FBE9]",
            icon && "pl-9",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-2 my-auto size-4 text-muted-foreground"
        />
      </div>
    );
  },
);

CustomSelect.displayName = "CustomSelect";

export { CustomSelect };
export type { CustomSelectProps };
