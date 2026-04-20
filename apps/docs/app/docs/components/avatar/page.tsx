import type { Metadata } from "next";
import { Avatar, AvatarImage, AvatarFallback } from "kora-ui";

export const metadata: Metadata = {
  title: "Avatar",
  description: "Circular profile image with text fallback.",
};

export default function AvatarPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Components
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Avatar</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Composable primitive. Pair <code>AvatarImage</code> with{" "}
          <code>AvatarFallback</code> so initials render while the image loads
          or when it fails.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Sizes
        </h2>
        <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white/40 p-6 dark:border-neutral-800 dark:bg-neutral-950/40">
          <Avatar size="sm">
            <AvatarFallback>IA</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>IA</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>IA</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarImage
              src="https://github.com/isaaldair.png"
              alt="Isaac Avila"
            />
            <AvatarFallback>IA</AvatarFallback>
          </Avatar>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <code>{`import { Avatar, AvatarImage, AvatarFallback } from "kora-ui";

<Avatar>
  <AvatarImage src="/me.jpg" alt="Isaac" />
  <AvatarFallback>IA</AvatarFallback>
</Avatar>`}</code>
        </pre>
      </section>
    </article>
  );
}
