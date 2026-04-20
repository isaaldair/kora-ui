import { Button } from "kora-ui";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-between px-6 py-16 sm:py-24">
      <header className="flex flex-col gap-6">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          v0.0.1 — early preview
        </span>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          kora-ui
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          A TypeScript-first React component library styled with Tailwind CSS.
          Tree-shakable, framework-agnostic, and built to stay out of your way.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button>Get started</Button>
          <Button variant="secondary">
            <a
              href="https://www.npmjs.com/package/kora-ui"
              target="_blank"
              rel="noreferrer"
            >
              View on npm
            </a>
          </Button>
          <Button variant="ghost" size="sm">
            <a
              href="https://github.com/isaaldair/kora-ui"
              target="_blank"
              rel="noreferrer"
            >
              GitHub →
            </a>
          </Button>
        </div>
      </header>

      <section className="mt-20 flex flex-col gap-8">
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-500">
            Button
          </h2>
          <p className="mt-1 text-neutral-600 dark:text-neutral-400">
            Three variants, three sizes. Fully typed props, forwards a ref, and
            inherits every native <code>button</code> attribute.
          </p>
        </div>

        <div className="grid gap-6 rounded-xl border border-neutral-200 bg-white/40 p-6 dark:border-neutral-800 dark:bg-neutral-950/40">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button disabled>Disabled</Button>
          </div>
        </div>

        <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
{`import { Button } from "kora-ui";

<Button variant="primary">Save</Button>`}
        </pre>
      </section>

      <footer className="mt-24 border-t border-neutral-200 pt-8 text-sm text-neutral-500 dark:border-neutral-800">
        MIT © Isaac Avila
      </footer>
    </main>
  );
}
