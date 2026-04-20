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
    "bg-[var(--color-accent)] text-[var(--color-accent-foreground)]",
  secondary:
    "bg-[var(--color-background-secondary)] text-[var(--color-foreground)]",
  outline:
    "border border-[var(--color-border)] text-[var(--color-foreground)]",
  success: "bg-green-500/15 text-green-700",
  warning: "bg-amber-500/15 text-amber-700",
  destructive: "bg-red-500/15 text-red-700",
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
