import { forwardRef, type TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const base =
  "block w-full min-h-[80px] rounded-md border px-3 py-2 text-sm transition-colors " +
  "border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)] " +
  "placeholder:text-[var(--color-foreground-subtle)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] " +
  "disabled:cursor-not-allowed disabled:opacity-50";

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
