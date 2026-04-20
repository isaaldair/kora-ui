import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "kora-ui/client";

export const metadata: Metadata = {
  title: "Installation",
  description: "Install kora-ui and wire up Tailwind CSS.",
};

export default function InstallationPage() {
  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Getting started
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Installation</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          kora-ui ships prebuilt ESM + CJS bundles. <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[0.9em]">react</code>{" "}
          and <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[0.9em]">react-dom</code> are peer
          dependencies (React 18+).
        </p>
      </header>

      <Step
        n={1}
        title="Install the package"
        description="Pick your package manager."
      >
        <CodeBlock
          code={`npm install kora-ui
# or
pnpm add kora-ui
# or
yarn add kora-ui`}
          language="bash"
        />
      </Step>

      <Step
        n={2}
        title="Expose kora-ui to Tailwind"
        description="Add kora-ui's built output to Tailwind's content array so its utility classes are scanned."
      >
        <CodeBlock
          code={`// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/kora-ui/dist/**/*.{js,mjs,cjs}",
  ],
} satisfies Config;`}
          language="ts"
          filename="tailwind.config.ts"
        />
      </Step>

      <Step
        n={3}
        title="Enable themes"
        description="Import the themes stylesheet once. Six themes become available (default, vintage, futuristic, electric, oceanic, botanical); switch by setting `data-theme` on `<html>`."
      >
        <CodeBlock
          code={`/* app/globals.css */
@import "tailwindcss";
@import "kora-ui/styles/themes.css";`}
          language="css"
          filename="app/globals.css"
        />
        <CodeBlock
          code={`<!-- Activate a theme (default follows system light/dark) -->
<html data-theme="vintage">`}
          language="html"
        />
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Explore every theme on the{" "}
          <Link
            href="/docs/themes"
            className="font-medium text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
          >
            themes page
          </Link>
          .
        </p>
      </Step>

      <Step n={4} title="Use a component" description="That's it. Import and render.">
        <CodeBlock
          code={`import { Button } from "kora-ui";

export default function Example() {
  return (
    <div className="flex gap-2">
      <Button variant="primary">Save</Button>
      <Button variant="secondary">Cancel</Button>
    </div>
  );
}`}
          language="tsx"
        />
      </Step>
    </article>
  );
}

function Step({
  n,
  title,
  description,
  children,
}: {
  n: number;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="flex size-7 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white dark:bg-white dark:text-neutral-900">
          {n}
        </span>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}
