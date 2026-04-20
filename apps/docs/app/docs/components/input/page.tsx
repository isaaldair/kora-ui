import type { Metadata } from "next";
import { Input, Label } from "kora-ui";

export const metadata: Metadata = {
  title: "Input",
  description: "Single-line text input.",
};

export default function InputPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Components
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Input</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Drop-in replacement for <code>&lt;input&gt;</code>. Inherits every
          native attribute (<code>type</code>, <code>placeholder</code>,{" "}
          <code>required</code>, etc.) and forwards its ref.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Preview
        </h2>
        <div className="grid gap-4 rounded-xl border border-neutral-200 bg-white/40 p-6 dark:border-neutral-800 dark:bg-neutral-950/40 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="in-email">Email</Label>
            <Input
              id="in-email"
              type="email"
              placeholder="you@example.com"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="in-password">Password</Label>
            <Input
              id="in-password"
              type="password"
              placeholder="••••••••"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="in-disabled">Disabled</Label>
            <Input
              id="in-disabled"
              disabled
              defaultValue="locked"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <code>{`import { Input, Label } from "kora-ui";

<div className="flex flex-col gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`}</code>
        </pre>
      </section>
    </article>
  );
}
