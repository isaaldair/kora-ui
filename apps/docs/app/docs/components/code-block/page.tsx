import type { Metadata } from "next";
import { CodeBlockDemo } from "./code-block-demo";
import { CodeBlock } from "kora-ui/client";

export const metadata: Metadata = {
  title: "Code block",
  description:
    "Zero-dep syntax-highlighted code block. Shows the language, copies to clipboard, optionally editable.",
};

const jsSnippet = `import { Button } from "kora-ui";

export function SaveForm({ onSave }: { onSave: () => void }) {
  // Submit handler fires on click
  return (
    <Button variant="primary" onClick={onSave}>
      Save changes
    </Button>
  );
}`;

const jsonSnippet = `{
  "name": "kora-ui",
  "version": "0.4.0",
  "type": "module",
  "exports": {
    ".": "./dist/index.js",
    "./client": "./dist/client.js"
  }
}`;

const cssSnippet = `.kora-button {
  background: var(--accent);
  color: var(--accent-fg);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}`;

const bashSnippet = `# install and build
npm install kora-ui
npm run build -w kora-ui --if-present`;

export default function CodeBlockPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Special components · Data display
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Code block</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Syntax-highlighted code with a language pill, copy button, and an
          opt-in <code>editable</code> mode. The tokenizer is written from
          scratch (no external deps) and handles TS/TSX/JS/JSX, JSON, CSS,
          HTML, and Bash.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Static blocks
        </h2>
        <CodeBlock code={jsSnippet} language="tsx" filename="SaveForm.tsx" />
        <CodeBlock code={jsonSnippet} language="json" filename="package.json" />
        <CodeBlock code={cssSnippet} language="css" filename="button.css" />
        <CodeBlock code={bashSnippet} language="bash" filename="Terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Editable
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Pass <code>editable</code> (or an <code>onCodeChange</code>
          {" "}callback) and the block becomes a mini-editor — syntax stays
          highlighted as you type. Tab inserts two spaces.
        </p>
        <CodeBlockDemo />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <CodeBlock
          language="tsx"
          filename="usage.tsx"
          code={`import { CodeBlock } from "kora-ui/client";

// Read-only
<CodeBlock
  code={\`const greet = () => "hello";\`}
  language="ts"
  filename="greet.ts"
/>

// Editable (controlled)
const [code, setCode] = useState("const x = 1");

<CodeBlock
  code={code}
  onCodeChange={setCode}
  language="ts"
/>

// Editable (uncontrolled)
<CodeBlock code={initial} editable language="ts" />`}
        />
      </section>
    </article>
  );
}
