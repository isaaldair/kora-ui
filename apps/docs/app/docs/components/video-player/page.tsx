import type { Metadata } from "next";
import { VideoPlayer } from "kora-ui/client";

export const metadata: Metadata = {
  title: "Video player",
  description:
    "Minimal video player with custom controls. Follows the site accent.",
};

export default function VideoPlayerPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Special components · Media
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Video player</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Zero-dep wrapper over the native <code>&lt;video&gt;</code> element
          with styled play / pause / seek / mute controls. Seek bar accent
          color follows the site theme by default (<code>var(--accent)</code>),
          or override with the <code>accent</code> prop.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Preview
        </h2>
        <VideoPlayer
          src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          poster="https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
          className="aspect-video w-full"
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <code>{`import { VideoPlayer } from "kora-ui/client";

<VideoPlayer
  src="/videos/intro.mp4"
  poster="/videos/intro.jpg"
  accent="var(--color-electric-pink-500)"
  className="aspect-video w-full"
/>`}</code>
        </pre>
      </section>
    </article>
  );
}
