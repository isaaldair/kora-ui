"use client";

import { useState } from "react";
import { QRReader } from "kora-ui/client";

export function QRReaderDemo() {
  const [decoded, setDecoded] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-6">
      {!active ? (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="inline-flex w-fit h-10 items-center justify-center rounded-md bg-neutral-900 px-4 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          Start scanner
        </button>
      ) : (
        <>
          <QRReader
            onDecode={setDecoded}
            onError={(err) => console.error(err)}
            width={320}
            height={320}
          />
          <button
            type="button"
            onClick={() => setActive(false)}
            className="inline-flex w-fit h-8 items-center rounded-md border border-[var(--color-border)] bg-white px-3 text-xs font-medium hover:bg-[var(--color-background-secondary)] dark:hover:bg-neutral-900"
          >
            Stop
          </button>
        </>
      )}
      {decoded && (
        <p className="rounded-md border border-[var(--color-border)] bg-neutral-100 p-3 font-mono text-xs">
          decoded: {decoded}
        </p>
      )}
    </section>
  );
}
