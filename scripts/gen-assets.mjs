// ============================================================
// GERADOR DE ASSETS PLACEHOLDER — DREWSMART
// node scripts/gen-assets.mjs
//
// Gera:
//   public/frames/pulse-pre-treino/frame-00..47.webp  (800×1000)
//   public/posters/{slug}.webp                        (800×1000)
//   public/posters/hero.webp                          (1600×900)
//
// Quando os renders reais (Blender/Higgsfield) chegarem,
// substitua os arquivos NESTAS MESMAS PASTAS com os mesmos nomes.
// Spec final: frames WebP 1200×1500 ~40KB.
// ============================================================

import sharp from "sharp";
import { mkdirSync, existsSync } from "node:fs";

const VOID = "#0a0a0b";
const CARBON = "#141416";
const STEEL = "#2a2a2e";
const BLOOD = "#e10600";
const BLOOD_DIM = "#8b0400";
const BONE = "#f5f3f0";
const ASH = "#8b8a87";

const W = 800;
const H = 1000;

// ---------- helpers ----------
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

function fundo() {
  // gradiente escuro + neons vermelhos desfocados no alto + piso molhado
  return `
    <defs>
      <radialGradient id="bg" cx="50%" cy="38%" r="80%">
        <stop offset="0%" stop-color="${CARBON}"/>
        <stop offset="100%" stop-color="${VOID}"/>
      </radialGradient>
      <linearGradient id="piso" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#101012"/>
        <stop offset="100%" stop-color="${VOID}"/>
      </linearGradient>
      <filter id="blur18"><feGaussianBlur stdDeviation="18"/></filter>
      <filter id="blur8"><feGaussianBlur stdDeviation="8"/></filter>
      <filter id="blur3"><feGaussianBlur stdDeviation="3"/></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect x="60" y="90" width="300" height="6" rx="3" fill="${BLOOD}" opacity="0.5" filter="url(#blur8)"/>
    <rect x="480" y="150" width="240" height="5" rx="2.5" fill="${BLOOD_DIM}" opacity="0.55" filter="url(#blur8)"/>
    <rect x="140" y="210" width="180" height="4" rx="2" fill="${BLOOD}" opacity="0.3" filter="url(#blur8)"/>
    <rect y="760" width="${W}" height="${H - 760}" fill="url(#piso)"/>
    <ellipse cx="400" cy="790" rx="330" ry="26" fill="#000" opacity="0.6" filter="url(#blur18)"/>
  `;
}

