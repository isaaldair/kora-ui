"use client";

import {
  forwardRef,
  useRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type MouseEvent,
} from "react";
import confetti from "canvas-confetti";
import { Button, type ButtonProps } from "../Button/Button";

export type ConfettiOrigin = "around" | "inside" | "page";

type ConfettiExtras = {
  /** Where the confetti fires relative to the button. Default: `"page"`. */
  confettiOrigin?: ConfettiOrigin;
  /** Particles per burst. Default: 120. */
  particleCount?: number;
  /** Horizontal spread in degrees. Default: 70. */
  spread?: number;
  /** Custom color palette. Default: vibrant multi-color. */
  colors?: string[];
};

export type ConfettiButtonProps = ButtonProps & ConfettiExtras;

const DEFAULT_COLORS = [
  "#ff3b30",
  "#ff9500",
  "#ffcc00",
  "#34c759",
  "#00c7be",
  "#007aff",
  "#5856d6",
  "#af52de",
  "#ff2d55",
];

export const ConfettiButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ConfettiButtonProps
>(
  (
    {
      confettiOrigin = "page",
      particleCount = 120,
      spread = 70,
      colors = DEFAULT_COLORS,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

    const fire = (target: HTMLElement) => {
      const base = {
        particleCount,
        spread,
        colors,
        zIndex: 9999,
      };
      if (confettiOrigin === "page") {
        confetti({ ...base, origin: { x: 0.5, y: 0.6 } });
        return;
      }
      const rect = target.getBoundingClientRect();
      const originY = (rect.top + rect.height / 2) / window.innerHeight;
      if (confettiOrigin === "inside") {
        const originX = (rect.left + rect.width / 2) / window.innerWidth;
        confetti({ ...base, origin: { x: originX, y: originY } });
        return;
      }
      // "around" — two bursts from the button's sides
      const leftX = rect.left / window.innerWidth;
      const rightX = rect.right / window.innerWidth;
      confetti({ ...base, origin: { x: leftX, y: originY }, angle: 60 });
      confetti({ ...base, origin: { x: rightX, y: originY }, angle: 120 });
    };

    const handleClick = (
      e: MouseEvent<HTMLButtonElement> & MouseEvent<HTMLAnchorElement>,
    ) => {
      fire(e.currentTarget);
      onClick?.(e as unknown as never);
    };

    return (
      <Button
        ref={(el) => {
          innerRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) (ref as { current: typeof el }).current = el;
        }}
        onClick={handleClick as ButtonHTMLAttributes<HTMLButtonElement>["onClick"] & AnchorHTMLAttributes<HTMLAnchorElement>["onClick"]}
        {...(rest as ButtonProps)}
      />
    );
  },
);

ConfettiButton.displayName = "ConfettiButton";
