"use client";

import { useEffect, useState, type ComponentType } from "react";

export interface PdfViewerProps {
  /** Source URL or File (from a file input). */
  file: string | File | null;
  /** Render width (pixels). Default: 640. */
  width?: number;
  className?: string;
}

type ReactPdfModule = typeof import("react-pdf");

export function PdfViewer({ file, width = 640, className = "" }: PdfViewerProps) {
  const [mod, setMod] = useState<ReactPdfModule | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // Lazy-load react-pdf (pdfjs touches DOMMatrix on module init — browser only).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const m = await import("react-pdf");
      if (cancelled) return;
      m.pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${m.pdfjs.version}/pdf.worker.min.mjs`;
      setMod(m);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setPage(1);
    setError(null);
  }, [file]);

  if (!file) {
    return (
      <div
        className={`grid h-64 place-items-center rounded-xl border border-dashed border-[var(--color-border-strong)] text-sm text-[var(--color-foreground-subtle)] ${className}`}
      >
        No PDF loaded
      </div>
    );
  }

  if (!mod) {
    return (
      <div
        className={`grid h-64 place-items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] text-sm text-[var(--color-foreground-subtle)] ${className}`}
      >
        Loading PDF viewer…
      </div>
    );
  }

  const Document = mod.Document as ComponentType<
    {
      file: string | File;
      onLoadSuccess: (opts: { numPages: number }) => void;
      onLoadError: (e: Error) => void;
      loading: React.ReactNode;
      children?: React.ReactNode;
    }
  >;
  const Page = mod.Page as ComponentType<{
    pageNumber: number;
    width?: number;
  }>;

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="overflow-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-4">
        <Document
          file={file}
          onLoadSuccess={({ numPages: n }) => {
            setNumPages(n);
            setError(null);
          }}
          onLoadError={(err) => setError(err.message)}
          loading={
            <div className="p-6 text-sm text-[var(--color-foreground-subtle)]">Loading…</div>
          }
        >
          {numPages && <Page pageNumber={page} width={width} />}
        </Document>
      </div>
      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-100">
          {error}
        </p>
      )}
      {numPages && (
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="inline-flex h-8 items-center rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 text-xs font-medium text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-background-secondary)] disabled:opacity-50"
          >
            ← Prev
          </button>
          <span className="font-mono text-xs text-[var(--color-foreground-subtle)]">
            {page} / {numPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(numPages, p + 1))}
            disabled={page >= numPages}
            className="inline-flex h-8 items-center rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 text-xs font-medium text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-background-secondary)] disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
