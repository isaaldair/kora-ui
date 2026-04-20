"use client";

import { useState } from "react";
import {
  Highlight,
  themes,
  type Language,
  type PrismTheme,
} from "prism-react-renderer";

export interface CodeBlockProps {
  /** Source code to render. */
  code: string;
  /** Prism language identifier (tsx, ts, jsx, js, css, html, json, bash…). */
  language?: Language;
  /** Override the Prism theme. Defaults adapt to light/dark. */
  theme?: PrismTheme;
  /** Show a file name/title pill above the block. */
  filename?: string;
  /** Show a copy-to-clipboard button. Default: true. */
  copyable?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  theme,
  filename,
  copyable = true,
  className = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const resolvedTheme =
    theme ??
    (typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? themes.vsDark
      : themes.github);

  return (
    <div
      className={[
        "overflow-hidden rounded-xl border border-neutral-200 bg-white text-sm dark:border-neutral-800 dark:bg-neutral-950",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {(filename || copyable) && (
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-2 dark:border-neutral-800">
          <span className="font-mono text-xs text-neutral-500">
            {filename ?? language}
          </span>
          {copyable && (
            <button
              type="button"
              onClick={copy}
              className="rounded-md px-2 py-1 text-xs text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>
      )}
      <Highlight code={code.trim()} language={language} theme={resolvedTheme}>
        {({ className: preCls, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${preCls} overflow-x-auto p-4 leading-relaxed`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, k) => (
                  <span key={k} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
