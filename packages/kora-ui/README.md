# kora-ui

A React UI component library styled with **Tailwind CSS**. TypeScript-first, tree-shakable, and framework-agnostic (works in Next.js, Vite, Remix, CRA, etc.).

[![npm](https://img.shields.io/npm/v/kora-ui.svg)](https://www.npmjs.com/package/kora-ui)
[![npm downloads](https://img.shields.io/npm/dm/kora-ui.svg)](https://www.npmjs.com/package/kora-ui)
[![license](https://img.shields.io/npm/l/kora-ui.svg)](./LICENSE)

> **Status:** `v0.0.1` — early preview. The API is not stable yet.

## Install

```bash
npm install kora-ui
# or
pnpm add kora-ui
# or
yarn add kora-ui
```

`react` and `react-dom` are peer dependencies (React 18+).

## Requirements

`kora-ui` ships components that use Tailwind utility classes. To make them render correctly, the consuming app needs a working Tailwind setup. In `tailwind.config.{js,ts}`, add `kora-ui` to `content` so its classes are picked up:

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

## Usage

```tsx
import { Button } from "kora-ui";

export default function Example() {
  return (
    <div className="flex gap-2">
      <Button variant="primary">Save</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="ghost" size="sm">Learn more</Button>
    </div>
  );
}
```

## Components

| Component | Status |
| --- | --- |
| `Button` | ✅ available |
| `Card`   | 🛠 in progress |
| `Input`  | 🛠 in progress |

More components land on every minor release. Track progress in the [issues](https://github.com/isaaldair/kora-ui/issues).

## API

### `<Button />`

```ts
type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant; // default "primary"
  size?: ButtonSize;       // default "md"
}
```

## Contributing

Issues and pull requests are welcome at [github.com/isaaldair/kora-ui](https://github.com/isaaldair/kora-ui).

## License

[MIT](./LICENSE) © Isaac Avila
