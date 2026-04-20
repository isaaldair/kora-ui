"use client";

import { useState } from "react";
import { Mentions } from "kora-ui/client";

const PEOPLE = [
  { id: 1, display: "isaac", description: "Author" },
  { id: 2, display: "istmocode", description: "Team" },
  { id: 3, display: "aldair", description: "Maintainer" },
  { id: 4, display: "guest", description: "Anon" },
  { id: 5, display: "ventas", description: "Sucursal Centro" },
  { id: 6, display: "soporte", description: "Support" },
];

export function MentionsDemo() {
  const [text, setText] = useState(
    "Escribe @ para abrir el menú y elegir alguien…",
  );

  return (
    <section className="flex flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-6">
      <Mentions
        value={text}
        onChange={setText}
        suggestions={PEOPLE}
        rows={4}
        placeholder="Say something…"
      />
      <p className="font-mono text-xs text-neutral-500">raw: {text}</p>
    </section>
  );
}
