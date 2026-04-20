import { forwardRef, type HTMLAttributes } from "react";

export type BadgeVariant =
  | "default"
  | "secondary"
  | "outline"
  | "success"
  | "warning"
  | "destructive";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const base =
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium " +
  "transition-colors";

const variants: Record<BadgeVariant, string> = {
  default:
    "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
  secondary:
    "bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100",
  outline:
    "border border-neutral-200 text-neutral-900 dark:border-neutral-800 dark:text-neutral-100",
  success:
    "bg-green-100 text-green-900 dark:bg-green-950 dark:text-green-200",
  warning:
    "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
  destructive:
    "bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", className = "", ...rest }, ref) => (
    <span
      ref={ref}
      className={[base, variants[variant], className].filter(Boolean).join(" ")}
      {...rest}
    />
  ),
);

Badge.displayName = "Badge";
