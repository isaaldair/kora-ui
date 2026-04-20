"use client";

import { useState } from "react";

export type WhatsAppContact = {
  /** Display name shown in the menu (e.g. "Ventas" or "Sucursal Centro"). */
  name: string;
  /** Phone in E.164 format or any string — everything non-digit is stripped. */
  phone: string;
  /** Optional secondary line in the menu (address, hours, city…). */
  label?: string;
  /** Per-contact default message; falls back to the top-level `message`. */
  message?: string;
};

export type WhatsAppFloatPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";

export interface WhatsAppFloatProps {
  /** Single contact. Shortcut for `contacts={[contact]}`. */
  contact?: WhatsAppContact;
  /** Multiple contacts — tapping opens a menu to pick one first. */
  contacts?: WhatsAppContact[];
  /** Default message prefilled in the chat when a contact doesn't set one. */
  message?: string;
  /** Corner placement of the floating button. Default: `bottom-right`. */
  position?: WhatsAppFloatPosition;
  /** Heading shown above the contact menu. */
  menuTitle?: string;
  /** Accessible label for the trigger. */
  "aria-label"?: string;
  /** Append classes to the outer container (useful to override positioning). */
  className?: string;
}

const POSITIONS: Record<WhatsAppFloatPosition, string> = {
  "bottom-right": "bottom-6 right-6 flex-col-reverse items-end",
  "bottom-left": "bottom-6 left-6 flex-col-reverse items-start",
  "top-right": "top-6 right-6 flex-col items-end",
  "top-left": "top-6 left-6 flex-col items-start",
};

function buildWaUrl(c: WhatsAppContact, fallback?: string) {
  const phone = c.phone.replace(/\D/g, "");
  const text = c.message ?? fallback;
  const suffix = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${phone}${suffix}`;
}

export function WhatsAppFloat({
  contact,
  contacts,
  message,
  position = "bottom-right",
  menuTitle = "Choose a contact",
  className = "",
  "aria-label": ariaLabel = "Chat on WhatsApp",
}: WhatsAppFloatProps) {
  const list = contacts ?? (contact ? [contact] : []);
  const isMulti = list.length > 1;
  const [open, setOpen] = useState(false);

  const openChat = (c: WhatsAppContact) => {
    if (typeof window !== "undefined") {
      window.open(buildWaUrl(c, message), "_blank", "noopener,noreferrer");
    }
    setOpen(false);
  };

  const onToggle = () => {
    if (isMulti) {
      setOpen((v) => !v);
    } else if (list.length === 1) {
      openChat(list[0]!);
    }
  };

  if (list.length === 0) return null;

  return (
    <div
      className={[
        "fixed z-40 flex gap-3",
        POSITIONS[position],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {open && isMulti && (
        <div
          role="menu"
          className="w-72 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl dark:border-neutral-800 dark:bg-neutral-950"
        >
          <h4 className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            {menuTitle}
          </h4>
          <ul className="mt-1 flex flex-col">
            {list.map((c) => (
              <li key={`${c.name}-${c.phone}`}>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => openChat(c)}
                  className="flex w-full flex-col items-start rounded-md p-2 text-left transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:bg-neutral-100 dark:hover:bg-neutral-900 dark:focus-visible:bg-neutral-900"
                >
                  <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {c.name}
                  </span>
                  {c.label && (
                    <span className="text-xs text-neutral-500">{c.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={onToggle}
        aria-label={ariaLabel}
        aria-expanded={isMulti ? open : undefined}
        className="flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25d366] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950"
      >
        <WhatsAppIcon />
      </button>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      width="26"
      height="26"
      viewBox="0 0 32 32"
      fill="currentColor"
    >
      <path d="M19.11 17.28c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.8-.72-1.35-1.6-1.5-1.87-.16-.27-.02-.41.12-.54.12-.12.27-.32.4-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.13-.61-1.47-.84-2.02-.22-.53-.45-.45-.61-.46-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.66 1.12 2.84.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.6-.65 1.83-1.28.22-.63.22-1.17.16-1.28-.07-.11-.25-.18-.52-.31zM16.01 5.33c-5.89 0-10.67 4.78-10.67 10.67 0 1.88.49 3.72 1.43 5.34L5.33 26.67l5.49-1.44c1.56.85 3.31 1.3 5.11 1.3h.01c5.88 0 10.66-4.78 10.66-10.66 0-2.85-1.11-5.53-3.12-7.54a10.6 10.6 0 0 0-7.55-3.13zm6.24 14.44c-.27.75-1.52 1.43-2.12 1.52-.54.08-1.22.12-1.97-.12-.45-.14-1.03-.33-1.77-.65-3.12-1.35-5.16-4.49-5.31-4.69-.16-.21-1.27-1.69-1.27-3.22 0-1.53.8-2.28 1.09-2.59.29-.31.63-.38.84-.38h.6c.19.01.45-.07.7.54.27.65.91 2.25.99 2.41.08.16.13.35.03.56-.1.21-.15.34-.3.52-.15.18-.31.4-.45.54-.15.14-.3.3-.13.58.17.28.77 1.26 1.65 2.04 1.14 1.01 2.09 1.32 2.37 1.46.28.14.44.12.6-.07.16-.2.69-.8.87-1.08.18-.28.35-.23.6-.14.25.09 1.59.75 1.87.88.28.14.46.2.53.31.07.11.07.64-.2 1.4z" />
    </svg>
  );
}
