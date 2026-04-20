"use client";

import Editor, { type EditorProps } from "@monaco-editor/react";

export interface CodeEditorProps {
  /** Current value. */
  value?: string;
  /** Fires on every change. */
  onChange?: (value: string) => void;
  /** Language id (`typescript`, `javascript`, `json`, `css`, `html`…). */
  language?: string;
  /** Pixel height. Default: 360. */
  height?: number | string;
  /** Pixel width. Default: full. */
  width?: number | string;
  /** Monaco theme. Default: follows prefers-color-scheme. */
  theme?: "light" | "vs-dark";
  /** Monaco `options` passthrough (readOnly, minimap, etc.). */
  options?: EditorProps["options"];
  className?: string;
}

/**
 * `@monaco-editor/react` wrapper. Monaco loads lazily from a CDN; no extra
 * setup needed. Server components must import through `kora-ui/client`.
 */
export function CodeEditor({
  value,
  onChange,
  language = "typescript",
  height = 360,
  width = "100%",
  theme,
  options,
  className = "",
}: CodeEditorProps) {
  const resolvedTheme =
    theme ??
    (typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "vs-dark"
      : "light");

  return (
    <div
      className={`overflow-hidden rounded-xl border border-[var(--color-border)] ${className}`}
    >
      <Editor
        value={value}
        onChange={(v) => onChange?.(v ?? "")}
        language={language}
        height={height}
        width={width}
        theme={resolvedTheme}
        options={{
          fontSize: 13,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          ...options,
        }}
      />
    </div>
  );
}
