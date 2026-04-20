"use client";

import { useState, type ChangeEvent } from "react";
import { PdfViewer } from "kora-ui/client";

const SAMPLE_URL = "https://pdfobject.com/pdf/sample.pdf";

export function PdfViewerDemo() {
  const [file, setFile] = useState<string | File>(SAMPLE_URL);

  const onPick = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-6">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <button
          type="button"
          onClick={() => setFile(SAMPLE_URL)}
          className="rounded-md border border-[var(--color-border)] px-3 py-1 text-xs font-medium text-neutral-700 hover:bg-[var(--color-background-secondary)] dark:text-neutral-300 dark:hover:bg-neutral-900"
        >
          Load sample
        </button>
        <label className="inline-flex cursor-pointer items-center rounded-md border border-[var(--color-border)] px-3 py-1 text-xs font-medium text-neutral-700 hover:bg-[var(--color-background-secondary)] dark:text-neutral-300 dark:hover:bg-neutral-900">
          <input
            type="file"
            accept="application/pdf"
            onChange={onPick}
            className="hidden"
          />
          Pick a PDF
        </label>
      </div>
      <PdfViewer file={file} width={560} />
    </section>
  );
}
