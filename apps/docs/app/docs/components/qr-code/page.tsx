import type { Metadata } from "next";
import { QRCode, CodeBlock } from "kora-ui/client";

export const metadata: Metadata = {
  title: "QR code",
  description:
    "Generate QR codes as canvas. Configurable size, colors, and error correction.",
};

export default function QRCodePage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Special components · Data display
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">QR code</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Client-side QR generator (canvas). Encode URLs, vCards, Wi-Fi
          credentials, or any string. A QR <em>reader</em> (camera decoder)
          will ship in a follow-up release.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Preview
        </h2>
        <div className="grid gap-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-6 sm:grid-cols-3">
          <Cell title="Default">
            <QRCode value="https://kora-ui.istmocode.com" size={160} />
          </Cell>
          <Cell title="Electric accent">
            <QRCode
              value="https://kora-ui.istmocode.com"
              size={160}
              color="var(--color-violet-600)"
              backgroundColor="var(--color-violet-50)"
            />
          </Cell>
          <Cell title="High correction">
            <QRCode
              value="https://github.com/isaaldair/kora-ui"
              size={160}
              errorCorrection="H"
            />
          </Cell>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <CodeBlock
          code={`import { QRCode } from "kora-ui/client";

<QRCode value="https://kora-ui.istmocode.com" size={192} />

<QRCode
  value="mailto:hello@example.com"
  color="#0a0a0a"
  backgroundColor="#fff"
  errorCorrection="H"
/>`}
          language="tsx"
        />
      </section>
    </article>
  );
}

function Cell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3">
      {children}
      <span className="text-xs uppercase tracking-wider text-neutral-500">{title}</span>
    </div>
  );
}
