import type { Metadata } from "next";
import { CodeBlock } from "kora-ui/client";
import { DatePickerDemo } from "./date-picker-demo";

export const metadata: Metadata = {
  title: "Date picker",
  description:
    "Calendar input powered by react-day-picker. Single, multiple, and range selection.",
};

export default function DatePickerPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Special components · Input
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Date picker</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Thin wrapper over{" "}
          <a
            className="font-medium underline underline-offset-4"
            href="https://daypicker.dev"
            target="_blank"
            rel="noreferrer"
          >
            react-day-picker
          </a>{" "}
          v9. Every DayPicker prop is forwarded — pick single dates, multiples,
          or ranges.
        </p>
      </header>

      <DatePickerDemo />

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <CodeBlock
          code={`import { DatePicker } from "kora-ui/client";

const [date, setDate] = useState<Date>();

<DatePicker mode="single" selected={date} onSelect={setDate} />
<DatePicker mode="range" selected={range} onSelect={setRange} />`}
          language="tsx"
        />
      </section>
    </article>
  );
}
