import type { Metadata } from "next";
import { VideoPlayer, CodeBlock } from "kora-ui/client";

export const metadata: Metadata = {
  title: "Video player",
  description:
    "Video player with custom controls for mp4/webm and automatic YouTube embeds.",
};

export default function VideoPlayerPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-foreground-subtle)]">
          Special components · Media
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Video player</h1>
        <p className="max-w-2xl text-[var(--color-foreground-muted)]">
          Wrapper over the native <code>&lt;video&gt;</code> element with styled
          play / pause / seek / mute controls. Pass a YouTube URL and the
          component swaps to a facade + iframe automatically — click the
          poster to load the embed. The preview image is fully configurable via
          the <code>poster</code> prop (YouTube&apos;s maxres thumbnail is used
          as default for YouTube URLs).
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-foreground-subtle)]">
          YouTube — default thumbnail
        </h2>
        <VideoPlayer
          src="https://www.youtube.com/watch?v=JmcA9LIIXWw&list=RDJmcA9LIIXWw&start_radio=1"
          className="aspect-video w-full"
        />
        <p className="text-sm text-[var(--color-foreground-muted)]">
          No <code>poster</code> prop → the player shows YouTube&apos;s own maxres
          thumbnail automatically.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-foreground-subtle)]">
          YouTube — custom poster
        </h2>
        <VideoPlayer
          src="https://www.youtube.com/watch?v=JmcA9LIIXWw&list=RDJmcA9LIIXWw&start_radio=1"
          poster="/my-cover.svg"
          className="aspect-video w-full"
        />
        <p className="text-sm text-[var(--color-foreground-muted)]">
          Same YouTube URL, but a <code>poster</code> prop overrides the preview
          image. Drop in your own cover (JPG, PNG, SVG, or any URL) to keep the
          player on-brand before playback.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-foreground-subtle)]">
          Native mp4
        </h2>
        <VideoPlayer
          src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          poster="https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
          className="aspect-video w-full"
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-foreground-subtle)]">
          Usage
        </h2>
        <CodeBlock
          code={`import { VideoPlayer } from "kora-ui/client";

// YouTube — any watch/shorts/youtu.be URL works
<VideoPlayer
  src="https://www.youtube.com/watch?v=JmcA9LIIXWw"
  className="aspect-video w-full"
/>

// YouTube with a custom preview image
<VideoPlayer
  src="https://www.youtube.com/watch?v=JmcA9LIIXWw"
  poster="/my-cover.jpg"
  className="aspect-video w-full"
/>

// Native mp4 / webm
<VideoPlayer
  src="/videos/intro.mp4"
  poster="/videos/intro.jpg"
  accent="var(--color-pink-500)"
  className="aspect-video w-full"
/>`}
          language="tsx"
        />
      </section>
    </article>
  );
}
