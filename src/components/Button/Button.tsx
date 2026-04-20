import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
}

const base =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:ring-neutral-900",
  secondary:
    "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus-visible:ring-neutral-400",
  ghost:
    "bg-transparent text-neutral-900 hover:bg-neutral-100 focus-visible:ring-neutral-400",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", ...rest }, ref) => {
    const classes = [base, variants[variant], sizes[size], className]
      .filter(Boolean)
      .join(" ");
    return <button ref={ref} className={classes} {...rest} />;
  }
);

Button.displayName = "Button";
