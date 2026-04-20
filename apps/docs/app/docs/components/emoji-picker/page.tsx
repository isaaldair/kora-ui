import type { Metadata } from "next";
import { CodeBlock } from "kora-ui/client";
import { EmojiPickerDemo } from "./emoji-picker-demo";

export const metadata: Metadata = {
  title: "Emoji picker",
  description:
    "Wrapper over emoji-picker-react. Follows light/dark; exposes native/Apple/Google styles.",
};

export default function EmojiPickerPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Special components · Input
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Emoji picker</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Pick an emoji from the full Unicode set. Styles (
          <code>native</code>, <code>apple</code>, <code>google</code>,{" "}
          <code>twitter</code>, <code>facebook</code>) are forwarded to the
          underlying <code>emoji-picker-react</code>.
        </p>
      </header>

      <EmojiPickerDemo />

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <CodeBlock
          code={`import { EmojiPicker } from "kora-ui/client";

<EmojiPicker
  onEmojiClick={(e) => console.log(e.emoji)}
  theme="auto"
  emojiStyle="native"
/>`}
          language="tsx"
        />
      </section>
    </article>
  );
}
