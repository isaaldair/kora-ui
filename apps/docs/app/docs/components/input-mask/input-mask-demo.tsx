"use client";

import { useState } from "react";
import { Label } from "kora-ui";
import { InputMask } from "kora-ui/client";

export function InputMaskDemo() {
  const [card, setCard] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");

  return (
    <section className="grid gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-6 sm:grid-cols-2">
      <div className="flex flex-col gap-1.5">
        <Label>Credit card</Label>
        <InputMask
          mask="0000 0000 0000 0000"
          placeholder="4242 4242 4242 4242"
          onAccept={(raw) => setCard(raw)}
        />
        <span className="font-mono text-xs text-neutral-500">raw: {card}</span>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Phone (MX)</Label>
        <InputMask
          mask="+52 (000) 000-0000"
          placeholder="+52 (___) ___-____"
          onAccept={(raw) => setPhone(raw)}
        />
        <span className="font-mono text-xs text-neutral-500">raw: {phone}</span>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Date</Label>
        <InputMask
          mask="00/00/0000"
          placeholder="dd/mm/yyyy"
          onAccept={(raw) => setDate(raw)}
        />
        <span className="font-mono text-xs text-neutral-500">raw: {date}</span>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Amount</Label>
        <InputMask
          mask={{ mask: Number, scale: 2, radix: ".", thousandsSeparator: "," }}
          placeholder="1,234.56"
        />
      </div>
    </section>
  );
}
