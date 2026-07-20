"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { type Produto, formatBRL, type Hotspot } from "@/lib/catalog";
import { useCart } from "@/lib/store";
import { useWebGLGate } from "@/lib/use-webgl-gate";

const SceneShell = dynamic(() => import("@/components/three/SceneShell"), {
  ssr: false,
});

// ============================================================
// PDP — BLOCO P1
// Viewer WebGL (esq 60%) + painel de compra sticky (dir 40%).
// Poster estático em toda entrada — o canvas nunca é o 1º pixel.
// Mobile: ZERO WebGL, poster apenas.
//
// HOTSPOTS: ponto 6px --blood, anel pulsante 1.5s, MÁXIMO 3.
// Clique abre PAINEL LATERAL, não modal — modal em 3D quebra
// o contexto espacial.
//
// TROCA DE SABOR: cross-fade de cor 300ms no material.
// Sem movimento de câmera. Sem reload.
// ============================================================

export default function PdpP1({ produto }: { produto: Produto }) {
  const { ref, pode3D, ativo } = useWebGLGate<HTMLDivElement>();
  const add = useCart((s) => s.add);

  const [sabor, setSabor] = useState(produto.sabores?.[0]);
  const [hotspotAberto, setHotspotAberto] = useState<Hotspot | null>(null);

  // cor alvo mutável — a cena faz o lerp de ~300ms sem re-render
  const corAlvoRef = useRef(
    (sabor && produto.saborCores?.[sabor]) || produto.cor3d
  );
  useEffect(() => {
    corAlvoRef.current =
      (sabor && produto.saborCores?.[sabor]) || produto.cor3d;
  }, [sabor, produto]);

  // ESC fecha o painel do hotspot
  useEffect(() => {
    if (!hotspotAberto) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setHotspotAberto(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hotspotAberto]);

  const hotspots = (produto.hotspots ?? []).slice(0, 3); // teto de 3

  return (
    <div className="grid gap-10 lg:grid-cols-5">
      {/* -------- viewer (60%) -------- */}
      <div className="lg:col-span-3">
        <div
          ref={ref}
          className="relative aspect-square overflow-hidden border border-steel bg-carbon"
        >
          {/* poster: primeiro pixel, sempre */}
          <Image
            src={`/posters/${produto.slug}.webp`}
            alt={produto.nome}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />

          {pode3D && (
            <div className="absolute inset-0">
              <SceneShell
                ativo={ativo}
                primitiva={produto.primitiva}
                cor={corAlvoRef.current}
                corAlvoRef={corAlvoRef}
              />
            </div>
          )}

          {/* hotspots — sobre poster e canvas */}
          {hotspots.map((h) => (
            <button
              key={h.titulo}
              type="button"
              onClick={() => setHotspotAberto(h)}
              className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              aria-label={`Detalhe: ${h.titulo}`}
            >
              <span className="relative block h-[6px] w-[6px] rounded-full bg-blood">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-blood motion-safe:animate-[hotspot-pulse_1.5s_ease-out_infinite]"
                />
              </span>
            </button>
          ))}

          {pode3D && (
            <span className="num pointer-events-none absolute bottom-4 right-4 text-[11px] tracking-[0.14em] text-ash">
              ↻ ARRASTE PARA GIRAR
            </span>
          )}
        </div>
      </div>

      {/* -------- painel de compra sticky (40%) -------- */}
      <aside className="lg:col-span-2">
        <div className="lg:sticky lg:top-24">
          <p className="eyebrow mb-3">{produto.categoria.toUpperCase()}</p>
          <h1 className="display text-5xl font-extrabold">{produto.nome}</h1>
          <p className="mt-3 text-ash">{produto.linha}</p>
          <p className="num mt-6 text-3xl">{formatBRL(produto.preco)}</p>
          {produto.doses && (
            <p className="num mt-2 text-sm text-ash">
              {produto.doses} doses · {produto.peso}
            </p>
          )}

          {produto.sabores && produto.sabores.length > 1 && (
            <div className="mt-8">
              <p className="eyebrow mb-3">{produto.varianteLabel ?? "SABOR"}</p>
              <div className="flex gap-2">
                {produto.sabores.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSabor(s)}
                    className={`num border px-4 py-2 text-[11px] tracking-[0.14em] transition-colors ${
                      sabor === s
                        ? "border-blood text-bone"
                        : "border-steel text-ash hover:text-bone"
                    }`}
                    aria-pressed={sabor === s}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() =>
              add({
                slug: produto.slug,
                nome: produto.nome,
                preco: produto.preco,
                sabor,
              })
            }
            className="num mt-8 w-full bg-blood py-4 text-[12px] tracking-[0.14em] text-bone transition-colors hover:bg-blood-dim"
          >
            ADICIONAR AO CARRINHO
          </button>
          <p className="num mt-3 text-center text-[10px] tracking-[0.14em] text-ash">
            ESTOQUE PRÓPRIO · ENVIO EM 24H ÚTEIS
          </p>
        </div>
      </aside>

      {/* -------- painel lateral do hotspot -------- */}
      <div
        className={`fixed inset-0 z-50 bg-void/70 transition-opacity duration-300 ${
          hotspotAberto ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setHotspotAberto(null)}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col border-l border-steel bg-carbon transition-transform duration-300 ${
          hotspotAberto ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={hotspotAberto?.titulo ?? "Detalhe do produto"}
      >
        {hotspotAberto && (
          <>
            <div className="flex items-center justify-between border-b border-steel px-6 py-5">
              <p className="eyebrow">DETALHE</p>
              <button
                type="button"
                onClick={() => setHotspotAberto(null)}
                className="num text-[11px] tracking-[0.14em] text-ash hover:text-bone"
              >
                FECHAR ✕
              </button>
            </div>
            <div className="px-6 py-8">
              <span className="relative mb-6 block h-[6px] w-[6px] rounded-full bg-blood" />
              <h3 className="display text-2xl font-bold">
                {hotspotAberto.titulo}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ash">
                {hotspotAberto.texto}
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
