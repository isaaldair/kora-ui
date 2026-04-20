import { forwardRef, type LabelHTMLAttributes } from "react";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const base =
  "text-sm font-medium leading-none text-[var(--color-foreground)] " +
  "peer-disabled:cursor-not-allowed peer-disabled:opacity-50";

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", ...rest }, ref) => (
    <label
      ref={ref}
      className={[base, className].filter(Boolean).join(" ")}
      {...rest}
    />
  ),
);

Label.displayName = "Label";
