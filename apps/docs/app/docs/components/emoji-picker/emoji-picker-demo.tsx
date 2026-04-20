"use client";

import { useState } from "react";
import { EmojiPicker } from "kora-ui/client";

export function EmojiPickerDemo() {
  const [chosen, setChosen] = useState<string | null>(null);

  return (
    <section className="flex flex-col items-start gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-6">
      {chosen && (
        <p className="text-sm">
          Picked:{" "}
          <span className="text-2xl" aria-label="emoji">
            {chosen}
          </span>
        </p>
      )}
      <EmojiPicker
        onEmojiClick={(e) => setChosen(e.emoji)}
        theme="auto"
      />
    </section>
  );
}
