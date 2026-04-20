import type { Metadata } from "next";
import { Separator } from "kora-ui";

export const metadata: Metadata = {
  title: "Separator",
  description: "Thin horizontal or vertical divider.",
};

export default function SeparatorPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Components
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Separator</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          A 1-pixel rule. Horizontal by default; pass{" "}
          <code>orientation="vertical"</code> for a vertical one. Set{" "}
          <code>decorative=&#123;false&#125;</code> to expose it to assistive tech.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Horizontal
        </h2>
        <div className="rounded-xl border border-neutral-200 bg-white/40 p-6 dark:border-neutral-800 dark:bg-neutral-950/40">
          <p className="text-sm font-medium">Section heading</p>
          <Separator className="my-3" />
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Body copy below the divider.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Vertical
        </h2>
        <div className="flex h-14 items-center gap-4 rounded-xl border border-neutral-200 bg-white/40 px-6 dark:border-neutral-800 dark:bg-neutral-950/40">
          <span className="text-sm">Docs</span>
          <Separator orientation="vertical" />
          <span className="text-sm">Components</span>
          <Separator orientation="vertical" />
          <span className="text-sm">Palette</span>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <code>{`import { Separator } from "kora-ui";

<Separator />
<Separator orientation="vertical" />`}</code>
        </pre>
      </section>
    </article>
  );
}
