import type { Metadata } from "next";
import { Alert, AlertTitle, AlertDescription } from "kora-ui";
import { CodeBlock } from "kora-ui/client";

export const metadata: Metadata = {
  title: "Alert",
  description: "Inline status banner with four variants.",
};

export default function AlertPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Components
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Alert</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Inline status banner for success, warning, destructive, or
          informational messages. Ships with <code>Alert</code>,{" "}
          <code>AlertTitle</code>, and <code>AlertDescription</code>.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Variants
        </h2>
        <div className="grid gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-6">
          <Alert>
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>Default informational banner.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>Deploy succeeded</AlertTitle>
            <AlertDescription>Your site is live.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>Outdated dependency</AlertTitle>
            <AlertDescription>React 18 will be deprecated soon.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Build failed</AlertTitle>
            <AlertDescription>Check the latest deploy logs.</AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <CodeBlock
          code={`import { Alert, AlertTitle, AlertDescription } from "kora-ui";

<Alert variant="success">
  <AlertTitle>Saved</AlertTitle>
  <AlertDescription>Your changes were saved.</AlertDescription>
</Alert>`}
          language="tsx"
        />
      </section>
    </article>
  );
}