function pote({ lidY = 0, lidTilt = 0, aberto = false }) {
  // pote PULSE: corpo escuro, tampa vermelha, faixa de rótulo
  const bodyTop = 380;
  const bodyH = 400;
  const bodyX = 250;
  const bodyW = 300;
  const lidBaseY = bodyTop - 54;

  const reflexoOp = 0.14;

  const tampa = `
    <g transform="translate(400 ${lidBaseY - lidY}) rotate(${lidTilt}) translate(-400 ${-(lidBaseY - lidY)})">
      <rect x="${bodyX - 12}" y="${lidBaseY - lidY}" width="${bodyW + 24}" height="64" rx="18"
        fill="${BLOOD_DIM}"/>
      <rect x="${bodyX - 12}" y="${lidBaseY - lidY}" width="${bodyW + 24}" height="20" rx="10"
        fill="${BLOOD}" opacity="0.85"/>
      <rect x="${bodyX + 8}" y="${lidBaseY - lidY + 6}" width="60" height="46" rx="12"
        fill="${BONE}" opacity="0.10"/>
    </g>`;

  const boca = aberto
    ? `<ellipse cx="400" cy="${bodyTop + 6}" rx="${bodyW / 2 - 14}" ry="22" fill="#050506"/>
       <ellipse cx="400" cy="${bodyTop + 6}" rx="${bodyW / 2 - 14}" ry="22" fill="none" stroke="${STEEL}" stroke-width="3"/>`
    : "";

  return `
    <!-- reflexo no piso molhado -->
    <g transform="translate(0 ${2 * (bodyTop + bodyH) + 24}) scale(1 -1)" opacity="${reflexoOp}" filter="url(#blur3)">
      <rect x="${bodyX}" y="${bodyTop}" width="${bodyW}" height="${bodyH}" rx="34" fill="${CARBON}"/>
      <rect x="${bodyX - 12}" y="${lidBaseY}" width="${bodyW + 24}" height="64" rx="18" fill="${BLOOD_DIM}"/>
    </g>

    <!-- corpo -->
    <rect x="${bodyX}" y="${bodyTop}" width="${bodyW}" height="${bodyH}" rx="34" fill="${CARBON}"/>
    <rect x="${bodyX}" y="${bodyTop}" width="70" height="${bodyH}" rx="34" fill="${BONE}" opacity="0.05"/>
    <rect x="${bodyX + bodyW - 46}" y="${bodyTop}" width="46" height="${bodyH}" rx="23" fill="#000" opacity="0.35"/>

    <!-- rótulo -->
    <rect x="${bodyX}" y="${bodyTop + 96}" width="${bodyW}" height="210" fill="#0d0d0f"/>
    <rect x="${bodyX}" y="${bodyTop + 96}" width="${bodyW}" height="3" fill="${BLOOD}"/>
    <rect x="${bodyX}" y="${bodyTop + 303}" width="${bodyW}" height="3" fill="${BLOOD}"/>
    <text x="400" y="${bodyTop + 185}" text-anchor="middle"
      font-family="sans-serif" font-weight="800" font-size="72"
      letter-spacing="2" fill="${BONE}">PULSE</text>
    <text x="400" y="${bodyTop + 232}" text-anchor="middle"
      font-family="monospace" font-weight="500" font-size="22"
      letter-spacing="6" fill="${ASH}">PRE-TREINO</text>
    <text x="400" y="${bodyTop + 272}" text-anchor="middle"
      font-family="monospace" font-weight="500" font-size="19"
      letter-spacing="3" fill="${BLOOD}">BLACKBERRY · 60 DOSES · 360G</text>

    ${boca}
    ${tampa}
  `;
}

function particulas(seed, n, cy, spread, ry) {
  // pó em suspensão — determinístico por frame
  let s = seed;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  let out = "";
  for (let i = 0; i < n; i++) {
    const x = 400 + (rnd() - 0.5) * spread;
    const y = cy + (rnd() - 0.5) * ry;
    const r = 2 + rnd() * 5;
    const op = 0.35 + rnd() * 0.5;
    const cor = rnd() > 0.75 ? BLOOD : BLOOD_DIM;
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${cor}" opacity="${op.toFixed(2)}"/>`;
  }
  return `<g filter="url(#blur3)">${out}</g>`;
}

function coroaSplash(t) {
  // coroa de líquido subindo da boca do pote
  const h = lerp(20, 190, t);
  const spread = lerp(40, 210, t);
  let arcos = "";
  for (let i = 0; i < 9; i++) {
    const a = (i / 8 - 0.5) * 2;
    const x0 = 400 + a * spread * 0.5;
    const x1 = 400 + a * spread;
    const y1 = 400 - h * (0.65 + 0.35 * Math.cos(a * 1.4));
    arcos += `<path d="M ${x0} 396 Q ${x1} ${y1} ${x1 + a * 26} ${y1 - 22}"
      stroke="${BLOOD_DIM}" stroke-width="${lerp(14, 7, t)}" fill="none"
      stroke-linecap="round" opacity="${lerp(0.95, 0.65, t)}"/>`;
    arcos += `<circle cx="${x1 + a * 26}" cy="${y1 - 26}" r="${lerp(7, 4, t)}" fill="${BLOOD}" opacity="0.8"/>`;
  }
  return `<g filter="url(#blur3)">${arcos}</g>`;
}

