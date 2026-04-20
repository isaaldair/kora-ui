import type { Metadata } from "next";
import { CodeBlock } from "kora-ui/client";

export const metadata: Metadata = {
  title: "Code block",
  description:
    "Syntax-highlighted code via prism-react-renderer. Copyable, themeable, filename-aware.",
};

const example = `import { Button } from "kora-ui";

export function SaveForm({ onSave }: { onSave: () => void }) {
  return (
    <Button variant="primary" onClick={onSave}>
      Save changes
    </Button>
  );
}`;

const json = `{
  "name": "kora-ui",
  "version": "0.1.3",
  "type": "module",
  "exports": {
    ".": "./dist/index.js",
    "./client": "./dist/client.js"
  }
}`;

export default function CodeBlockPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Special components · Data display
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Code block</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Drop-in syntax highlighting via{" "}
          <a
            className="font-medium underline underline-offset-4"
            href="https://github.com/FormidableLabs/prism-react-renderer"
            target="_blank"
            rel="noreferrer"
          >
            prism-react-renderer
          </a>
          . Copy button included. Pass <code>filename</code>, override{" "}
          <code>theme</code>, or wrap it in your own skin.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Preview
        </h2>
        <CodeBlock code={example} language="tsx" filename="SaveForm.tsx" />
        <CodeBlock code={json} language="json" filename="package.json" />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <code>{`import { CodeBlock } from "kora-ui/client";

<CodeBlock
  code={\`const greet = () => "hello";\`}
  language="ts"
  filename="greet.ts"
/>`}</code>
        </pre>
      </section>
    </article>
  );
}
