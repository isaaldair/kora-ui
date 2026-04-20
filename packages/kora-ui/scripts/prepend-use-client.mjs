import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(here, "..", "dist");
const files = ["client.js", "client.cjs"];

for (const name of files) {
  const abs = resolve(distDir, name);
  if (!existsSync(abs)) continue;
  const content = readFileSync(abs, "utf8");
  if (content.startsWith('"use client"')) continue;
  writeFileSync(abs, `"use client";\n${content}`);
  console.log(`[kora-ui] prepended "use client" to dist/${name}`);
}
