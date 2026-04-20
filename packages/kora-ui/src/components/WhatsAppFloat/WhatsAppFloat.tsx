"use client";

import { useState, type ReactNode } from "react";
import { SiWhatsapp } from "react-icons/si";

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
  /**
   * Background color of the button. Accepts any CSS color (hex, rgb, hsl,
   * CSS variable…). Default: WhatsApp green `#25d366`.
   */
  color?: string;
  /** Icon color. Default: `#ffffff`. */
  iconColor?: string;
  /** Replace the default WhatsApp icon. */
  icon?: ReactNode;
  /** Accessible label for the trigger. */
  "aria-label"?: string;
  /** Append classes to the outer container (useful to override positioning). */
  className?: string;
  /**
   * Called when a contact is selected. When provided, this replaces the
   * default behavior (opening `wa.me/<phone>` in a new tab) — handy for
   * previews, analytics, or custom open logic.
   */
  onContactClick?: (contact: WhatsAppContact) => void;
}

// Container is anchored to its corner; children are stacked so the button
// stays pinned and the menu grows away from the anchor (above if bottom,
// below if top). DOM order is always [menu, button] — the flex direction
// decides which one renders closest to the anchored edge.
const POSITIONS: Record<WhatsAppFloatPosition, string> = {
  "bottom-right": "bottom-6 right-6 flex-col items-end",
  "bottom-left": "bottom-6 left-6 flex-col items-start",
  "top-right": "top-6 right-6 flex-col-reverse items-end",
  "top-left": "top-6 left-6 flex-col-reverse items-start",
};

const DEFAULT_COLOR = "#25d366";
const DEFAULT_ICON_COLOR = "#ffffff";

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
  color = DEFAULT_COLOR,
  iconColor = DEFAULT_ICON_COLOR,
  icon,
  className = "",
  onContactClick,
  "aria-label": ariaLabel = "Chat on WhatsApp",
}: WhatsAppFloatProps) {
  const list = contacts ?? (contact ? [contact] : []);
  const isMulti = list.length > 1;
  const [open, setOpen] = useState(false);

  const openChat = (c: WhatsAppContact) => {
    if (onContactClick) {
      onContactClick(c);
    } else if (typeof window !== "undefined") {
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
        style={{ backgroundColor: color, color: iconColor }}
        className="flex size-14 items-center justify-center rounded-full shadow-xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950"
      >
        {icon ?? <SiWhatsapp size={26} />}
      </button>
    </div>
  );
}
