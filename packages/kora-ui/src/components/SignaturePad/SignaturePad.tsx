"use client";

import { useEffect, useRef, useState } from "react";
import SignaturePadLib from "signature_pad";

export interface SignaturePadProps {
  /** Width of the canvas. Default: 480. */
  width?: number;
  /** Height of the canvas. Default: 180. */
  height?: number;
  /** Ink color. Default: `#0a0a0a`. */
  penColor?: string;
  /** Background color of the pad. Default: transparent. */
  backgroundColor?: string;
  /** Fires whenever a stroke ends with the current signature data URL. */
  onChange?: (dataUrl: string) => void;
  /** Fires when the pad is cleared. */
  onClear?: () => void;
  /** Show Clear + Download buttons. Default: true. */
  showControls?: boolean;
  className?: string;
}

export function SignaturePad({
  width = 480,
  height = 180,
  penColor = "#0a0a0a",
  backgroundColor = "rgba(0,0,0,0)",
  onChange,
  onClear,
  showControls = true,
  className = "",
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const padRef = useRef<SignaturePadLib | null>(null);
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;
    const pad = new SignaturePadLib(canvasRef.current, {
      penColor,
      backgroundColor,
    });
    padRef.current = pad;
    const onEnd = () => {
      setEmpty(pad.isEmpty());
      if (!pad.isEmpty()) onChange?.(pad.toDataURL("image/png"));
    };
    pad.addEventListener("endStroke", onEnd);
    return () => {
      pad.removeEventListener("endStroke", onEnd);
      pad.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (padRef.current) {
      padRef.current.penColor = penColor;
    }
  }, [penColor]);

  const clear = () => {
    padRef.current?.clear();
    setEmpty(true);
    onClear?.();
  };

  const download = () => {
    if (!padRef.current || padRef.current.isEmpty()) return;
    const url = padRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `signature-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="rounded-xl border border-dashed border-neutral-300 bg-white p-1 dark:border-neutral-700 dark:bg-neutral-950">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="block touch-none rounded-lg"
        />
      </div>
      {showControls && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={clear}
            disabled={empty}
            className="inline-flex h-8 items-center rounded-md border border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-900"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={download}
            disabled={empty}
            className="inline-flex h-8 items-center rounded-md bg-neutral-900 px-3 text-xs font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Download PNG
          </button>
        </div>
      )}
    </div>
  );
}
