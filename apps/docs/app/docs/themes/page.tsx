import type { Metadata } from "next";
import themesData from "kora-ui/styles/themes.json";

export const metadata: Metadata = {
  title: "Themes",
  description:
    "Six swappable themes — default, vintage, futuristic, electric, oceanic, botanical. Each ships its own colors, fonts, radius and shadow scales.",
};

type SemanticTokens = {
  background: { primary: string; secondary: string; tertiary: string; inverse: string };
  text: { primary: string; secondary: string; muted: string; inverse: string };
  border: { default: string; subtle: string; strong: string };
  accent: { default: string; hover: string; foreground: string };
};

type ColorRamp = Record<string, string>;

type Theme = {
  meta: { name: string; description: string; mood: string };
  fonts: { display: string; body: string; mono: string; googleFontsUrl: string | null };
  semantic: SemanticTokens;
  semanticDark?: SemanticTokens;
  radius: Record<string, string>;
  shadows: Record<string, string>;
  colors?: Record<string, ColorRamp>;
};

const themes = themesData.themes as Record<string, Theme>;
const themeIds = Object.keys(themes);
const RAMP_SHADES = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] as const;
const HUES = [
  "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal",
  "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose",
] as const;

export default function ThemesPage() {
  return (
    <article className="flex flex-col gap-12">
      <header className="flex flex-col gap-3">
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-foreground-subtle)" }}
        >
          Themes
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Six themes, one attribute</h1>
        <p
          className="max-w-2xl leading-relaxed"
          style={{ color: "var(--color-foreground-muted)" }}
        >
          Each theme is a complete design system: semantic tokens, typography,
          radii, shadows, and (for the five opinionated ones) a full 22-hue ×
          11-shade palette. Activate one with a single attribute:
        </p>
        <pre
          className="w-fit overflow-x-auto rounded-md border px-3 py-2 text-sm"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-background-secondary)",
          }}
        >
          <code>{`<html data-theme="vintage">`}</code>
        </pre>
      </header>

      <section
        className="rounded-xl border p-5 text-sm leading-relaxed"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-background-secondary)",
        }}
      >
        <p>
          <strong>Tip:</strong> the floating switcher at the bottom-right of the
          site swaps themes live and persists your choice in{" "}
          <code>localStorage</code>. The <em>default</em> theme uses the
          Tailwind stock palette and follows your OS light/dark preference; the
          other five ship fixed palettes and fonts loaded on demand from Google
          Fonts.
        </p>
      </section>

      <div className="flex flex-col gap-16">
        {themeIds.map((id) => (
          <ThemeCard key={id} id={id} theme={themes[id]} />
        ))}
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Using themes in your app</h2>
        <p
          className="max-w-2xl text-sm leading-relaxed"
          style={{ color: "var(--color-foreground-muted)" }}
        >
          Import the stylesheet once at your CSS entry and set{" "}
          <code>data-theme</code> on <code>&lt;html&gt;</code>. All semantic
          tokens (<code>--color-background</code>, <code>--color-foreground</code>,{" "}
          <code>--color-accent</code>, …) and utilities (<code>bg-*</code>,{" "}
          <code>text-*</code>) resolve to the active theme.
        </p>
        <pre
          className="overflow-x-auto rounded-xl border p-4 text-sm"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-background-secondary)",
          }}
        >
          <code>{`/* app/globals.css */
@import "tailwindcss";
@import "kora-ui/styles/themes.css";`}</code>
        </pre>
        <pre
          className="overflow-x-auto rounded-xl border p-4 text-sm"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-background-secondary)",
          }}
        >
          <code>{`<html data-theme="oceanic">
  <body>...</body>
</html>`}</code>
        </pre>
      </section>
    </article>
  );
}