function svgFrame(i) {
  const t = i / 47;
  let extras = "";
  let lidY = 0;
  let lidTilt = 0;
  let aberto = false;

  if (i >= 13 && i <= 24) {
    // tampa sobe
    const k = (i - 13) / 11;
    lidY = lerp(0, 190, k);
    lidTilt = lerp(0, -9, k);
    aberto = k > 0.3;
  } else if (i >= 25 && i <= 36) {
    // pó cai com a tampa fora de quadro
    const k = (i - 25) / 11;
    lidY = lerp(190, 460, k);
    lidTilt = -9;
    aberto = true;
    extras += particulas(i * 7 + 3, 46, lerp(250, 360, k), 340, 260);
  } else if (i >= 37) {
    // impacto do líquido
    const k = (i - 37) / 10;
    lidY = 520;
    aberto = true;
    extras += particulas(i * 5 + 11, 24, 300, 380, 200);
    extras += coroaSplash(k);
  }

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    ${fundo()}
    ${pote({ lidY, lidTilt, aberto })}
    ${extras}
    <text x="24" y="${H - 20}" font-family="monospace" font-size="14" fill="${STEEL}">PLACEHOLDER · FRAME ${String(i).padStart(2, "0")}/47 · SWAP PELO RENDER FINAL</text>
  </svg>`);
}

// ---------- posters de produto ----------
function svgPoster(nome, sub, forma) {
  let shape = "";
  if (forma === "cilindro") {
    shape = `<rect x="300" y="330" width="200" height="300" rx="26" fill="${CARBON}"/>
      <rect x="292" y="292" width="216" height="52" rx="14" fill="${BLOOD_DIM}"/>
      <rect x="300" y="400" width="200" height="140" fill="#0d0d0f"/>
      <rect x="300" y="400" width="200" height="3" fill="${BLOOD}"/>
      <rect x="300" y="537" width="200" height="3" fill="${BLOOD}"/>`;
  } else if (forma === "capsula") {
    shape = `<rect x="330" y="300" width="140" height="340" rx="66" fill="${CARBON}"/>
      <rect x="352" y="262" width="96" height="52" rx="16" fill="${BLOOD_DIM}"/>
      <rect x="344" y="330" width="30" height="280" rx="15" fill="${BONE}" opacity="0.06"/>`;
  } else {
    shape = `<rect x="290" y="380" width="220" height="180" rx="14" fill="${CARBON}"/>
      <rect x="290" y="380" width="220" height="34" rx="14" fill="${BLOOD_DIM}"/>
      <rect x="330" y="440" width="140" height="8" rx="4" fill="${STEEL}"/>
      <rect x="330" y="470" width="140" height="8" rx="4" fill="${STEEL}"/>`;
  }
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    ${fundo()}
    <g>
      <g transform="translate(0 ${2 * 640 + 60}) scale(1 -1)" opacity="0.12" filter="url(#blur3)">${shape}</g>
      ${shape}
    </g>
    <text x="400" y="770" text-anchor="middle" font-family="sans-serif" font-weight="800"
      font-size="64" letter-spacing="2" fill="${BONE}">${nome}</text>
    <text x="400" y="812" text-anchor="middle" font-family="monospace"
      font-size="20" letter-spacing="4" fill="${ASH}">${sub}</text>
  </svg>`);
}

