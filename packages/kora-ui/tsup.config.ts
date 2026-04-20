import { defineConfig } from "tsup";

const shared = {
  format: ["esm", "cjs"] as const,
  dts: true,
  sourcemap: true,
  target: "es2020" as const,
  treeshake: true,
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    /^react-icons/,
  ],
};

export default defineConfig([
  {
    ...shared,
    entry: ["src/index.ts"],
    clean: true,
  },
  {
    ...shared,
    entry: ["src/client.ts"],
    clean: false,
    banner: {
      js: '"use client";',
    },
  },
]);
