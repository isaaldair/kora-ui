"use client";

import { useState } from "react";
import { DatePicker } from "kora-ui/client";
import type { DateRange } from "react-day-picker";

export function DatePickerDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <section className="grid gap-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-6 md:grid-cols-2">
      <div className="flex flex-col gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
          Single
        </span>
        <DatePicker mode="single" selected={date} onSelect={setDate} />
        <span className="font-mono text-xs text-neutral-500">
          {date ? date.toISOString().slice(0, 10) : "—"}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
          Range
        </span>
        <DatePicker mode="range" selected={range} onSelect={setRange} />
        <span className="font-mono text-xs text-neutral-500">
          {range?.from ? range.from.toISOString().slice(0, 10) : "—"} →{" "}
          {range?.to ? range.to.toISOString().slice(0, 10) : "—"}
        </span>
      </div>
    </section>
  );
}
