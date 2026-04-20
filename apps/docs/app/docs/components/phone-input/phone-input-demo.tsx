"use client";

import { useState } from "react";
import { Label } from "kora-ui";
import { PhoneInput } from "kora-ui/client";

export function PhoneInputDemo() {
  const [phone, setPhone] = useState("");
  const [valid, setValid] = useState(false);

  return (
    <section className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white/40 p-6 dark:border-neutral-800 dark:bg-neutral-950/40">
      <div className="flex flex-col gap-1.5">
        <Label>Phone</Label>
        <PhoneInput
          defaultCountry="MX"
          onChange={(e164, isValid) => {
            setPhone(e164);
            setValid(isValid);
          }}
        />
      </div>
      <div className="flex flex-wrap gap-4 text-xs font-mono text-neutral-500">
        <span>E.164: {phone || "(empty)"}</span>
        <span>
          valid:{" "}
          <span
            className={
              valid
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-amber-600 dark:text-amber-400"
            }
          >
            {String(valid)}
          </span>
        </span>
      </div>
    </section>
  );
}