// ---------- poster do hero (queda livre, uma nítida em foco) ----------
function svgHero() {
  const HW = 1600;
  const HH = 900;
  const garrafa = (x, y, rot, scale, blur, op) => `
    <g transform="translate(${x} ${y}) rotate(${rot}) scale(${scale})" opacity="${op}" ${blur ? 'filter="url(#hblur)"' : ""}>
      <rect x="-60" y="-160" width="120" height="320" rx="56" fill="${CARBON}"/>
      <rect x="-42" y="-196" width="84" height="46" rx="14" fill="${BLOOD_DIM}"/>
      <rect x="-52" y="-130" width="26" height="260" rx="13" fill="${BONE}" opacity="0.06"/>
      <text x="0" y="30" text-anchor="middle" font-family="sans-serif" font-weight="800"
        font-size="34" letter-spacing="3" fill="${ASH}" transform="rotate(-90)">HELIX</text>
    </g>`;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${HW}" height="${HH}" viewBox="0 0 ${HW} ${HH}">
    <defs>
      <radialGradient id="hbg" cx="62%" cy="42%" r="75%">
        <stop offset="0%" stop-color="#161618"/>
        <stop offset="100%" stop-color="${VOID}"/>
      </radialGradient>
      <filter id="hblur"><feGaussianBlur stdDeviation="10"/></filter>
      <filter id="hglow"><feGaussianBlur stdDeviation="26"/></filter>
    </defs>
    <rect width="${HW}" height="${HH}" fill="url(#hbg)"/>
    <circle cx="1210" cy="210" r="90" fill="${BLOOD}" opacity="0.20" filter="url(#hglow)"/>
    <circle cx="1440" cy="560" r="70" fill="${BLOOD_DIM}" opacity="0.25" filter="url(#hglow)"/>
    <circle cx="950" cy="740" r="55" fill="${BLOOD}" opacity="0.12" filter="url(#hglow)"/>
    ${garrafa(980, 160, -28, 0.7, true, 0.45)}
    ${garrafa(1460, 300, 18, 0.55, true, 0.4)}
    ${garrafa(1020, 730, 40, 0.6, true, 0.35)}
    ${garrafa(1490, 760, -14, 0.5, true, 0.3)}
    ${garrafa(1230, 460, -8, 1.05, false, 1)}
  </svg>`);
}

// ---------- run ----------
mkdirSync("public/frames/pulse-pre-treino", { recursive: true });
mkdirSync("public/posters", { recursive: true });

console.time("assets");

for (let i = 0; i < 48; i++) {
  await sharp(svgFrame(i))
    .webp({ quality: 68 })
    .toFile(`public/frames/pulse-pre-treino/frame-${String(i).padStart(2, "0")}.webp`);
}

const posters = [
  ["pulse-pre-treino", "PULSE", "360G · 60 DOSES", "cilindro"],
  ["core-whey", "CORE", "900G · ISOLADO", "cilindro"],
  ["mono-creatina", "MONO", "300G · 99.9%", "cilindro"],
  ["helix-garrafa", "HELIX", "700ML · TRITAN", "capsula"],
  ["grip-straps", "GRIP", "PAR · 600GSM", "caixa"],
  ["ignite-pre-treino", "IGNITE", "300G · 50 DOSES", "cilindro"],
  ["iso-whey", "ISO", "900G · CONCENTRADO", "cilindro"],
  ["cinch-luvas", "CINCH", "PAR · COURO SINT.", "caixa"],
  ["brace-cinto", "BRACE", "ÚNICO · COURO 10MM", "capsula"],
  ["flux-camiseta", "FLUX", "P AO GG · DRY-FIT", "caixa"],
  ["ridge-shorts", "RIDGE", "P AO GG · TELA DUPLA", "caixa"],
];
// NUNCA sobrescreve um render real já commitado — só preenche o que falta.
for (const [slug, nome, sub, forma] of posters) {
  const dest = `public/posters/${slug}.webp`;
  if (existsSync(dest)) continue;
  await sharp(svgPoster(nome, sub, forma)).webp({ quality: 72 }).toFile(dest);
}

if (!existsSync("public/posters/hero.webp")) {
  await sharp(svgHero()).webp({ quality: 72 }).toFile("public/posters/hero.webp");
}

console.timeEnd("assets");
console.log("ok — 48 frames + 6 posters");
