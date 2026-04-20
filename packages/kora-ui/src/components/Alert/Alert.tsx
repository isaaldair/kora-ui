import { forwardRef, type HTMLAttributes } from "react";

export type AlertVariant = "info" | "success" | "warning" | "destructive";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

const base =
  "relative w-full rounded-lg border p-4 text-sm [&>svg+div]:translate-y-[-3px]";

const variants: Record<AlertVariant, string> = {
  info:
    "border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)]",
  success:
    "border-green-300/60 bg-green-500/10 text-green-700",
  warning:
    "border-amber-300/60 bg-amber-500/10 text-amber-700",
  destructive:
    "border-red-300/60 bg-red-500/10 text-red-700",
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = "info", className = "", role = "alert", ...rest }, ref) => (
    <div
      ref={ref}
      role={role}
      className={[base, variants[variant], className].filter(Boolean).join(" ")}
      {...rest}
    />
  ),
);
Alert.displayName = "Alert";

export const AlertTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className = "", ...rest }, ref) => (
  <h5
    ref={ref}
    className={[
      "mb-1 font-medium leading-none tracking-tight",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  />
));
AlertTitle.displayName = "AlertTitle";

export const AlertDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className = "", ...rest }, ref) => (
  <div
    ref={ref}
    className={["text-sm leading-relaxed opacity-90", className]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  />
));
AlertDescription.displayName = "AlertDescription";
