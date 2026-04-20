import type { Metadata } from "next";
import { Button } from "kora-ui";
import { CodeBlock } from "kora-ui/client";

export const metadata: Metadata = {
  title: "Button",
  description: "Three variants, three sizes. Fully typed and ref-forwarded.",
};

export default function ButtonPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Components
          </span>
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-green-900">
            stable
          </span>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight">Button</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Three variants, three sizes. Fully typed, forwards a ref, and inherits
          every native <code>button</code> attribute via rest props.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Preview
        </h2>
        <div className="grid gap-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-6">
          <Row label="Variants">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </Row>
          <Row label="Sizes">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Row>
          <Row label="State">
            <Button disabled>Disabled</Button>
          </Row>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <CodeBlock
          code={`import { Button } from "kora-ui";

<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost" size="sm">Learn more</Button>`}
          language="tsx"
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Props
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--color-background-secondary)] text-neutral-500">
              <tr>
                <th className="px-4 py-3 font-medium">Prop</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Default</th>
              </tr>
            </thead>
            <tbody className="text-neutral-700 dark:text-neutral-300">
              <tr className="border-t border-[var(--color-border)]">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 font-mono text-xs">
                  "primary" | "secondary" | "ghost"
                </td>
                <td className="px-4 py-3 font-mono text-xs">"primary"</td>
              </tr>
              <tr className="border-t border-[var(--color-border)]">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 font-mono text-xs">"sm" | "md" | "lg"</td>
                <td className="px-4 py-3 font-mono text-xs">"md"</td>
              </tr>
              <tr className="border-t border-[var(--color-border)]">
                <td className="px-4 py-3 font-mono text-xs">...rest</td>
                <td className="px-4 py-3 font-mono text-xs">
                  ButtonHTMLAttributes&lt;HTMLButtonElement&gt;
                </td>
                <td className="px-4 py-3 font-mono text-xs">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Theme accent overrides
        </h2>
        <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
          Because every style is Tailwind utility classes, you can override the
          look with any token from the active{" "}
          <a
            className="font-medium text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
            href="/docs/themes"
          >
            theme palette
          </a>{" "}
          directly through <code>className</code>:
        </p>
        <div className="flex flex-wrap gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-6">
          <Button className="bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-500">
            Theme blue
          </Button>
          <Button className="bg-fuchsia-500 text-white hover:bg-fuchsia-600 focus-visible:ring-fuchsia-500">
            Theme fuchsia
          </Button>
          <Button className="bg-lime-400 text-neutral-900 hover:bg-lime-500 focus-visible:ring-lime-400">
            Theme lime
          </Button>
        </div>
      </section>
    </article>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="w-20 shrink-0 text-xs font-medium uppercase tracking-wider text-neutral-500">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}
