import type { Metadata } from "next";
import { CodeBlock } from "kora-ui/client";
import { PdfViewerDemo } from "./pdf-viewer-demo";

export const metadata: Metadata = {
  title: "PDF viewer",
  description:
    "Paginated PDF renderer via react-pdf. PDF.js worker auto-loads from CDN.",
};

export default function PdfViewerPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Special components · Media
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">PDF viewer</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Renders a PDF with text + annotation layers. The pdf.js worker is
          auto-configured to load from a public CDN, so consumers don't need
          to wire it up.
        </p>
      </header>

      <PdfViewerDemo />

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <CodeBlock
          code={`import { PdfViewer } from "kora-ui/client";

<PdfViewer file="/sample.pdf" width={640} />
<PdfViewer file={file} />      // File from <input type="file">`}
          language="tsx"
        />
      </section>
    </article>
  );
}
