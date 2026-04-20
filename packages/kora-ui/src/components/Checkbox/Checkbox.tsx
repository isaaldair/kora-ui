import { forwardRef, type InputHTMLAttributes } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {}

const base =
  "peer size-4 shrink-0 rounded border border-neutral-300 bg-white text-neutral-900 " +
  "accent-neutral-900 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 " +
  "disabled:cursor-not-allowed disabled:opacity-50 " +
  "dark:border-neutral-700 dark:bg-neutral-950 dark:accent-white " +
  "dark:focus-visible:ring-white dark:focus-visible:ring-offset-neutral-950";

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
