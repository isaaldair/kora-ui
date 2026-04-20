import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

type SharedButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
};

/**
 * `<Button>` renders a native `<button>` by default. Pass `href` to render
 * as a styled anchor (`<a>`) without changing the visuals.
 */
export type ButtonProps =
  | (SharedButtonProps &
      ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (SharedButtonProps &
      AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-accent)] text-[var(--color-accent-foreground)] hover:bg-[var(--color-accent-hover)] " +
    "focus-visible:ring-[var(--color-accent)]",
  secondary:
    "bg-[var(--color-background-secondary)] text-[var(--color-foreground)] hover:bg-[var(--color-background-tertiary)] " +
    "border border-[var(--color-border)] focus-visible:ring-[var(--color-border-strong)]",
  ghost:
    "bg-transparent text-[var(--color-foreground)] hover:bg-[var(--color-background-secondary)] " +
    "focus-visible:ring-[var(--color-border-strong)]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ variant = "primary", size = "md", className = "", ...rest }, ref) => {
  const classes = [base, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");

  if ("href" in rest && typeof rest.href === "string") {
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
});

Button.displayName = "Button";
