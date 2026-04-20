"use client";

import { useEffect, useRef, useState } from "react";
import QRCodeLib from "qrcode";

export type QRCodeErrorCorrection = "L" | "M" | "Q" | "H";

export interface QRCodeProps {
  /** Text/URL to encode. */
  value: string;
  /** Pixel size of the generated image. Default: 192. */
  size?: number;
  /** Foreground color. Default: `#0a0a0a`. */
  color?: string;
  /** Background color. Default: `#ffffff`. Pass `"transparent"` for none. */
  backgroundColor?: string;
  /** Error correction level. Higher = more resilient to damage. Default: `"M"`. */
  errorCorrection?: QRCodeErrorCorrection;
  /** Extra white margin (in modules). Default: 2. */
  margin?: number;
  /** Accessible alt text. */
  "aria-label"?: string;
  className?: string;
}

export function QRCode({
  value,
  size = 192,
  color = "#0a0a0a",
  backgroundColor = "#ffffff",
  errorCorrection = "M",
  margin = 2,
  "aria-label": ariaLabel,
  className = "",
}: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const dark = resolveColorToHex(color);
    const light =
      backgroundColor === "transparent"
        ? "#0000"
        : resolveColorToHex(backgroundColor);
    QRCodeLib.toCanvas(
      canvasRef.current,
      value,
      {
        width: size,
        margin,
        errorCorrectionLevel: errorCorrection,
        color: { dark, light },
      },
      (err) => {
        setError(err ? err.message : null);
      },
    );
  }, [value, size, color, backgroundColor, errorCorrection, margin]);

  if (error) {
    return (
      <div
        role="img"
        aria-label="QR code render error"
        className={`flex items-center justify-center rounded-md border border-red-200 bg-red-50 p-4 text-xs text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-100 ${className}`}
        style={{ width: size, height: size }}
      >
        {error}
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      aria-label={ariaLabel ?? `QR code encoding "${value}"`}
      className={className}
    />
  );
}

/** Normalize any CSS color (including `var(--x)` and `hsl(...)`) to a hex
 *  string the `qrcode` library understands. Runs client-side only. */
function resolveColorToHex(color: string): string {
  if (typeof document === "undefined") return color;
  let value = color.trim();

  if (value.startsWith("var(")) {
    const m = value.match(/var\((--[^,\s)]+)/);
    if (m?.[1]) {
      const resolved = getComputedStyle(document.documentElement)
        .getPropertyValue(m[1])
        .trim();
      if (resolved) value = resolved;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) return value;
  try {
    ctx.fillStyle = value;
  } catch {
    return "#000000";
  }
  const normalized = ctx.fillStyle;
  if (typeof normalized === "string" && normalized.startsWith("rgba")) {
    const m = normalized.match(
      /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/,
    );
    if (m) {
      const toHex = (n: string) =>
        Number(n).toString(16).padStart(2, "0");
      return `#${toHex(m[1]!)}${toHex(m[2]!)}${toHex(m[3]!)}${toHex(
        String(Math.round(Number(m[4]!) * 255)),
      )}`;
    }
  }
  return (normalized as string) || "#000000";
}
