import type { Metadata } from "next";
import { Label, Input } from "kora-ui";

export const metadata: Metadata = {
  title: "Label",
  description: "Form field label with peer-disabled awareness.",
};

export default function LabelPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Components
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Label</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Styled <code>&lt;label&gt;</code> that dims itself automatically when
          paired with a disabled <code>peer</code> input.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Preview
        </h2>
        <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white/40 p-6 dark:border-neutral-800 dark:bg-neutral-950/40">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lbl-name">Name</Label>
            <Input id="lbl-name" placeholder="Isaac" />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <code>{`import { Label, Input } from "kora-ui";

<Label htmlFor="name">Name</Label>
<Input id="name" />`}</code>
        </pre>
      </section>
    </article>
  );
}
