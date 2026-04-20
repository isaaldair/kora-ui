import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Introduction",
  description: "What kora-ui is and how it's designed.",
};

export default function IntroPage() {
  return (
    <article className="flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Getting started
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Introduction</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          kora-ui is a TypeScript-first React component library styled entirely
          with Tailwind CSS. It ships unopinionated primitives plus{" "}
          <Link
            href="/docs/themes"
            className="font-medium text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
          >
            six swappable themes
          </Link>{" "}
          — activate one with a single <code>data-theme</code> attribute.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">What makes it different</h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {principles.map((p) => (
            <li
              key={p.title}
              className="rounded-xl border border-[var(--color-border)] p-5"
            >
              <h3 className="text-sm font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Where to go next</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <NextCard
            href="/docs/installation"
            eyebrow="Step 1"
            title="Install and configure"
            body="Get kora-ui into your app and wire up Tailwind."
          />
          <NextCard
            href="/docs/themes"
            eyebrow="Themes"
            title="Six swappable themes"
            body="Default (Tailwind stock) + vintage, futuristic, electric, oceanic, botanical."
          />
          <NextCard
            href="/docs/components/button"
            eyebrow="Component"
            title="Button"
            body="Three variants, three sizes. The first primitive we shipped."
          />
          <NextCard
            href="https://github.com/isaaldair/kora-ui"
            external
            eyebrow="Source"
            title="GitHub"
            body="Star, report issues, or contribute a component."
          />
        </div>
      </section>
    </article>
  );
}

const principles = [
  {
    title: "Types first",
    body: "Every prop and ref is strictly typed. No guessing in your editor.",
  },
  {
    title: "Tailwind-native",
    body: "Utility classes only. Your Tailwind config is the source of truth.",
  },
  {
    title: "Zero runtime",
    body: "No CSS-in-JS. No global stylesheet to fight. Ship only what you use.",
  },
];

function NextCard({
  href,
  eyebrow,
  title,
  body,
  external,
}: {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
  external?: boolean;
}) {
  const className =
    "group flex flex-col gap-1.5 rounded-xl border border-[var(--color-border)] p-5 transition-colors hover:border-neutral-400 dark:hover:border-neutral-600";
  const content = (
    <>
      <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
        {eyebrow}
      </span>
      <span className="font-semibold">
        {title} <span className="text-neutral-400 transition-transform group-hover:translate-x-0.5">→</span>
      </span>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{body}</p>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
