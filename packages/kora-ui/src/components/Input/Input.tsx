import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const base =
  "block w-full rounded-md border px-3 py-2 text-sm transition-colors " +
  "border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)] " +
  "placeholder:text-[var(--color-foreground-subtle)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] " +
  "disabled:cursor-not-allowed disabled:opacity-50";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", ...rest }, ref) => (
    <input
      ref={ref}
      type={type}
      className={[base, className].filter(Boolean).join(" ")}
      {...rest}
    />
  ),
);

Input.displayName = "Input";
