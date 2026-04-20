import type { Metadata } from "next";
import { Button } from "kora-ui";

export const metadata: Metadata = {
  title: "Components",
  description: "Every component currently available in kora-ui.",
};

export default function ComponentsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
      <header className="flex flex-col gap-4">
        <span className="text-sm font-medium uppercase tracking-wider text-neutral-500">
          Components
        </span>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Every piece of kora-ui.
        </h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          A running list of what is currently available. More components land
          on every release.
        </p>
      </header>

      {/* Button */}
      <section id="button" className="mt-16 scroll-mt-24">
        <ComponentHeader
          name="Button"
          status="available"
          description="Three variants, three sizes. Fully typed, forwards a ref, and inherits every native button attribute."
        />

        <div className="mt-6 grid gap-6 rounded-xl border border-neutral-200 bg-white/40 p-6 dark:border-neutral-800 dark:bg-neutral-950/40">
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

        <pre className="mt-4 overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <code>{`import { Button } from "kora-ui";

<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost" size="sm">Learn more</Button>`}</code>
        </pre>

        <div className="mt-6 rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
          <h4 className="text-sm font-semibold">Props</h4>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-neutral-500">
                <tr>
                  <th className="py-2 pr-4 font-medium">Prop</th>
                  <th className="py-2 pr-4 font-medium">Type</th>
                  <th className="py-2 font-medium">Default</th>
                </tr>
              </thead>
              <tbody className="text-neutral-700 dark:text-neutral-300">
                <tr className="border-t border-neutral-200 dark:border-neutral-800">
                  <td className="py-2 pr-4 font-mono text-xs">variant</td>
                  <td className="py-2 pr-4 font-mono text-xs">"primary" | "secondary" | "ghost"</td>
                  <td className="py-2 font-mono text-xs">"primary"</td>
                </tr>
                <tr className="border-t border-neutral-200 dark:border-neutral-800">
                  <td className="py-2 pr-4 font-mono text-xs">size</td>
                  <td className="py-2 pr-4 font-mono text-xs">"sm" | "md" | "lg"</td>
                  <td className="py-2 font-mono text-xs">"md"</td>
                </tr>
                <tr className="border-t border-neutral-200 dark:border-neutral-800">
                  <td className="py-2 pr-4 font-mono text-xs">...rest</td>
                  <td className="py-2 pr-4 font-mono text-xs">ButtonHTMLAttributes&lt;HTMLButtonElement&gt;</td>
                  <td className="py-2 font-mono text-xs">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="mt-24">
        <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-500">
          Coming next
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {comingSoon.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-dashed border-neutral-300 p-4 text-sm font-medium text-neutral-500 dark:border-neutral-700"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function ComponentHeader({
  name,
  status,
  description,
}: {
  name: string;
  status: "available" | "in-progress";
  description: string;
}) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">{name}</h2>
        <span
          className={
            status === "available"
              ? "text-xs font-medium text-emerald-600 dark:text-emerald-400"
              : "text-xs font-medium text-amber-600 dark:text-amber-400"
          }
        >
          {status}
        </span>
      </div>
      <p className="mt-2 max-w-2xl text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
    </>
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

const comingSoon = ["Card", "Input", "Badge", "Dialog"];
