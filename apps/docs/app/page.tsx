import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      {/* Hero */}
      <section className="flex flex-col gap-6">
        <span
          className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-foreground-muted)",
          }}
        >
          <span
            className="size-1.5 rounded-full"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
          v0.4.0 — 6 themes
        </span>
        <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          React components <br />
          with swappable themes.
        </h1>
        <p
          className="max-w-2xl text-lg leading-relaxed"
          style={{ color: "var(--color-foreground-muted)" }}
        >
          kora-ui is a TypeScript-first React component library. Tree-shakable,
          framework-agnostic, and ships 6 themes — default (Tailwind stock),
          vintage, futuristic, electric, oceanic, botanical — each with its own
          colors, fonts, radius and shadow scales.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/docs"
            className="inline-flex h-10 items-center justify-center rounded-md px-5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-accent-foreground)",
            }}
          >
            Read the docs →
          </Link>
          <Link
            href="/docs/themes"
            className="inline-flex h-10 items-center justify-center rounded-md px-5 text-sm font-medium transition-colors"
            style={{
              backgroundColor: "var(--color-background-secondary)",
              color: "var(--color-foreground)",
            }}
          >
            Explore themes
          </Link>
          <a
            href="https://www.npmjs.com/package/kora-ui"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors"
            style={{ color: "var(--color-foreground-muted)" }}
          >
            View on npm ↗
          </a>
        </div>
      </section>

      {/* Feature grid */}
      <section className="mt-28 grid gap-6 sm:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border p-6"
            style={{ borderColor: "var(--color-border)" }}
          >
            <h3 className="text-sm font-semibold">{f.title}</h3>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ color: "var(--color-foreground-muted)" }}
            >
              {f.body}
            </p>
          </div>
        ))}
      </section>

      {/* Install */}
      <section className="mt-28">
        <h2
          className="text-sm font-medium uppercase tracking-wider"
          style={{ color: "var(--color-foreground-subtle)" }}
        >
          Install
        </h2>
        <pre
          className="mt-3 overflow-x-auto rounded-xl border p-4 text-sm"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-background-secondary)",
          }}
        >
          <code>{`npm install kora-ui`}</code>
        </pre>
        <p
          className="mt-4 text-sm"
          style={{ color: "var(--color-foreground-muted)" }}
        >
          Full setup in the{" "}
          <Link
            href="/docs/installation"
            className="font-medium underline underline-offset-4"
          >
            installation guide
          </Link>
          .
        </p>
      </section>

      {/* Hint */}
      <section
        className="mt-16 rounded-xl border border-dashed p-5 text-sm"
        style={{
          borderColor: "var(--color-border-strong)",
          color: "var(--color-foreground-muted)",
        }}
      >
        Tip — try the floating theme switcher at the bottom-right to swap
        between all 6 themes live. Default follows your system light/dark
        preference; the others ship fixed palettes and fonts.
      </section>
    </main>
  );
}

const features = [
  {
    title: "TypeScript-first",
    body: "Every component ships with strict types. Autocomplete your way through props and refs.",
  },
  {
    title: "Tailwind-native",
    body: "Utility classes, nothing else. Customize through your Tailwind config — no CSS-in-JS runtime.",
  },
  {
    title: "6 swappable themes",
    body: "One data-theme attribute swaps colors, fonts, radii and shadows across the whole app.",
  },
];
