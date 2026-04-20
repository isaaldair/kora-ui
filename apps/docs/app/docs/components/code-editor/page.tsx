import type { Metadata } from "next";
import { CodeBlock } from "kora-ui/client";
import { CodeEditorDemo } from "./code-editor-demo";

export const metadata: Metadata = {
  title: "Code editor",
  description:
    "Monaco editor wrapper — the editor behind VS Code. Loads lazily from CDN.",
};

export default function CodeEditorPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Special components · Media
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Code editor</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Wrapper around <code>@monaco-editor/react</code>. Monaco is loaded
          lazily from a CDN on first use — nothing is shipped in the kora-ui
          bundle. Theme auto-adapts to light/dark.
        </p>
      </header>

      <CodeEditorDemo />

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <CodeBlock
          code={`import { CodeEditor } from "kora-ui/client";

const [code, setCode] = useState(\`export const x = 1;\`);

<CodeEditor
  value={code}
  onChange={setCode}
  language="typescript"
  height={360}
/>`}
          language="tsx"
        />
      </section>
    </article>
  );
}