function ThemeCard({ id, theme }: { id: string; theme: Theme }) {
  const preview: React.CSSProperties = {
    backgroundColor: theme.semantic.background.primary,
    color: theme.semantic.text.primary,
    borderColor: theme.semantic.border.default,
    fontFamily: theme.fonts.body,
  };

  return (
    <section className="flex flex-col gap-5">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <h2
            className="text-2xl font-semibold tracking-tight capitalize"
            style={{ fontFamily: theme.fonts.display }}
          >
            {theme.meta.name}
          </h2>
          <code
            className="rounded px-1.5 py-0.5 text-xs"
            style={{
              backgroundColor: "var(--color-background-tertiary)",
              color: "var(--color-foreground-muted)",
            }}
          >
            data-theme=&quot;{id}&quot;
          </code>
        </div>
        <span
          className="text-xs uppercase tracking-wider"
          style={{ color: "var(--color-foreground-subtle)" }}
        >
          {theme.meta.mood}
        </span>
      </header>

      <p
        className="max-w-2xl text-sm leading-relaxed"
        style={{ color: "var(--color-foreground-muted)" }}
      >
        {theme.meta.description}
      </p>

      {/* Live preview inside the theme's own palette */}
      <div
        className="overflow-hidden rounded-xl border"
        style={preview}
      >
        <div
          className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"
          style={{
            backgroundColor: theme.semantic.background.secondary,
            borderBottom: `1px solid ${theme.semantic.border.default}`,
          }}
        >
          <div className="flex flex-col">
            <span
              className="text-lg font-semibold tracking-tight"
              style={{ fontFamily: theme.fonts.display }}
            >
              {theme.meta.name} preview
            </span>
            <span
              className="text-xs"
              style={{ color: theme.semantic.text.muted }}
            >
              Sample surface + typography
            </span>
          </div>
          <button
            type="button"
            className="rounded-md px-3 py-1.5 text-sm font-medium"
            style={{
              backgroundColor: theme.semantic.accent.default,
              color: theme.semantic.accent.foreground,
              borderRadius: theme.radius.md,
              boxShadow: theme.shadows.sm,
            }}
          >
            Accent action
          </button>
        </div>
        <div className="flex flex-col gap-3 px-5 py-4">
          <p style={{ color: theme.semantic.text.primary }}>
            The quick brown fox jumps over the lazy dog.
          </p>
          <p
            className="text-sm"
            style={{ color: theme.semantic.text.muted, fontFamily: theme.fonts.mono }}
          >
            const greeting = &quot;Hola {theme.meta.name}&quot;;
          </p>
        </div>
      </div>

      {/* Fonts */}
      <div className="grid gap-3 sm:grid-cols-3">
        <FontCell label="Display" value={theme.fonts.display} />
        <FontCell label="Body" value={theme.fonts.body} />
        <FontCell label="Mono" value={theme.fonts.mono} />
      </div>

      {/* Semantic tokens */}
      <SemanticTokenGrid tokens={theme.semantic} />
      {theme.semanticDark && (
        <SemanticTokenGrid tokens={theme.semanticDark} label="Dark mode (automatic)" />
      )}

      {/* Radius + shadow + color ramps (only opinionated themes ship ramps) */}
      <div className="grid gap-6 md:grid-cols-2">
        <ScaleCell label="Radius" entries={Object.entries(theme.radius)} kind="radius" />
        <ScaleCell label="Shadow" entries={Object.entries(theme.shadows)} kind="shadow" bg={theme.semantic.background.primary} />
      </div>

      {theme.colors && <ColorRamps colors={theme.colors} />}
    </section>
  );
}

function FontCell({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-lg border p-3"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div
        className="text-[10px] font-semibold uppercase tracking-wider"
        style={{ color: "var(--color-foreground-subtle)" }}
      >
        {label}
      </div>
      <div className="mt-1 text-sm" style={{ fontFamily: value }}>
        Aa — Lorem ipsum
      </div>
      <div
        className="mt-1 truncate text-[11px]"
        style={{ color: "var(--color-foreground-muted)" }}
      >
        {value}
      </div>
    </div>
  );
}

function SemanticTokenGrid({
  tokens,
  label = "Semantic tokens (light)",
}: {
  tokens: SemanticTokens;
  label?: string;
}) {
  const rows: Array<[string, string]> = [
    ["bg / primary", tokens.background.primary],
    ["bg / secondary", tokens.background.secondary],
    ["bg / tertiary", tokens.background.tertiary],
    ["text / primary", tokens.text.primary],
    ["text / muted", tokens.text.muted],
    ["border / default", tokens.border.default],
    ["accent / default", tokens.accent.default],
    ["accent / foreground", tokens.accent.foreground],
  ];
  return (
    <div className="flex flex-col gap-2">
      <h3
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: "var(--color-foreground-subtle)" }}
      >
        {label}
      </h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {rows.map(([name, value]) => (
          <div
            key={name}
            className="flex items-center gap-2 rounded-md border p-2"
            style={{ borderColor: "var(--color-border)" }}
          >
            <span
              className="size-6 shrink-0 rounded border"
              style={{
                backgroundColor: value,
                borderColor: "var(--color-border-subtle)",
              }}
            />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[11px] font-medium">{name}</div>
              <div
                className="truncate font-mono text-[10px]"
                style={{ color: "var(--color-foreground-subtle)" }}
              >
                {value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScaleCell({
  label,
  entries,
  kind,
  bg,
}: {
  label: string;
  entries: Array<[string, string]>;
  kind: "radius" | "shadow";
  bg?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: "var(--color-foreground-subtle)" }}
      >
        {label}
      </h3>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {entries.map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col items-center gap-1 rounded-md border p-2 text-center"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div
              className="size-10"
              style={{
                borderRadius: kind === "radius" ? value : 6,
                boxShadow: kind === "shadow" ? value : undefined,
                backgroundColor:
                  kind === "shadow"
                    ? bg ?? "var(--color-background)"
                    : "var(--color-foreground)",
                opacity: kind === "radius" ? 0.9 : 1,
              }}
            />
            <span className="text-[10px] font-medium">{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ColorRamps({ colors }: { colors: Record<string, ColorRamp> }) {
  return (
    <div className="flex flex-col gap-3">
      <h3
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: "var(--color-foreground-subtle)" }}
      >
        Color ramps (17 hues)
      </h3>
      <div className="flex flex-col gap-1.5">
        {HUES.filter((h) => colors[h]).map((hue) => (
          <div key={hue} className="flex items-center gap-2">
            <div
              className="w-16 shrink-0 font-mono text-[11px] capitalize"
              style={{ color: "var(--color-foreground-muted)" }}
            >
              {hue}
            </div>
            <div className="grid flex-1 grid-cols-11 gap-0.5">
              {RAMP_SHADES.map((shade) => (
                <div
                  key={shade}
                  className="h-6 rounded-sm"
                  style={{ backgroundColor: colors[hue][shade] }}
                  title={`${hue}-${shade} — ${colors[hue][shade]}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
