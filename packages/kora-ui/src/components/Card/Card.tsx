import { forwardRef, type HTMLAttributes } from "react";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...rest }, ref) => (
    <div
      ref={ref}
      className={[
        "rounded-xl border shadow-sm",
        "border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  ),
);
Card.displayName = "Card";

export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className = "", ...rest }, ref) => (
  <div
    ref={ref}
    className={["flex flex-col gap-1.5 p-6", className]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className = "", ...rest }, ref) => (
  <h3
    ref={ref}
    className={[
      "text-lg font-semibold leading-none tracking-tight",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className = "", ...rest }, ref) => (
  <p
    ref={ref}
    className={[
      "text-sm text-[var(--color-foreground-muted)]",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className = "", ...rest }, ref) => (
  <div
    ref={ref}
    className={["p-6 pt-0", className].filter(Boolean).join(" ")}
    {...rest}
  />
));
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className = "", ...rest }, ref) => (
  <div
    ref={ref}
    className={["flex items-center gap-3 p-6 pt-0", className]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  />
));
CardFooter.displayName = "CardFooter";
