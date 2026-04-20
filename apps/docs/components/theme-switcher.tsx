"use client";

import { useEffect, useState } from "react";
import themesData from "kora-ui/styles/themes.json";

type ThemeId = "default" | "vintage" | "futuristic" | "electric" | "oceanic" | "botanical";

type ThemeData = {
  meta: { name: string; description: string; mood: string };
  fonts: { display: string; body: string; mono: string; googleFontsUrl: string | null };
  semantic: {
    background: { primary: string; secondary: string; tertiary: string; inverse: string };
    text: { primary: string; secondary: string; muted: string; inverse: string };
    border: { default: string; subtle: string; strong: string };
    accent: { default: string; hover: string; foreground: string };
  };
};

const THEMES = themesData.themes as Record<ThemeId, ThemeData>;
const THEME_IDS = Object.keys(THEMES) as ThemeId[];
const DEFAULT_THEME: ThemeId = "default";
const STORAGE_KEY = "kora-theme";
const FONT_LINK_ID = "kora-theme-fonts";

function applyGoogleFontsLink(url: string | null) {
  if (typeof document === "undefined") return;
  const existing = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (!url) {
    existing?.remove();
    return;
  }
  if (existing && existing.href === url) return;
  if (existing) {
    existing.href = url;
    return;
  }
  const link = document.createElement("link");
  link.id = FONT_LINK_ID;
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>(DEFAULT_THEME);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    if (saved && (THEME_IDS as string[]).includes(saved)) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    applyGoogleFontsLink(THEMES[theme].fonts.googleFontsUrl);
  }, [theme]);

  const active = THEMES[theme];

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Theme switcher"
          className="w-80 rounded-xl border p-4 shadow-xl backdrop-blur"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "color-mix(in oklab, var(--color-background) 95%, transparent)",
          }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Theme</h3>
            <button
              onClick={() => setTheme(DEFAULT_THEME)}
              className="text-xs underline-offset-4 hover:underline"
              style={{ color: "var(--color-foreground-subtle)" }}
            >
              Reset
            </button>
          </div>

          <ul className="mt-3 flex flex-col gap-1.5">
            {THEME_IDS.map((id) => {
              const t = THEMES[id];
              const selected = theme === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setTheme(id)}
                    aria-pressed={selected}
                    className="group flex w-full items-center gap-3 rounded-lg border p-2.5 text-left transition-colors"
                    style={{
                      borderColor: selected
                        ? "var(--color-accent)"
                        : "var(--color-border)",
                      backgroundColor: selected
                        ? "var(--color-background-secondary)"
                        : "transparent",
                    }}
                  >
                    <ThemePreview theme={t} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium capitalize">
                          {t.meta.name}
                        </span>
                        {selected && (
                          <span
                            className="text-[10px] font-semibold uppercase tracking-wider"
                            style={{ color: "var(--color-accent)" }}
                          >
                            Active
                          </span>
                        )}
                      </div>
                      <p
                        className="truncate text-xs"
                        style={{ color: "var(--color-foreground-subtle)" }}
                      >
                        {t.meta.mood}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          <p
            className="mt-3 border-t pt-3 text-[11px] leading-relaxed"
            style={{
              borderColor: "var(--color-border-subtle)",
              color: "var(--color-foreground-subtle)",
            }}
          >
            {theme === "default"
              ? "Default follows your system light/dark preference."
              : `${active.meta.name} ships fixed ${active.semantic.background.primary === "#ffffff" || active.meta.mood.includes("light") ? "light" : "tuned"} palette & fonts.`}
          </p>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle theme switcher"
        aria-expanded={open}
        className="flex size-12 items-center justify-center rounded-full border shadow-lg backdrop-blur transition-colors"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "color-mix(in oklab, var(--color-background) 90%, transparent)",
        }}
      >
        <ThemeDot theme={active} />
      </button>
    </div>
  );
}

function ThemePreview({ theme }: { theme: ThemeData }) {
  return (
    <div
      className="flex size-10 shrink-0 items-center justify-center rounded-md border"
      style={{
        backgroundColor: theme.semantic.background.primary,
        borderColor: theme.semantic.border.default,
      }}
    >
      <div className="flex gap-0.5">
        <span
          className="size-2 rounded-full"
          style={{ backgroundColor: theme.semantic.accent.default }}
        />
        <span
          className="size-2 rounded-full"
          style={{ backgroundColor: theme.semantic.text.primary }}
        />
        <span
          className="size-2 rounded-full"
          style={{ backgroundColor: theme.semantic.text.muted }}
        />
      </div>
    </div>
  );
}

function ThemeDot({ theme }: { theme: ThemeData }) {
  return (
    <span
      className="size-5 rounded-full"
      style={{
        background: `linear-gradient(135deg, ${theme.semantic.accent.default} 50%, ${theme.semantic.background.primary} 50%)`,
        boxShadow: `inset 0 0 0 1px ${theme.semantic.border.strong}`,
      }}
    />
  );
}
