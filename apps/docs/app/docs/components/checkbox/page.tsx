import type { Metadata } from "next";
import { Checkbox, Label } from "kora-ui";
import { CodeBlock } from "kora-ui/client";

export const metadata: Metadata = {
  title: "Checkbox",
  description: "Styled native checkbox input.",
};

export default function CheckboxPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Components
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Checkbox</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Native <code>&lt;input type="checkbox"&gt;</code> styled with Tailwind.
          All form behavior and events are untouched.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Preview
        </h2>
        <div className="flex flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-6">
          <div className="flex items-center gap-2">
            <Checkbox id="cb-terms" />
            <Label htmlFor="cb-terms">Accept the terms</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="cb-checked" defaultChecked />
            <Label htmlFor="cb-checked">Send me updates</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="cb-disabled" disabled />
            <Label htmlFor="cb-disabled">Disabled option</Label>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <CodeBlock
          code={`import { Checkbox, Label } from "kora-ui";

<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept the terms</Label>
</div>`}
          language="tsx"
        />
      </section>
    </article>
  );
}
