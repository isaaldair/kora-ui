import { forwardRef, type TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const base =
  "block w-full min-h-[80px] rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm transition-colors " +
  "placeholder:text-neutral-400 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 " +
  "disabled:cursor-not-allowed disabled:opacity-50 " +
  "dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500 " +
  "dark:focus-visible:ring-white dark:focus-visible:ring-offset-neutral-950";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...rest }, ref) => (
    <textarea
      ref={ref}
      className={[base, className].filter(Boolean).join(" ")}
      {...rest}
    />
  ),
);

Textarea.displayName = "Textarea";
