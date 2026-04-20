import { forwardRef, type HTMLAttributes } from "react";

export type AlertVariant = "info" | "success" | "warning" | "destructive";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

const base =
  "relative w-full rounded-lg border p-4 text-sm [&>svg+div]:translate-y-[-3px]";

const variants: Record<AlertVariant, string> = {
  info:
    "border-neutral-200 bg-white text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100",
  success:
    "border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950/60 dark:text-green-100",
  warning:
    "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-100",
  destructive:
    "border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950/60 dark:text-red-100",
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
