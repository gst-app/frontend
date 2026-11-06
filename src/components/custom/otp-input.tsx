import {
  forwardRef,
  useRef,
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { CustomInput } from "@/components/custom/custom-input";
import { cn } from "cn";

type OtpInputProps = {
  /** Number of slots. */
  length?: number;
  /** Characters accepted in each slot. */
  type?: "numeric" | "alphanumeric";
  value: string;
  onChange: (value: string) => void;
  /** Fires once, when the last slot is filled. */
  onComplete?: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  slotClassName?: string;
  "aria-label"?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

const STRIP = { numeric: /\D/g, alphanumeric: /[^a-zA-Z0-9]/g } as const;

/**
 * The value is always a contiguous string ("467"), so there are never gaps.
 * Typing always lands in the first empty slot at most, and deleting shifts
 * the remaining characters left.
 */
const OtpInput = forwardRef<HTMLInputElement, OtpInputProps>(function OtpInput(
  {
    length = 5,
    type = "numeric",
    value,
    onChange,
    onComplete,
    onBlur,
    name,
    disabled,
    autoFocus,
    className,
    slotClassName,
    "aria-label": ariaLabel = "Verification code",
    "aria-invalid": ariaInvalid,
    "aria-describedby": ariaDescribedBy,
  },
  ref,
) {
  const slots = useRef<(HTMLInputElement | null)[]>([]);

  const clean = (text: string) => text.replace(STRIP[type], "");

  const focusSlot = (index: number) =>
    slots.current[Math.max(0, Math.min(index, length - 1))]?.focus();

  const commit = (next: string) => {
    onChange(next);
    if (next.length === length && next !== value) onComplete?.(next);
  };

  // Used by paste and by browser/SMS autofill, which drop the whole code in one slot.
  const insert = (index: number, text: string) => {
    const at = Math.min(index, value.length);
    const next = (value.slice(0, at) + text).slice(0, length);
    commit(next);
    focusSlot(next.length);
  };

  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const typed = clean(event.target.value);
    const at = Math.min(index, value.length);

    if (!typed) {
      commit(value.slice(0, at) + value.slice(at + 1));
      return;
    }

    if (typed.length > 1) {
      insert(index, typed);
      return;
    }

    commit((value.slice(0, at) + typed + value.slice(at + 1)).slice(0, length));
    focusSlot(at + 1);
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !event.currentTarget.value && index > 0) {
      event.preventDefault();
      onChange(value.slice(0, index - 1) + value.slice(index));
      focusSlot(index - 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusSlot(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      focusSlot(index + 1);
    }
  };

  const handlePaste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const text = clean(event.clipboardData.getData("text"));
    if (text) insert(index, text);
  };

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      className={cn("grid gap-2.5 sm:gap-3", className)}
      style={{ gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))` }}
      // Report blur only when focus leaves the whole group, not on every slot change.
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onBlur?.();
      }}
    >
      {Array.from({ length }, (_, index) => (
        <CustomInput
          key={index}
          id={name ? `${name}-${index + 1}` : undefined}
          ref={(element) => {
            slots.current[index] = element;
            if (index !== 0) return;
            if (typeof ref === "function") ref(element);
            else if (ref) (ref as RefObject<HTMLInputElement | null>).current = element;
          }}
          type="text"
          inputMode={type === "numeric" ? "numeric" : "text"}
          pattern={type === "numeric" ? "[0-9]*" : undefined}
          // Only the first slot advertises one-time-code so autofill fills the whole code once.
          autoComplete={index === 0 ? "one-time-code" : "off"}
          autoFocus={autoFocus && index === 0}
          placeholder=" " // lets CustomInput's not-placeholder-shown style mark filled slots
          value={value[index] ?? ""}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of ${length}`}
          aria-invalid={ariaInvalid}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={(event) => handlePaste(index, event)}
          onFocus={(event) => event.target.select()}
          className={cn(
            "h-14 rounded-xl px-0 text-center text-xl font-semibold not-placeholder-shown:border-[#319765]",
            slotClassName,
          )}
        />
      ))}
    </div>
  );
});

OtpInput.displayName = "OtpInput";

export { OtpInput };
export type { OtpInputProps };
