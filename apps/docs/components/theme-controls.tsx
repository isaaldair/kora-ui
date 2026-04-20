"use client";

import { useEffect, useState } from "react";

const ACCENTS = [
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

const STYLES = ["basic", "editorial"] as const;

type Accent = (typeof ACCENTS)[number];
type Style = (typeof STYLES)[number];

const DEFAULT_ACCENT: Accent = "blue";
const DEFAULT_STYLE: Style = "basic";

export function ThemeControls() {
  const [accent, setAccent] = useState<Accent>(DEFAULT_ACCENT);
  const [style, setStyle] = useState<Style>(DEFAULT_STYLE);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedAccent = localStorage.getItem("kora-accent") as Accent | null;
    const savedStyle = localStorage.getItem("kora-style") as Style | null;
    if (savedAccent && (ACCENTS as readonly string[]).includes(savedAccent)) {
      setAccent(savedAccent);
    }
    if (savedStyle && (STYLES as readonly string[]).includes(savedStyle)) {
      setStyle(savedStyle);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.accent = accent;
    localStorage.setItem("kora-accent", accent);
  }, [accent]);

  useEffect(() => {
    document.documentElement.dataset.kStyle = style;
    localStorage.setItem("kora-style", style);
  }, [style]);

  const reset = () => {
    setAccent(DEFAULT_ACCENT);
    setStyle(DEFAULT_STYLE);
  };

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Theme controls"
          className="w-72 rounded-xl border border-neutral-200 bg-white/95 p-4 shadow-xl backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Theme</h3>
            <button
              onClick={reset}
              className="text-xs text-neutral-500 underline-offset-4 hover:text-neutral-900 hover:underline dark:hover:text-neutral-100"
            >
              Reset
            </button>
          </div>

          <div className="mt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Accent
            </h4>
            <div className="mt-2 grid grid-cols-9 gap-1.5">
              {ACCENTS.map((a) => (
                <button
                  key={a}
                  onClick={() => setAccent(a)}
                  aria-label={a}
                  aria-pressed={accent === a}
                  title={a}
                  className="relative size-6 rounded-md ring-offset-2 ring-offset-white transition-all hover:scale-110 data-[active=true]:ring-2 data-[active=true]:ring-neutral-900 dark:ring-offset-neutral-950 dark:data-[active=true]:ring-white"
                  data-active={accent === a}
                  style={{ backgroundColor: `var(--color-electric-${a}-500)` }}
                />
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Style
            </h4>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  aria-pressed={style === s}
                  className={
                    style === s
                      ? "rounded-md border border-neutral-900 bg-neutral-900 px-3 py-2 text-xs font-medium capitalize text-white dark:border-white dark:bg-white dark:text-neutral-900"
                      : "rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs font-medium capitalize text-neutral-700 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300"
                  }
                >
                  {s === "editorial" ? (
                    <span style={{ fontFamily: "var(--font-dm-serif-display)" }}>
                      Editorial
                    </span>
                  ) : (
                    s
                  )}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-neutral-500">
              Editorial swaps headings to DM Serif Display.
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle theme controls"
        aria-expanded={open}
        className="flex size-12 items-center justify-center rounded-full border border-neutral-200 bg-white/90 shadow-lg backdrop-blur transition-colors hover:bg-white dark:border-neutral-800 dark:bg-neutral-950/90 dark:hover:bg-neutral-950"
      >
        <span
          className="size-5 rounded-full ring-2 ring-neutral-200 dark:ring-neutral-800"
          style={{ backgroundColor: `var(--color-electric-${accent}-500)` }}
        />
      </button>
    </div>
  );
}
