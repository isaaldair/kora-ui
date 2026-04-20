"use client";

import { useState } from "react";
import { CodeBlock, ImageCropper } from "kora-ui/client";
import type { Area } from "react-easy-crop";

const SAMPLE =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80";

export function ImageCropperDemo() {
  const [area, setArea] = useState<Area | null>(null);
  const [aspect, setAspect] = useState(1);
  const [shape, setShape] = useState<"rect" | "round">("rect");

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-6">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
          Aspect
        </span>
        {[
          { label: "1:1", value: 1 },
          { label: "16:9", value: 16 / 9 },
          { label: "4:3", value: 4 / 3 },
        ].map((a) => (
          <button
            key={a.label}
            type="button"
            onClick={() => setAspect(a.value)}
            className={
              aspect === a.value
                ? "rounded-md bg-neutral-900 px-3 py-1 text-xs font-medium text-white dark:bg-white dark:text-neutral-900"
                : "rounded-md border border-[var(--color-border)] px-3 py-1 text-xs font-medium text-neutral-700 hover:bg-[var(--color-background-secondary)] dark:text-neutral-300 dark:hover:bg-neutral-900"
            }
          >
            {a.label}
          </button>
        ))}
        <span className="ml-4 text-xs font-medium uppercase tracking-wider text-neutral-500">
          Shape
        </span>
        {(["rect", "round"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setShape(s)}
            className={
              shape === s
                ? "rounded-md bg-neutral-900 px-3 py-1 text-xs font-medium capitalize text-white dark:bg-white dark:text-neutral-900"
                : "rounded-md border border-[var(--color-border)] px-3 py-1 text-xs font-medium capitalize text-neutral-700 hover:bg-[var(--color-background-secondary)] dark:text-neutral-300 dark:hover:bg-neutral-900"
            }
          >
            {s}
          </button>
        ))}
      </div>

      <ImageCropper
        image={SAMPLE}
        aspect={aspect}
        cropShape={shape}
        onCropComplete={setArea}
        height={360}
      />

      {area && (
        <CodeBlock code={JSON.stringify(area, null, 2)} language="json" />
      )}
    </section>
  );
}
