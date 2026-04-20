import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const base =
  "block w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm transition-colors " +
  "placeholder:text-neutral-400 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 " +
  "disabled:cursor-not-allowed disabled:opacity-50 " +
  "dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500 " +
  "dark:focus-visible:ring-white dark:focus-visible:ring-offset-neutral-950";

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
