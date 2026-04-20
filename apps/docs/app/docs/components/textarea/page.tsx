import type { Metadata } from "next";
import { Textarea, Label } from "kora-ui";

export const metadata: Metadata = {
  title: "Textarea",
  description: "Multi-line text input.",
};

export default function TextareaPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Components
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Textarea</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Drop-in replacement for <code>&lt;textarea&gt;</code>. Inherits every
          native attribute and forwards its ref.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Preview
        </h2>
        <div className="flex flex-col gap-1.5 rounded-xl border border-neutral-200 bg-white/40 p-6 dark:border-neutral-800 dark:bg-neutral-950/40">
          <Label htmlFor="ta-msg">Message</Label>
          <Textarea
            id="ta-msg"
            rows={4}
            placeholder="Type your message…"
          />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <code>{`import { Textarea, Label } from "kora-ui";

<Label htmlFor="bio">Bio</Label>
<Textarea id="bio" rows={4} placeholder="Tell us about yourself" />`}</code>
        </pre>
      </section>
    </article>
  );
}
