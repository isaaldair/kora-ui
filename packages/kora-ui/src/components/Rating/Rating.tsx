"use client";

import { useState, type KeyboardEvent } from "react";

export interface RatingProps {
  /** Current rating (controlled). Floating values are rounded to `step`. */
  value?: number;
  /** Fired when user selects a new rating. */
  onChange?: (value: number) => void;
  /** Maximum number of stars. Default: 5. */
  max?: number;
  /** Step size. 0.5 enables half-star selection. Default: 1. */
  step?: 0.5 | 1;
  /** Pixel size of each star. Default: 22. */
  size?: number;
  /** Fill color when a star is set. Default: `#facc15` (amber-400). */
  color?: string;
  /** Disable interaction. */
  readOnly?: boolean;
  /** Accessible label. */
  "aria-label"?: string;
  className?: string;
}

export function Rating({
  value = 0,
  onChange,
  max = 5,
  step = 1,
  size = 22,
  color = "#facc15",
  readOnly = false,
  "aria-label": ariaLabel = "Rating",
  className = "",
}: RatingProps) {
  const [hover, setHover] = useState<number | null>(null);
  const displayed = hover ?? value;

  const commit = (next: number) => {
    if (readOnly) return;
    const clamped = Math.max(0, Math.min(max, next));
    onChange?.(clamped);
  };

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (readOnly) return;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      commit(value + step);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      commit(value - step);
    } else if (e.key === "Home") {
      e.preventDefault();
      commit(0);
    } else if (e.key === "End") {
      e.preventDefault();
      commit(max);
    }
  };

  return (
    <div
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-readonly={readOnly || undefined}
      tabIndex={readOnly ? -1 : 0}
      onKeyDown={handleKey}
      onMouseLeave={() => setHover(null)}
      className={`inline-flex items-center gap-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] ${className}`}
    >
      {Array.from({ length: max }, (_, i) => {
        const starIndex = i + 1;
        const fillPct =
          displayed >= starIndex
            ? 1
            : displayed > starIndex - 1
            ? displayed - (starIndex - 1)
            : 0;
        return (
          <StarButton
            key={starIndex}
            index={starIndex}
            fillPct={fillPct}
            size={size}
            color={color}
            step={step}
            readOnly={readOnly}
            onHover={setHover}
            onSelect={commit}
          />
        );
      })}
    </div>
  );
}

function StarButton({
  index,
  fillPct,
  size,
  color,
  step,
  readOnly,
  onHover,
  onSelect,
}: {
  index: number;
  fillPct: number;
  size: number;
  color: string;
  step: 0.5 | 1;
  readOnly: boolean;
  onHover: (v: number | null) => void;
  onSelect: (v: number) => void;
}) {
  const id = `kora-star-clip-${index}`;
  return (
    <button
      type="button"
      disabled={readOnly}
      tabIndex={-1}
      onMouseMove={(e) => {
        if (readOnly) return;
        if (step === 0.5) {
          const rect = e.currentTarget.getBoundingClientRect();
          const half = (e.clientX - rect.left) / rect.width < 0.5 ? 0.5 : 1;
          onHover(index - 1 + half);
        } else {
          onHover(index);
        }
      }}
      onClick={(e) => {
        if (readOnly) return;
        if (step === 0.5) {
          const rect = e.currentTarget.getBoundingClientRect();
          const half = (e.clientX - rect.left) / rect.width < 0.5 ? 0.5 : 1;
          onSelect(index - 1 + half);
        } else {
          onSelect(index);
        }
      }}
      className="relative inline-flex shrink-0 appearance-none items-center justify-center bg-transparent p-0 leading-none outline-none disabled:cursor-default"
      style={{ width: size, height: size }}
      aria-label={`${index} star${index === 1 ? "" : "s"}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className="absolute inset-0 text-[var(--color-border-strong)]"
      >
        <path
          fill="currentColor"
          d="M12 2.5l2.92 6.18 6.58.94-4.78 4.57 1.17 6.58L12 17.77l-6.05 3 1.17-6.58L2.5 9.62l6.58-.94z"
        />
      </svg>
      {fillPct > 0 && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          className="absolute inset-0"
          aria-hidden="true"
        >
          <defs>
            <clipPath id={id}>
              <rect x="0" y="0" width={24 * fillPct} height="24" />
            </clipPath>
          </defs>
          <path
            d="M12 2.5l2.92 6.18 6.58.94-4.78 4.57 1.17 6.58L12 17.77l-6.05 3 1.17-6.58L2.5 9.62l6.58-.94z"
            fill={color}
            clipPath={`url(#${id})`}
          />
        </svg>
      )}
    </button>
  );
}
