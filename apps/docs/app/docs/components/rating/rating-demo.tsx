"use client";

import { useState } from "react";
import { Rating } from "kora-ui/client";

export function RatingDemo() {
  const [value, setValue] = useState(4);
  const [half, setHalf] = useState(3.5);

  return (
    <section className="flex flex-col gap-6 rounded-xl border border-neutral-200 bg-white/40 p-6 dark:border-neutral-800 dark:bg-neutral-950/40">
      <Row label="Default">
        <Rating value={value} onChange={setValue} />
        <span className="text-sm text-neutral-500">value: {value}</span>
      </Row>
      <Row label="Half steps">
        <Rating value={half} onChange={setHalf} step={0.5} />
        <span className="text-sm text-neutral-500">value: {half}</span>
      </Row>
      <Row label="Custom color">
        <Rating
          value={5}
          onChange={() => {}}
          color="var(--color-electric-fuchsia-500)"
        />
      </Row>
      <Row label="Max 10">
        <Rating value={7} onChange={() => {}} max={10} size={18} />
      </Row>
      <Row label="Read only">
        <Rating value={3.5} readOnly step={0.5} />
      </Row>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="w-28 shrink-0 text-xs font-medium uppercase tracking-wider text-neutral-500">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}
