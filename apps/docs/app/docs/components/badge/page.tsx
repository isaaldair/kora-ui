import type { Metadata } from "next";
import { Badge } from "kora-ui";
import { CodeBlock } from "kora-ui/client";

export const metadata: Metadata = {
  title: "Badge",
  description: "Compact status label with six variants.",
};

export default function BadgePage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Components
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Badge</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Small pill for status, counts, or category tags. Renders as a{" "}
          <code>&lt;span&gt;</code> and forwards every native attribute.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Variants
        </h2>
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-6">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <CodeBlock
          code={`import { Badge } from "kora-ui";

<Badge variant="success">Active</Badge>
<Badge variant="outline">Draft</Badge>`}
          language="tsx"
        />
      </section>
    </article>
  );
}
