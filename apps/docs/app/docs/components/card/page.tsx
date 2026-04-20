import type { Metadata } from "next";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from "kora-ui";
import { CodeBlock } from "kora-ui/client";

export const metadata: Metadata = {
  title: "Card",
  description: "Surface primitive with optional header, content, and footer.",
};

export default function CardPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Components
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Card</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Bordered surface with optional <code>CardHeader</code>,{" "}
          <code>CardTitle</code>, <code>CardDescription</code>,{" "}
          <code>CardContent</code>, and <code>CardFooter</code> subcomponents.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Preview
        </h2>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-6">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Deploy to production</CardTitle>
              <CardDescription>
                Promote the latest preview to your main domain.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                This action will overwrite the current production build. It
                cannot be undone without a rollback.
              </p>
            </CardContent>
            <CardFooter>
              <Button>Deploy</Button>
              <Button variant="ghost">Cancel</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <CodeBlock
          code={`import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from "kora-ui";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Body</CardContent>
  <CardFooter>Actions</CardFooter>
</Card>`}
          language="tsx"
        />
      </section>
    </article>
  );
}
