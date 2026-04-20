import type { Metadata } from "next";
import { CodeBlock } from "kora-ui/client";
import { RatingDemo } from "./rating-demo";

export const metadata: Metadata = {
  title: "Rating",
  description:
    "Star rating input. Supports half-star step, custom max, color, and read-only mode.",
};

export default function RatingPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Special components · Input
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Rating</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Accessible star rating input. Click or drag to set a value, use the
          arrow keys when focused, or flip to <code>readOnly</code> for display.
        </p>
      </header>

      <RatingDemo />

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <CodeBlock
          code={`import { Rating } from "kora-ui/client";

const [value, setValue] = useState(4);

<Rating value={value} onChange={setValue} />
<Rating value={3.5} step={0.5} readOnly />
<Rating value={value} max={10} color="var(--color-fuchsia-500)" />`}
          language="tsx"
        />
      </section>
    </article>
  );
}
