import type { Metadata } from "next";
import { JsonViewer } from "kora-ui/client";

export const metadata: Metadata = {
  title: "JSON viewer",
  description: "Collapsible, color-coded tree for any JSON-serializable value.",
};

const sample = {
  repo: "isaaldair/kora-ui",
  version: "0.1.3",
  stars: 0,
  features: ["tailwind", "typescript", "tree-shakable"],
  nested: {
    palette: "electric",
    hues: 17,
    shades: 11,
    total: 187,
  },
  maintainers: [
    { name: "Isaac Avila", role: "author", active: true },
  ],
  flaky: null,
  deprecated: false,
};

export default function JsonViewerPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Special components · Data display
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">JSON viewer</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Expandable tree for inspecting JSON payloads. Color-codes primitives,
          shows item counts when collapsed, and handles arrays + deeply nested
          objects.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Preview
        </h2>
        <JsonViewer data={sample} rootLabel="package stats" />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <code>{`import { JsonViewer } from "kora-ui/client";

<JsonViewer data={payload} />
<JsonViewer data={payload} collapsedByDefault rootLabel="response" />`}</code>
        </pre>
      </section>
    </article>
  );
}
