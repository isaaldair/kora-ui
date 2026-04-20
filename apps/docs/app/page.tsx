import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      {/* Hero */}
      <section className="flex flex-col gap-6">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          v0.0.1 — early preview
        </span>
        <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          React components <br />
          styled with Tailwind.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          kora-ui is a TypeScript-first React component library. Tree-shakable,
          framework-agnostic, and built to stay out of your way.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/components"
            className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Browse components →
          </Link>
          <a
            href="https://www.npmjs.com/package/kora-ui"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-100 px-5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
          >
            View on npm
          </a>
          <a
            href="https://github.com/isaaldair/kora-ui"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
          >
            GitHub ↗
          </a>
        </div>
      </section>

      {/* Feature grid */}
      <section className="mt-28 grid gap-6 sm:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-neutral-200 p-6 dark:border-neutral-800"
          >
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {f.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {f.body}
            </p>
          </div>
        ))}
      </section>

      {/* Install */}
      <section className="mt-28">
        <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-500">
          Install
        </h2>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <code>{`npm install kora-ui`}</code>
        </pre>
        <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
          Then add kora-ui to your Tailwind <code>content</code> array so its
          classes are scanned:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <code>{`// tailwind.config.ts
content: [
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/kora-ui/dist/**/*.{js,mjs,cjs}",
]`}</code>
        </pre>
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
    title: "Tree-shakable",
    body: "Dual ESM + CJS builds, marked side-effect-free. Import only what you render.",
  },
];
