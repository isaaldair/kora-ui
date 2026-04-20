import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WhatsApp float",
  description:
    "Floating WhatsApp contact button with single or multi-contact menu.",
};

export default function WhatsAppFloatPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Components · Special buttons
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">WhatsApp float</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Floating action button that opens a WhatsApp chat. Pass a single{" "}
          <code>contact</code> for direct chat, or an array of{" "}
          <code>contacts</code> — the button then shows a menu (ideal for
          businesses with multiple branches).
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Preview
        </h2>
        <div className="relative grid h-72 place-items-center overflow-hidden rounded-xl border border-neutral-200 bg-white/40 dark:border-neutral-800 dark:bg-neutral-950/40">
          <p className="text-sm text-neutral-500">
            The button floats in the bottom-right corner of its container.
          </p>
          <div className="absolute bottom-6 right-6 flex flex-col-reverse items-end gap-3">
            <div className="w-72 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl dark:border-neutral-800 dark:bg-neutral-950">
              <h4 className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Choose a contact
              </h4>
              <ul className="mt-1 flex flex-col">
                <li className="flex w-full flex-col items-start rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900">
                  <span className="text-sm font-medium">Sucursal Centro</span>
                  <span className="text-xs text-neutral-500">Av. Reforma 100</span>
                </li>
                <li className="flex w-full flex-col items-start rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900">
                  <span className="text-sm font-medium">Sucursal Polanco</span>
                  <span className="text-xs text-neutral-500">Masaryk 200</span>
                </li>
              </ul>
            </div>
            <div className="flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-xl">
              <svg aria-hidden="true" width="26" height="26" viewBox="0 0 32 32" fill="currentColor">
                <path d="M19.11 17.28c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.8-.72-1.35-1.6-1.5-1.87-.16-.27-.02-.41.12-.54.12-.12.27-.32.4-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.13-.61-1.47-.84-2.02-.22-.53-.45-.45-.61-.46-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.66 1.12 2.84.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.6-.65 1.83-1.28.22-.63.22-1.17.16-1.28-.07-.11-.25-.18-.52-.31zM16.01 5.33c-5.89 0-10.67 4.78-10.67 10.67 0 1.88.49 3.72 1.43 5.34L5.33 26.67l5.49-1.44c1.56.85 3.31 1.3 5.11 1.3h.01c5.88 0 10.66-4.78 10.66-10.66 0-2.85-1.11-5.53-3.12-7.54a10.6 10.6 0 0 0-7.55-3.13z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Single contact
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Tapping the button opens WhatsApp directly with the message prefilled.
        </p>
        <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <code>{`import { WhatsAppFloat } from "kora-ui/client";

<WhatsAppFloat
  contact={{
    name: "Ventas",
    phone: "+52 55 1234 5678",
    message: "Hola, me interesa un producto",
  }}
/>`}</code>
        </pre>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Multiple contacts (branches)
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          For a business with several locations, pass an array — the button
          opens a menu so the visitor picks one before the chat opens.
        </p>
        <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <code>{`import { WhatsAppFloat } from "kora-ui/client";

<WhatsAppFloat
  menuTitle="Elige una sucursal"
  message="Hola, me gustaría cotizar"
  contacts={[
    {
      name: "Sucursal Centro",
      label: "Av. Reforma 100",
      phone: "+52 55 1111 1111",
    },
    {
      name: "Sucursal Polanco",
      label: "Masaryk 200",
      phone: "+52 55 2222 2222",
    },
  ]}
/>`}</code>
        </pre>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Props
        </h2>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900">
              <tr>
                <th className="px-4 py-3 font-medium">Prop</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Default</th>
              </tr>
            </thead>
            <tbody className="text-neutral-700 dark:text-neutral-300">
              <tr className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="px-4 py-3 font-mono text-xs">contact</td>
                <td className="px-4 py-3 font-mono text-xs">WhatsAppContact</td>
                <td className="px-4 py-3 font-mono text-xs">—</td>
              </tr>
              <tr className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="px-4 py-3 font-mono text-xs">contacts</td>
                <td className="px-4 py-3 font-mono text-xs">WhatsAppContact[]</td>
                <td className="px-4 py-3 font-mono text-xs">—</td>
              </tr>
              <tr className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="px-4 py-3 font-mono text-xs">message</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">—</td>
              </tr>
              <tr className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="px-4 py-3 font-mono text-xs">position</td>
                <td className="px-4 py-3 font-mono text-xs">
                  "bottom-right" | "bottom-left" | "top-right" | "top-left"
                </td>
                <td className="px-4 py-3 font-mono text-xs">"bottom-right"</td>
              </tr>
              <tr className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="px-4 py-3 font-mono text-xs">menuTitle</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">"Choose a contact"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
