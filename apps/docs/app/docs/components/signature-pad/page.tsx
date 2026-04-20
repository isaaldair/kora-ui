import type { Metadata } from "next";
import { SignaturePad, CodeBlock } from "kora-ui/client";

export const metadata: Metadata = {
  title: "Signature pad",
  description: "Canvas-based signature capture with PNG export.",
};

export default function SignaturePadPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Special components · Input
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Signature pad</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Capture a handwritten signature on canvas. Touch + mouse + stylus.
          Export as PNG data URL via <code>onChange</code> or the built-in
          Download button.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Preview
        </h2>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-6">
          <SignaturePad width={480} height={180} />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <CodeBlock
          code={`import { SignaturePad } from "kora-ui/client";

<SignaturePad
  width={480}
  height={180}
  penColor="#0a0a0a"
  onChange={(dataUrl) => upload(dataUrl)}
/>`}
          language="tsx"
        />
      </section>
    </article>
  );
}
