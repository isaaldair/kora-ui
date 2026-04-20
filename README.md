# kora-ui

A React UI component library styled with **Tailwind CSS**. TypeScript-first, tree-shakable, and framework-agnostic (works in Next.js, Vite, Remix, CRA, etc.).

[![npm](https://img.shields.io/npm/v/kora-ui.svg)](https://www.npmjs.com/package/kora-ui)
[![npm downloads](https://img.shields.io/npm/dm/kora-ui.svg)](https://www.npmjs.com/package/kora-ui)
[![license](https://img.shields.io/npm/l/kora-ui.svg)](./packages/kora-ui/LICENSE)

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

In your `tailwind.config.{js,ts}`, add kora-ui to `content` so its classes are
picked up:

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

To enable the electric palette, import its stylesheet once at your app's CSS
entry:

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
| WhatsApp float | `WhatsAppFloat` from `kora-ui/client` (floating contact button; multi-branch menu) |

## Electric palette

Every Tailwind hue, pushed to 100% saturation. Works in light and dark.
17 hues × 11 shades = 187 CSS custom properties + Tailwind utility classes
(`bg-electric-blue-500`, `text-electric-fuchsia-600`, etc.).

```tsx
<button className="bg-electric-blue-500 text-electric-blue-50 hover:bg-electric-blue-600">
  Deploy
</button>
```

Preview every shade on the [palette page](https://kora-ui.istmocode.com/docs/palette).

## Docs

Full documentation, previews, and prop tables at
**[kora-ui.istmocode.com](https://kora-ui.istmocode.com)**.

## License

[MIT](./packages/kora-ui/LICENSE) © Isaac Avila
