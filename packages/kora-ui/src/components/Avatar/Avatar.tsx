import { forwardRef, type HTMLAttributes, type ImgHTMLAttributes } from "react";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: AvatarSize;
}

const sizes: Record<AvatarSize, string> = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-14 text-base",
};

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ size = "md", className = "", ...rest }, ref) => (
    <span
      ref={ref}
      className={[
        "relative inline-flex shrink-0 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-900",
        sizes[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  ),
);
Avatar.displayName = "Avatar";

export interface AvatarImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className = "", alt = "", ...rest }, ref) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      alt={alt}
      className={["h-full w-full object-cover", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  ),
);
AvatarImage.displayName = "AvatarImage";

export const AvatarFallback = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(({ className = "", ...rest }, ref) => (
  <span
    ref={ref}
    className={[
      "flex h-full w-full items-center justify-center font-medium text-neutral-700 dark:text-neutral-300",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  />
));
AvatarFallback.displayName = "AvatarFallback";
