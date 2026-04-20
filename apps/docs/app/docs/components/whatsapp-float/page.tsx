import type { Metadata } from "next";
import { SiWhatsapp } from "react-icons/si";

export const metadata: Metadata = {
  title: "WhatsApp float",
  description:
    "Floating WhatsApp contact button with single or multi-contact menu. Customizable color.",
};

export default function WhatsAppFloatPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Social · Floating
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">WhatsApp float</h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Floating action button that opens a WhatsApp chat. Pass a single{" "}
          <code>contact</code> for direct chat, or an array of{" "}
          <code>contacts</code> — the button then shows a menu (ideal for a
          business with multiple branches). Accepts <code>color</code> and{" "}
          <code>iconColor</code> so the bubble can match any brand palette.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Preview
        </h2>
        <div className="relative grid h-72 place-items-center overflow-hidden rounded-xl border border-neutral-200 bg-white/40 dark:border-neutral-800 dark:bg-neutral-950/40">
          <p className="text-sm text-neutral-500">
            Default color — WhatsApp green (<code>#25d366</code>).
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
            <div
              className="flex size-14 items-center justify-center rounded-full text-white shadow-xl"
              style={{ backgroundColor: "#25d366" }}
            >
              <SiWhatsapp size={26} />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Single contact
        </h2>
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
        <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <code>{`import { WhatsAppFloat } from "kora-ui/client";

<WhatsAppFloat
  menuTitle="Elige una sucursal"
  message="Hola, me gustaría cotizar"
  contacts={[
    { name: "Centro",  phone: "+52 55 1111 1111", label: "Av. Reforma 100" },
    { name: "Polanco", phone: "+52 55 2222 2222", label: "Masaryk 200" },
  ]}
/>`}</code>
        </pre>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Custom color
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Any CSS color works — hex, rgb, hsl, named, or CSS variables from
          your palette (including the <a className="underline underline-offset-4" href="/docs/palette">electric palette</a>).
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {swatches.map((s) => (
            <div
              key={s.name}
              className="relative flex h-28 items-center justify-center rounded-xl border border-neutral-200 bg-white/40 dark:border-neutral-800 dark:bg-neutral-950/40"
            >
              <div
                className="flex size-14 items-center justify-center rounded-full shadow-xl"
                style={{ backgroundColor: s.color, color: s.iconColor ?? "#fff" }}
              >
                <SiWhatsapp size={26} />
              </div>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-wider text-neutral-500">
                {s.name}
              </span>
            </div>
          ))}
        </div>
        <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <code>{`<WhatsAppFloat
  color="var(--color-electric-violet-500)"
  iconColor="#fff"
  contact={{ name: "Ventas", phone: "+52 55 1234 5678" }}
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
              <Prop name="contact" type="WhatsAppContact" />
              <Prop name="contacts" type="WhatsAppContact[]" />
              <Prop name="message" type="string" />
              <Prop
                name="position"
                type='"bottom-right" | "bottom-left" | "top-right" | "top-left"'
                def='"bottom-right"'
              />
              <Prop name="menuTitle" type="string" def='"Choose a contact"' />
              <Prop name="color" type="string" def='"#25d366"' />
              <Prop name="iconColor" type="string" def='"#ffffff"' />
              <Prop name="icon" type="ReactNode" def="<SiWhatsapp />" />
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}

const swatches = [
  { name: "WhatsApp", color: "#25d366" },
  { name: "Electric blue", color: "var(--color-electric-blue-500)" },
  { name: "Electric violet", color: "var(--color-electric-violet-600)" },
  { name: "Electric lime", color: "var(--color-electric-lime-400)", iconColor: "#0a0a0a" },
];

function Prop({ name, type, def = "—" }: { name: string; type: string; def?: string }) {
  return (
    <tr className="border-t border-neutral-200 dark:border-neutral-800">
      <td className="px-4 py-3 font-mono text-xs">{name}</td>
      <td className="px-4 py-3 font-mono text-xs">{type}</td>
      <td className="px-4 py-3 font-mono text-xs">{def}</td>
    </tr>
  );
}
