import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electric palette",
  description:
    "17 hues × 11 shades of vibrant, neon-adjacent color tokens — works in light and dark.",
};

const hues = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
] as const;

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

export default function PalettePage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Design
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Electric palette</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Every Tailwind hue, pushed to 100% saturation. The scale mirrors Tailwind's
          default 50-950 ramp so every utility (<code>bg-*</code>,{" "}
          <code>text-*</code>, <code>border-*</code>, <code>ring-*</code>) exists and
          behaves identically.
        </p>
      </header>

      {/* Preview strip — showcases hero colors in action */}
      <section className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        <Demo className="bg-electric-red-500">red</Demo>
        <Demo className="bg-electric-orange-500">orange</Demo>
        <Demo className="bg-electric-yellow-400 text-neutral-900">yellow</Demo>
        <Demo className="bg-electric-lime-400 text-neutral-900">lime</Demo>
        <Demo className="bg-electric-green-500">green</Demo>
        <Demo className="bg-electric-cyan-400 text-neutral-900">cyan</Demo>
        <Demo className="bg-electric-sky-500">sky</Demo>
        <Demo className="bg-electric-blue-500">blue</Demo>
        <Demo className="bg-electric-indigo-600">indigo</Demo>
        <Demo className="bg-electric-violet-600">violet</Demo>
        <Demo className="bg-electric-fuchsia-500">fuchsia</Demo>
        <Demo className="bg-electric-pink-500">pink</Demo>
      </section>

      {/* Full ramps */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Full ramps</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Click any swatch to copy its token.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {hues.map((hue) => (
            <div key={hue} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-sm font-semibold capitalize">{hue}</h3>
                <code className="text-xs text-neutral-500">
                  bg-electric-{hue}-*
                </code>
              </div>
              <div className="grid grid-cols-11 gap-1">
                {shades.map((shade) => (
                  <Swatch key={shade} hue={hue} shade={shade} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Using the palette</h2>
        <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
          Import the palette once at your app's CSS entry, then use the utilities
          as normal Tailwind classes.
        </p>
        <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <code>{`/* app/globals.css */
@import "tailwindcss";
@import "kora-ui/styles/electric.css";`}</code>
        </pre>
        <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <code>{`<button className="bg-electric-blue-500 text-electric-blue-50 hover:bg-electric-blue-600">
  Deploy
</button>`}</code>
        </pre>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Light vs. dark</h2>
        <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
          Every shade is saturated enough to hold legibility on either surface, so
          the palette does not ship mode-specific tokens. As a rule of thumb: pick a
          <em> lighter </em> shade (300-500) for dark backgrounds and a{" "}
          <em>darker</em> shade (600-800) for light ones.
        </p>
      </section>
    </article>
  );
}

function Swatch({
  hue,
  shade,
}: {
  hue: (typeof hues)[number];
  shade: (typeof shades)[number];
}) {
  const token = `--color-electric-${hue}-${shade}`;
  const textShade = shade >= 500 ? 50 : 900;
  return (
    <div
      className="group relative flex aspect-square flex-col items-center justify-center rounded-md"
      style={{ backgroundColor: `var(${token})` }}
    >
      <span
        className="text-[10px] font-semibold tracking-tight"
        style={{ color: `var(--color-electric-${hue}-${textShade})` }}
      >
        {shade}
      </span>
    </div>
  );
}

function Demo({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex h-20 items-center justify-center rounded-xl text-sm font-semibold text-white capitalize ${className}`}
    >
      {children}
    </div>
  );
}
