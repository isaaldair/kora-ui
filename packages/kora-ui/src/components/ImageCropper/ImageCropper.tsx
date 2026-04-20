"use client";

import { useCallback, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";

export interface ImageCropperProps {
  /** Source image URL (or data URL). */
  image: string;
  /** Target aspect ratio (width / height). Default: 1 (square). */
  aspect?: number;
  /** Shape of the crop area. Default: `"rect"`. */
  cropShape?: "rect" | "round";
  /** Initial zoom. Default: 1. */
  initialZoom?: number;
  /** Fires when the user finishes dragging/zooming, in pixel coords. */
  onCropComplete?: (area: Area) => void;
  /** Pixel height of the cropper area. Default: 320. */
  height?: number;
  className?: string;
}

export function ImageCropper({
  image,
  aspect = 1,
  cropShape = "rect",
  initialZoom = 1,
  onCropComplete,
  height = 320,
  className = "",
}: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(initialZoom);

  const onComplete = useCallback(
    (_: Area, pixels: Area) => {
      onCropComplete?.(pixels);
    },
    [onCropComplete],
  );

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div
        className="relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-accent)]"
        style={{ height }}
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          cropShape={cropShape}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onComplete}
        />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-foreground-subtle)]">
          Zoom
        </span>
        <input
          type="range"
          min={1}
          max={3}
          step={0.05}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="flex-1"
          style={{ accentColor: "var(--accent, #2563eb)" }}
        />
        <span className="w-10 text-right font-mono text-xs text-[var(--color-foreground-subtle)]">
          {zoom.toFixed(2)}x
        </span>
      </div>
    </div>
  );
}
