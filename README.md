# DREEWSMART

Academia + loja própria de suplementos. Barueri/SP.
**"Não vende plano — vende protocolo."**

Next.js 15 (App Router) · TypeScript · Tailwind v4 · Three.js/R3F · Zustand · Supabase

---

## Rodar local

```bash
npm install
npm run dev        # http://localhost:3000
```

Build de produção:

```bash
npm run build && npm start
```

## Subir na Vercel

1. Suba este repositório no GitHub (`git init && git add . && git commit -m "dreewsmart"` → push).
2. Em [vercel.com/new](https://vercel.com/new), importe o repo. Framework: **Next.js** (detectado sozinho). Zero config extra.
3. (Opcional) Em *Settings → Environment Variables*, adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

   Sem elas o site roda 100% — pedidos e leads ficam em modo offline (fluxo não quebra).

Alternativa sem GitHub: `npx vercel` na raiz do projeto.

## Supabase (opcional)

Rode `supabase/schema.sql` no SQL Editor do projeto. Cria `produtos`, `pedidos` e
`leads` com RLS: leitura pública só do catálogo, insert público de pedido/lead,
nada de leitura anônima de dados de cliente.

## Assets — placeholders → renders finais

Tudo funciona hoje com placeholders procedurais (gerados por
`node scripts/gen-assets.mjs`). Para trocar pelos renders reais
(Blender/Cycles, Spline ou Higgsfield), **substitua os arquivos nos
mesmos caminhos, com os mesmos nomes**:

| Asset | Caminho | Spec final |
|---|---|---|
| Frames da cinemática | `public/frames/[slug]/frame-00..47.webp` | 1200×1500, ~40KB cada |
| Poster por produto | `public/posters/[slug].webp` | WebP, 1º pixel de toda entrada |
| Poster do hero | `public/posters/hero.webp` | composição da ref. 06 (queda livre) |
| Frames de hover do card | `public/frames-hover/[slug]/h-00..11.webp` | 400×500 (hoje: animação CSS) |
| Modelo GLB | `public/models/[slug].glb` | Draco ≤800KB, KTX2 1024² — swap comentado em `src/components/three/SceneShell.tsx` |
| Vídeo da academia | `public/video/academia-barra.mp4` | 6s loop, sem áudio — swap comentado em `src/components/Bifurcacao.tsx` |

Novos produtos com cinemática: gere os 48 frames e ligue `cinematica: true`
no `src/lib/catalog.ts`.

## Regras de performance (não negociáveis)

- Poster estático é o primeiro pixel de toda entrada; o canvas nunca é.
- `IntersectionObserver` + visibilidade da aba cortam o render loop do WebGL fora da viewport.
- Mobile < 768px: **zero WebGL**; cinemática vira carrossel de 4 keyframes.
- `prefers-reduced-motion`: nenhuma animação automática.
- Fontes self-hosted (woff2 variável, subset latin) — sem request de terceiro no caminho crítico.
- Meta: LCP < 1.8s em 4G. Se o 3D quebrar isso, o 3D sai.

## Estrutura

```
src/app            rotas (App Router) — todas funcionais, zero href="#"
src/components     seções da home, PDP, loja, carrinho
src/components/three  cena R3F compartilhada (hero + PDP)
src/lib            catálogo, planos, store Zustand, Supabase, gates de WebGL
scripts            gerador de assets placeholder
supabase           schema.sql (RLS)
public/frames      48 frames da cinemática (por slug)
public/posters     posters estáticos (LCP)
```
