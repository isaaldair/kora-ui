import type { Metadata } from "next";
import { CodeBlock } from "kora-ui/client";
import { ImageCropperDemo } from "./image-cropper-demo";

export const metadata: Metadata = {
  title: "Image cropper",
  description:
    "Interactive image crop with zoom + aspect ratio selection, powered by react-easy-crop.",
};

export default function ImageCropperPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Special components · Media
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Image cropper</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Drag to pan, scroll or use the slider to zoom. Emits crop pixel
          coordinates via <code>onCropComplete</code> — turn them into a
          cropped image on your own canvas or server.
        </p>
      </header>

      <ImageCropperDemo />

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Usage
        </h2>
        <CodeBlock
          code={`import { ImageCropper } from "kora-ui/client";

<ImageCropper
  image={imageUrl}
  aspect={16 / 9}
  cropShape="rect"
  onCropComplete={(area) => console.log(area)}
/>`}
          language="tsx"
        />
      </section>
    </article>
  );
}
