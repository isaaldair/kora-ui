"use client";

import {
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";

export type MentionSuggestion = {
  id: string | number;
  display: string;
  avatar?: string;
  description?: string;
};

export interface MentionsProps {
  /** Controlled value. */
  value: string;
  /** Called with the raw text whenever it changes. */
  onChange: (value: string) => void;
  /** Source list — filtered by `display.startsWith(query)`. */
  suggestions: MentionSuggestion[];
  /** Character that opens the menu. Default: `"@"`. */
  trigger?: string;
  /** Placeholder for the textarea. */
  placeholder?: string;
  /** Row count for the textarea. Default: 3. */
  rows?: number;
  className?: string;
}

export function Mentions({
  value,
  onChange,
  suggestions,
  trigger = "@",
  placeholder,
  rows = 3,
  className = "",
}: MentionsProps) {
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const [query, setQuery] = useState<string | null>(null);
  const [highlight, setHighlight] = useState(0);

  const filtered = query
    ? suggestions.filter((s) =>
        s.display.toLowerCase().startsWith(query.toLowerCase()),
      )
    : [];

  const detect = (text: string, caret: number) => {
    const before = text.slice(0, caret);
    const match = before.match(
      new RegExp(`(?:^|\\s)${escapeRegex(trigger)}(\\w*)$`),
    );
    if (match) {
      setQuery(match[1] ?? "");
      setHighlight(0);
    } else {
      setQuery(null);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    detect(e.target.value, e.target.selectionStart ?? 0);
  };

  const insert = (s: MentionSuggestion) => {
    const ta = taRef.current;
    if (!ta) return;
    const caret = ta.selectionStart ?? value.length;
    const before = value.slice(0, caret);
    const after = value.slice(caret);
    const replaced = before.replace(
      new RegExp(`${escapeRegex(trigger)}\\w*$`),
      `${trigger}${s.display} `,
    );
    const nextValue = replaced + after;
    onChange(nextValue);
    setQuery(null);
    requestAnimationFrame(() => {
      const pos = replaced.length;
      ta.focus();
      ta.setSelectionRange(pos, pos);
    });
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (query === null || filtered.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      const item = filtered[highlight];
      if (item) insert(item);
    } else if (e.key === "Escape") {
      setQuery(null);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <textarea
        ref={taRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKey}
        onBlur={() => setTimeout(() => setQuery(null), 150)}
        placeholder={placeholder}
        rows={rows}
        className="block w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-foreground)] transition-colors placeholder:text-[var(--color-foreground-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
      />
      {query !== null && filtered.length > 0 && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-20 mt-1 w-72 max-w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] shadow-xl"
        >
          {filtered.map((s, i) => (
            <li
              key={s.id}
              role="option"
              aria-selected={i === highlight}
              onMouseDown={(e) => {
                e.preventDefault();
                insert(s);
              }}
              onMouseEnter={() => setHighlight(i)}
              className={`flex cursor-pointer items-center gap-3 px-3 py-2 text-sm transition-colors ${
                i === highlight
                  ? "bg-[var(--color-background-secondary)]"
                  : "hover:bg-[var(--color-background-secondary)]"
              }`}
            >
              {s.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={s.avatar}
                  alt=""
                  className="size-7 rounded-full object-cover"
                />
              ) : (
                <span className="flex size-7 items-center justify-center rounded-full bg-[var(--color-background-secondary)] text-xs font-medium text-[var(--color-foreground)]">
                  {s.display[0]?.toUpperCase()}
                </span>
              )}
              <span className="flex flex-col">
                <span className="font-medium text-[var(--color-foreground)]">
                  {s.display}
                </span>
                {s.description && (
                  <span className="text-xs text-[var(--color-foreground-subtle)]">
                    {s.description}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
