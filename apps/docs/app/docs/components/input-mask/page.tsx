import type { Metadata } from "next";
import { InputMaskDemo } from "./input-mask-demo";

export const metadata: Metadata = {
  title: "Input mask",
  description: "Formatted input field powered by imask.",
};

export default function InputMaskPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Special components · Input
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Input mask</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Formatted text input powered by{" "}
          <a
            className="font-medium underline underline-offset-4"
            href="https://imask.js.org"
            target="_blank"
            rel="noreferrer"
          >
            imask
          </a>
          . Pass any iMask config — string templates, regex, numeric ranges,
          dates, credit cards.
        </p>
      </header>

      <InputMaskDemo />

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <code>{`import { InputMask } from "kora-ui/client";

<InputMask
  mask="0000 0000 0000 0000"
  placeholder="Credit card"
  onAccept={(raw, masked) => console.log({ raw, masked })}
/>

<InputMask
  mask={{ mask: Number, scale: 2, radix: "." }}
  placeholder="Amount"
/>`}</code>
        </pre>
      </section>
    </article>
  );
}
