"use client";

import { useEffect, useRef, useState } from "react";
import SignaturePadLib from "signature_pad";

export interface SignaturePadProps {
  /** Aspect ratio of the pad as `width / height`. Default: 480 / 180 (≈ 2.67). */
  width?: number;
  /** See `width` — together they control the aspect ratio. Default: 180. */
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

  /* Resize the canvas backing store to match its CSS size × devicePixelRatio
   * so the drawable surface covers the full visible area at crisp resolution.
   * signature_pad reads canvas dimensions on construction, so we size first,
   * then instantiate the pad. */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const sync = () => {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      canvas.width = w * ratio;
      canvas.height = h * ratio;
      const ctx = canvas.getContext("2d");
      ctx?.scale(ratio, ratio);
    };

    sync();

    const pad = new SignaturePadLib(canvas, { penColor, backgroundColor });
    padRef.current = pad;

    const onEnd = () => {
      setEmpty(pad.isEmpty());
      if (!pad.isEmpty()) onChange?.(pad.toDataURL("image/png"));
    };
    pad.addEventListener("endStroke", onEnd);

    // Preserve existing strokes on resize by snapshotting + restoring.
    let lastData = pad.toData();
    const onResize = () => {
      lastData = pad.toData();
      sync();
      pad.clear();
      if (lastData.length) pad.fromData(lastData);
      setEmpty(pad.isEmpty());
    };
    const observer = new ResizeObserver(onResize);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
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
      <div
        className="rounded-xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-background)] p-1"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <canvas
          ref={canvasRef}
          className="block h-full w-full touch-none rounded-lg"
        />
      </div>
      {showControls && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={clear}
            disabled={empty}
            className="inline-flex h-8 items-center rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 text-xs font-medium text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-background-secondary)] disabled:opacity-50"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={download}
            disabled={empty}
            className="inline-flex h-8 items-center rounded-md bg-[var(--color-accent)] px-3 text-xs font-medium text-[var(--color-accent-foreground)] transition-colors hover:bg-[var(--color-accent-hover)] disabled:opacity-50"
          >
            Download PNG
          </button>
        </div>
      )}
    </div>
  );
}
