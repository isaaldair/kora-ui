import { forwardRef, type InputHTMLAttributes } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {}

const base =
  "peer size-4 shrink-0 rounded border " +
  "border-[var(--color-border-strong)] bg-[var(--color-background)] " +
  "accent-[var(--color-accent)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] " +
  "disabled:cursor-not-allowed disabled:opacity-50";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", ...rest }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      className={[base, className].filter(Boolean).join(" ")}
      {...rest}
    />
  ),
);

Checkbox.displayName = "Checkbox";
