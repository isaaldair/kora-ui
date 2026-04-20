import { forwardRef, type HTMLAttributes } from "react";

export type SeparatorOrientation = "horizontal" | "vertical";

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: SeparatorOrientation;
  decorative?: boolean;
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      orientation = "horizontal",
      decorative = true,
      className = "",
      ...rest
    },
    ref,
  ) => (
    <div
      ref={ref}
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={[
        "shrink-0 bg-[var(--color-border)]",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  ),
);

Separator.displayName = "Separator";
