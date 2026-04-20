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
    QRCodeLib.toCanvas(
      canvasRef.current,
      value,
      {
        width: size,
        margin,
        errorCorrectionLevel: errorCorrection,
        color: {
          dark: color,
          light: backgroundColor === "transparent" ? "#0000" : backgroundColor,
        },
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
