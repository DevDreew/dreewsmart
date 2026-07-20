"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIsMobile, useReducedMotion } from "@/lib/use-webgl-gate";

// ============================================================
// SEÇÃO 03 — CINEMÁTICA (sticky, 300vh) — O MOMENTO PREMIUM
// Canvas 2D + drawImage. 48 frames WebP.
// SEM biblioteca de scroll — o scrub são ~40 linhas de JS.
// Keyframes 0/12/24/36 carregam primeiro, resto em background.
//
// Mobile < 768px OU prefers-reduced-motion:
//   sem scroll-scrub — carrossel de 4 keyframes.
//
// Frames em /public/frames/[slug]/frame-NN.webp (placeholders
// procedurais — trocar pelos renders finais, mesmos nomes).
// ============================================================

const TOTAL = 48;
const KEYFRAMES = [0, 12, 24, 36];

export interface Ato {
  ate: number; // frame final do ato (inclusive)
  titulo: string;
  linha: string;
}

const ATOS_PULSE: Ato[] = [
  { ate: 12, titulo: "PULSE", linha: "Pré-treino. Blackberry." },
  { ate: 24, titulo: "60 DOSES", linha: "Sem blend proprietário." },
  { ate: 36, titulo: "400MG", linha: "Cafeína anidra. Dose declarada." },
  { ate: 47, titulo: "NADA É ACASO", linha: "Cada grama tem motivo." },
];

const src = (slug: string, i: number) =>
  `/frames/${slug}/frame-${String(i).padStart(2, "0")}.webp`;

export default function Cinematica({
  slug = "pulse-pre-treino",
  atos = ATOS_PULSE,
  cta = { href: "/produto/pulse-pre-treino", label: "VER PULSE" },
}: {
  slug?: string;
  atos?: Ato[];
  cta?: { href: string; label: string };
}) {
  const mobile = useIsMobile();
  const reduced = useReducedMotion();

  if (mobile || reduced) {
    return <CarrosselKeyframes slug={slug} atos={atos} cta={cta} />;
  }
  return <Scrub slug={slug} atos={atos} cta={cta} />;
}

/* ---------------- scrub desktop ---------------- */

function Scrub({
  slug,
  atos,
  cta,
}: {
  slug: string;
  atos: Ato[];
  cta: { href: string; label: string };
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgs = useRef<(HTMLImageElement | null)[]>(Array(TOTAL).fill(null));
  const frameAtual = useRef(0);
  const [atoIdx, setAtoIdx] = useState(0);

  const desenhar = useCallback((n: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // usa o frame pedido ou o keyframe carregado mais próximo
    let img = imgs.current[n];
    if (!img) {
      const k = [...KEYFRAMES].reverse().find((k) => k <= n && imgs.current[k]);
      img = k !== undefined ? imgs.current[k] : imgs.current.find(Boolean) ?? null;
    }
    if (!img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width: cw, height: ch } = canvas;
    // cover fit
    const s = Math.max(cw / img.width, ch / img.height);
    const w = img.width * s;
    const h = img.height * s;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }, []);

  // preload: keyframes primeiro, resto em background
  useEffect(() => {
    let vivo = true;
    const carregar = (i: number) =>
      new Promise<void>((res) => {
        const img = new window.Image();
        img.onload = () => {
          if (vivo) {
            imgs.current[i] = img;
            if (Math.abs(frameAtual.current - i) <= 1 || KEYFRAMES.includes(i))
              desenhar(frameAtual.current);
          }
          res();
        };
        img.onerror = () => res();
        img.src = src(slug, i);
      });

    (async () => {
      await Promise.all(KEYFRAMES.map(carregar));
      for (let i = 0; i < TOTAL && vivo; i++) {
        if (!imgs.current[i]) await carregar(i);
      }
    })();
    return () => {
      vivo = false;
    };
  }, [slug, desenhar]);

  // canvas em tamanho real (dpr limitado)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ajustar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      desenhar(frameAtual.current);
    };
    ajustar();
    window.addEventListener("resize", ajustar);
    return () => window.removeEventListener("resize", ajustar);
  }, [desenhar]);

  // ---- o scrub em si (~40 linhas) ----
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const percorrivel = r.height - window.innerHeight;
        const progresso = Math.min(1, Math.max(0, -r.top / percorrivel));
        const n = Math.round(progresso * (TOTAL - 1));
        if (n !== frameAtual.current) {
          frameAtual.current = n;
          desenhar(n);
          const idx = atos.findIndex((a) => n <= a.ate);
          setAtoIdx(idx === -1 ? atos.length - 1 : idx);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [atos, desenhar]);

  const ato = atos[atoIdx];
  const ultimo = atoIdx === atos.length - 1;

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-void">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-5 items-center gap-10 px-5 md:px-10">
          <div className="col-span-3 h-[82vh]">
            <canvas
              ref={canvasRef}
              className="h-full w-full"
              aria-label="Sequência do PULSE: pote abre, pó cai, líquido impacta"
              role="img"
            />
          </div>

          {/* texto troca por ato */}
          <div className="col-span-2">
            <div key={atoIdx} className="animate-[atofade_0.4s_ease]">
              <p className="eyebrow mb-4">
                FRAME {String(Math.min(ato.ate, 47)).padStart(2, "0")}/47
              </p>
              <h2 className="display text-5xl font-extrabold lg:text-6xl">
                {ato.titulo}
              </h2>
              <p className="mt-4 text-lg text-ash">{ato.linha}</p>
              {ultimo && (
                <Link
                  href={cta.href}
                  className="btn btn-blood mt-8"
                >
                  {cta.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------- mobile / reduced-motion: carrossel de 4 keyframes ------------- */

function CarrosselKeyframes({
  slug,
  atos,
  cta,
}: {
  slug: string;
  atos: Ato[];
  cta: { href: string; label: string };
}) {
  return (
    <section className="bg-void py-16">
      <div className="px-5">
        <p className="eyebrow mb-6">SEQUÊNCIA PULSE</p>
      </div>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">
        {KEYFRAMES.map((k, i) => (
          <figure key={k} className="w-[78vw] max-w-sm shrink-0 snap-center">
            <div className="relative aspect-[4/5] border border-steel">
              <Image
                src={src(slug, k)}
                alt={atos[i].titulo}
                fill
                className="object-cover"
                sizes="80vw"
              />
            </div>
            <figcaption className="mt-4">
              <h3 className="display text-2xl font-extrabold">{atos[i].titulo}</h3>
              <p className="mt-1 text-sm text-ash">{atos[i].linha}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="px-5 pt-4">
        <Link
          href={cta.href}
          className="btn btn-blood"
        >
          {cta.label}
        </Link>
      </div>
    </section>
  );
}
