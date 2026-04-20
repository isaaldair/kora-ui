"use client";

import { useState, type ReactNode } from "react";

export interface JsonViewerProps {
  /** Any JSON-serializable value (object, array, primitive). */
  data: unknown;
  /** Start with every node collapsed. Default: false. */
  collapsedByDefault?: boolean;
  /** Root label shown above the tree. */
  rootLabel?: string;
  className?: string;
}

export function JsonViewer({
  data,
  collapsedByDefault = false,
  rootLabel,
  className = "",
}: JsonViewerProps) {
  return (
    <div
      className={[
        "overflow-auto rounded-xl border border-neutral-200 bg-white p-4 font-mono text-sm leading-relaxed dark:border-neutral-800 dark:bg-neutral-950",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {rootLabel && (
        <div className="mb-2 text-xs uppercase tracking-wider text-neutral-500">
          {rootLabel}
        </div>
      )}
      <Node value={data} depth={0} collapsedByDefault={collapsedByDefault} />
    </div>
  );
}

function Node({
  value,
  name,
  depth,
  collapsedByDefault,
}: {
  value: unknown;
  name?: string;
  depth: number;
  collapsedByDefault: boolean;
}) {
  const isObject = value !== null && typeof value === "object";
  const entries = isObject
    ? Array.isArray(value)
      ? (value as unknown[]).map((v, i) => [String(i), v] as const)
      : Object.entries(value as Record<string, unknown>)
    : [];
  const [open, setOpen] = useState(!collapsedByDefault);

  if (!isObject) {
    return (
      <Line depth={depth}>
        {name !== undefined && <Key>{name}:</Key>}
        <Primitive value={value} />
      </Line>
    );
  }

  const isArray = Array.isArray(value);
  const bracketOpen = isArray ? "[" : "{";
  const bracketClose = isArray ? "]" : "}";

  return (
    <div>
      <Line depth={depth}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mr-1 inline-flex size-4 items-center justify-center rounded text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          aria-label={open ? "Collapse" : "Expand"}
        >
          <span className="text-[10px]">{open ? "▾" : "▸"}</span>
        </button>
        {name !== undefined && <Key>{name}:</Key>}
        <span className="text-neutral-500">{bracketOpen}</span>
        {!open && (
          <span className="ml-1 text-neutral-400">
            {entries.length} {entries.length === 1 ? "item" : "items"}
            <span className="ml-1">{bracketClose}</span>
          </span>
        )}
      </Line>
      {open && (
        <>
          {entries.map(([k, v]) => (
            <Node
              key={k}
              value={v}
              name={k}
              depth={depth + 1}
              collapsedByDefault={collapsedByDefault}
            />
          ))}
          <Line depth={depth}>
            <span className="text-neutral-500">{bracketClose}</span>
          </Line>
        </>
      )}
    </div>
  );
}

function Line({ depth, children }: { depth: number; children: ReactNode }) {
  return (
    <div
      className="flex items-start gap-1 whitespace-pre"
      style={{ paddingLeft: depth * 16 }}
    >
      {children}
    </div>
  );
}

function Key({ children }: { children: ReactNode }) {
  return <span className="text-neutral-700 dark:text-neutral-300">{children}</span>;
}

function Primitive({ value }: { value: unknown }) {
  if (value === null) return <span className="text-neutral-400">null</span>;
  if (typeof value === "string")
    return <span className="text-green-700 dark:text-green-400">"{value}"</span>;
  if (typeof value === "number")
    return <span className="text-blue-700 dark:text-blue-400">{value}</span>;
  if (typeof value === "boolean")
    return (
      <span className="text-purple-700 dark:text-purple-400">
        {String(value)}
      </span>
    );
  if (typeof value === "undefined")
    return <span className="text-neutral-400">undefined</span>;
  return <span>{String(value)}</span>;
}
