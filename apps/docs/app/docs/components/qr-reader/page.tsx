import type { Metadata } from "next";
import { CodeBlock } from "kora-ui/client";
import { QRReaderDemo } from "./qr-reader-demo";

export const metadata: Metadata = {
  title: "QR reader",
  description:
    "Scan QR codes with the device camera via html5-qrcode. Requires camera permission.",
};

export default function QRReaderPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Special components · Media
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">QR reader</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Live QR scanner using the back-facing camera. Fires{" "}
          <code>onDecode</code> whenever a code is recognized. Needs HTTPS and
          camera permission; only the preview page asks for it.
        </p>
      </header>

      <QRReaderDemo />

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <CodeBlock
          code={`import { QRReader } from "kora-ui/client";

<QRReader
  onDecode={(text) => console.log("scanned:", text)}
  onError={(err) => console.error(err)}
/>`}
          language="tsx"
        />
      </section>
    </article>
  );
}
