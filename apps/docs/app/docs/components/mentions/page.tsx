import type { Metadata } from "next";
import { CodeBlock } from "kora-ui/client";
import { MentionsDemo } from "./mentions-demo";

export const metadata: Metadata = {
  title: "Mentions",
  description: "@-autocomplete textarea with keyboard navigation.",
};

export default function MentionsPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Special components · Input
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Mentions</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Textarea with an <code>@</code>-triggered popover. Arrow keys move
          through suggestions, Enter/Tab inserts, Esc closes. Supports custom
          trigger characters (e.g. <code>#</code> for tags).
        </p>
      </header>

      <MentionsDemo />

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <CodeBlock
          code={`import { Mentions } from "kora-ui/client";

const [text, setText] = useState("");

<Mentions
  value={text}
  onChange={setText}
  trigger="@"
  suggestions={[
    { id: 1, display: "isaac", description: "author" },
    { id: 2, display: "claude", description: "assistant" },
  ]}
/>`}
          language="tsx"
        />
      </section>
    </article>
  );
}
