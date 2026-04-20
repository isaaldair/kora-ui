import type { Metadata } from "next";
import { SiWhatsapp } from "react-icons/si";
import { WhatsAppFloat, CodeBlock } from "kora-ui/client";

export const metadata: Metadata = {
  title: "WhatsApp float",
  description:
    "Floating WhatsApp contact button with single or multi-contact menu. Customizable color.",
};

const demoContacts = [
  {
    name: "Sucursal Centro",
    label: "Av. Reforma 100",
    phone: "+525511111111",
  },
  {
    name: "Sucursal Polanco",
    label: "Masaryk 200",
    phone: "+525522222222",
  },
];

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
        <p className="text-sm text-neutral-500">
          Click the bubble to open the contacts menu.
        </p>
        <div className="relative grid h-72 place-items-center overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)]">
          <span className="text-xs uppercase tracking-wider text-neutral-400">
            Default — WhatsApp green (<code>#25d366</code>)
          </span>
          <WhatsAppFloat
            contacts={demoContacts}
            menuTitle="Elige una sucursal"
            message="Hola, me gustaría cotizar"
            className="!absolute"
            preview
          />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Single contact
        </h2>
        <CodeBlock
          code={`import { WhatsAppFloat } from "kora-ui/client";

<WhatsAppFloat
  contact={{
    name: "Ventas",
    phone: "+52 55 1234 5678",
    message: "Hola, me interesa un producto",
  }}
/>`}
          language="tsx"
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Multiple contacts (branches)
        </h2>
        <CodeBlock
          code={`import { WhatsAppFloat } from "kora-ui/client";

<WhatsAppFloat
  menuTitle="Elige una sucursal"
  message="Hola, me gustaría cotizar"
  contacts={[
    { name: "Centro",  phone: "+52 55 1111 1111", label: "Av. Reforma 100" },
    { name: "Polanco", phone: "+52 55 2222 2222", label: "Masaryk 200" },
  ]}
/>`}
          language="tsx"
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Custom color
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Any CSS color works — hex, rgb, hsl, named, or CSS variables from
          your palette (including the{" "}
          <a className="underline underline-offset-4" href="/docs/themes">
            active theme
          </a>
          ). Each bubble below is a real <code>WhatsAppFloat</code> — click to
          open WhatsApp.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {swatches.map((s) => (
            <div
              key={s.name}
              className="relative flex h-32 items-end justify-end overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-3"
            >
              <span className="absolute left-3 top-3 text-[10px] font-medium uppercase tracking-wider text-neutral-500">
                {s.name}
              </span>
              <WhatsAppFloat
                color={s.color}
                iconColor={s.iconColor}
                contact={{
                  name: s.name,
                  phone: "+525512345678",
                  message: `Hola, vengo del preview "${s.name}" de kora-ui`,
                }}
                className="!absolute"
            preview
              />
            </div>
          ))}
        </div>
        <CodeBlock
          code={`<WhatsAppFloat
  color="var(--color-violet-600)"
  iconColor="#fff"
  contact={{ name: "Ventas", phone: "+52 55 1234 5678" }}
/>`}
          language="tsx"
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Props
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--color-background-secondary)] text-neutral-500">
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
  { name: "Theme blue", color: "var(--color-blue-500)" },
  { name: "Theme violet", color: "var(--color-violet-600)" },
  { name: "Theme lime", color: "var(--color-lime-400)", iconColor: "#0a0a0a" },
];

function Prop({ name, type, def = "—" }: { name: string; type: string; def?: string }) {
  return (
    <tr className="border-t border-[var(--color-border)]">
      <td className="px-4 py-3 font-mono text-xs">{name}</td>
      <td className="px-4 py-3 font-mono text-xs">{type}</td>
      <td className="px-4 py-3 font-mono text-xs">{def}</td>
    </tr>
  );
}
