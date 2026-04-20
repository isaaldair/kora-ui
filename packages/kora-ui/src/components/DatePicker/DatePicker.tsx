"use client";

import { DayPicker, type DayPickerProps } from "react-day-picker";
import "react-day-picker/style.css";

export type DatePickerProps = DayPickerProps;

/**
 * Thin wrapper over `react-day-picker` v9. Accepts every DayPicker prop so
 * you can pick single, multiple, or range selection modes:
 *
 * ```tsx
 * <DatePicker mode="single" selected={date} onSelect={setDate} />
 * <DatePicker mode="range" selected={range} onSelect={setRange} />
 * ```
 */
export function DatePicker(props: DatePickerProps) {
  return (
    <div className="kora-datepicker inline-block rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-3">
      <DayPicker {...props} />
    </div>
  );
}
