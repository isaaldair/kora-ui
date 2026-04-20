# kora-ui monorepo

Source for the [`kora-ui`](https://www.npmjs.com/package/kora-ui) component library and its documentation site.

## Structure

```
kora-ui/
├── packages/
│   └── kora-ui/     # the published npm package (React + Tailwind components)
└── apps/
    └── docs/        # Next.js + Fumadocs site (kora-ui.dev)
```

## Develop

```bash
npm install             # install all workspaces
npm run build:lib       # build kora-ui to packages/kora-ui/dist
npm run dev:lib         # watch mode for the library
npm run dev:docs        # run the docs site on http://localhost:3000
npm run typecheck       # type-check every workspace
```

## Publish the library

From `packages/kora-ui/`:

```bash
cd packages/kora-ui
npm version patch
npm publish
```

## Deploy the docs site

The docs site (`apps/docs`) is a Next.js 16 app. It is deployed to Vercel with
no dashboard tweaking needed — `vercel.json` at the repo root declares the
monorepo build:

1. Import the repo at [vercel.com/new](https://vercel.com/new).
2. Leave **Root Directory** empty (use repo root).
3. The pre-set build runs `npm run build:lib` followed by `npm --prefix apps/docs run build`, then serves `apps/docs/.next`.
4. Every push to `main` triggers a production deploy; every PR gets a preview URL.

## License

[MIT](./packages/kora-ui/LICENSE) © Isaac Avila
