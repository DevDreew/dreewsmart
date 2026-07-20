// Roda no prebuild (Vercel e local): copia fontes self-hosted do
// Fontsource e gera frames/posters placeholder se não existirem.
import { existsSync, mkdirSync, copyFileSync } from "node:fs";

mkdirSync("src/fonts", { recursive: true });
const FONTES = [
  ["archivo", "archivo-latin-wght-normal.woff2"],
  ["inter-tight", "inter-tight-latin-wght-normal.woff2"],
  ["jetbrains-mono", "jetbrains-mono-latin-wght-normal.woff2"],
];
for (const [pkg, arq] of FONTES) {
  const dest = `src/fonts/${arq}`;
  if (!existsSync(dest)) {
    copyFileSync(`node_modules/@fontsource-variable/${pkg}/files/${arq}`, dest);
    console.log("fonte:", arq);
  }
}

if (!existsSync("public/frames/pulse-pre-treino/frame-47.webp")) {
  console.log("gerando frames/posters placeholder…");
  await import("./gen-assets.mjs");
} else {
  console.log("assets ok — nada a gerar");
}
