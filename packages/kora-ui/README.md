# kora-ui

A React UI component library styled with **Tailwind CSS**. TypeScript-first, tree-shakable, and framework-agnostic (works in Next.js, Vite, Remix, CRA, etc.).

[![npm](https://img.shields.io/npm/v/kora-ui.svg)](https://www.npmjs.com/package/kora-ui)
[![npm downloads](https://img.shields.io/npm/dm/kora-ui.svg)](https://www.npmjs.com/package/kora-ui)
[![license](https://img.shields.io/npm/l/kora-ui.svg)](./LICENSE)

Live docs: **[kora-ui.istmocode.com](https://kora-ui.istmocode.com)**

## Install

```bash
npm install kora-ui
# or
pnpm add kora-ui
# or
yarn add kora-ui
```

`react` and `react-dom` are peer dependencies (React 18+).

## Setup

In your `tailwind.config.{js,ts}`, add kora-ui to `content`:

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/kora-ui/dist/**/*.{js,mjs,cjs}",
  ],
} satisfies Config;
```

Optionally import the electric palette once to enable every `bg-electric-*`,
`text-electric-*`, `border-electric-*`, and `ring-electric-*` utility:

```css
/* app/globals.css */
@import "tailwindcss";
@import "kora-ui/styles/electric.css";
```

## Usage

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "kora-ui";

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deploy to production</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="primary">Deploy</Button>
      </CardContent>
    </Card>
  );
}
```

## Components

| Component | Import |
| --- | --- |
| Alert | `Alert`, `AlertTitle`, `AlertDescription` |
| Avatar | `Avatar`, `AvatarImage`, `AvatarFallback` |
| Badge | `Badge` |
| Button | `Button` |
| Card | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` |
| Checkbox | `Checkbox` |
| Input | `Input` |
| Label | `Label` |
| Separator | `Separator` |
| Textarea | `Textarea` |
| WhatsApp float | `WhatsAppFloat` (from `kora-ui/client`) |

### `WhatsAppFloat`

Floating contact button that opens a WhatsApp chat. Pass a single `contact`
for direct chat, or an array of `contacts` — the button shows a menu for the
visitor to pick one (ideal for a business with several branches).

```tsx
import { WhatsAppFloat } from "kora-ui/client";

// Single contact
<WhatsAppFloat
  contact={{
    name: "Ventas",
    phone: "+52 55 1234 5678",
    message: "Hola, me interesa un producto",
  }}
/>

// Multiple contacts → pops a menu
<WhatsAppFloat
  menuTitle="Elige una sucursal"
  contacts={[
    { name: "Centro",  phone: "+52 55 1111 1111", label: "Av. Reforma 100" },
    { name: "Polanco", phone: "+52 55 2222 2222", label: "Masaryk 200" },
  ]}
/>
```

## Electric palette

17 Tailwind hues × 11 shades, pushed to 100% saturation — neon-adjacent color
tokens that hold legibility in both light and dark surfaces.

```tsx
<button className="bg-electric-blue-500 text-electric-blue-50 hover:bg-electric-blue-600">
  Deploy
</button>
```

Preview every shade at [kora-ui.istmocode.com/docs/palette](https://kora-ui.istmocode.com/docs/palette).

## Docs

Full documentation, previews, and prop tables at
**[kora-ui.istmocode.com](https://kora-ui.istmocode.com)**.

## License

[MIT](./LICENSE) © Isaac Avila
