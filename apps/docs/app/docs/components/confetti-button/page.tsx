import type { Metadata } from "next";
import { CodeBlock, ConfettiButton } from "kora-ui/client";

export const metadata: Metadata = {
  title: "Confetti button",
  description: "Button that fires confetti on click. Three origin modes.",
};

export default function ConfettiButtonPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Special components · Buttons
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Confetti button</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Inherits every <code>Button</code> prop and adds a confetti burst on
          click. Pick where it fires: <code>around</code> the button,{" "}
          <code>inside</code> it, or over the whole <code>page</code>.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Try it
        </h2>
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-6">
          <ConfettiButton confettiOrigin="around" variant="primary">
            Around
          </ConfettiButton>
          <ConfettiButton confettiOrigin="inside" variant="secondary">
            Inside
          </ConfettiButton>
          <ConfettiButton confettiOrigin="page">Full page</ConfettiButton>
          <ConfettiButton
            confettiOrigin="page"
            colors={[
              "var(--color-pink-500)",
              "var(--color-fuchsia-500)",
              "var(--color-violet-500)",
            ]}
            particleCount={180}
            variant="ghost"
          >
            Custom palette
          </ConfettiButton>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <CodeBlock
          code={`import { ConfettiButton } from "kora-ui/client";

<ConfettiButton confettiOrigin="around" variant="primary">
  Celebrate
</ConfettiButton>

<ConfettiButton
  confettiOrigin="page"
  colors={["#ff0080", "#7928ca", "#00dfd8"]}
  particleCount={200}
>
  Launch
</ConfettiButton>`}
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
                <td className="px-4 py-3 font-mono text-xs">confettiOrigin</td>
                <td className="px-4 py-3 font-mono text-xs">
                  "around" | "inside" | "page"
                </td>
                <td className="px-4 py-3 font-mono text-xs">"page"</td>
              </tr>
              <tr className="border-t border-[var(--color-border)]">
                <td className="px-4 py-3 font-mono text-xs">particleCount</td>
                <td className="px-4 py-3 font-mono text-xs">number</td>
                <td className="px-4 py-3 font-mono text-xs">120</td>
              </tr>
              <tr className="border-t border-[var(--color-border)]">
                <td className="px-4 py-3 font-mono text-xs">spread</td>
                <td className="px-4 py-3 font-mono text-xs">number</td>
                <td className="px-4 py-3 font-mono text-xs">70</td>
              </tr>
              <tr className="border-t border-[var(--color-border)]">
                <td className="px-4 py-3 font-mono text-xs">colors</td>
                <td className="px-4 py-3 font-mono text-xs">string[]</td>
                <td className="px-4 py-3 font-mono text-xs">vibrant mix</td>
              </tr>
              <tr className="border-t border-[var(--color-border)]">
                <td className="px-4 py-3 font-mono text-xs">...Button</td>
                <td className="px-4 py-3 font-mono text-xs">ButtonProps</td>
                <td className="px-4 py-3 font-mono text-xs">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
