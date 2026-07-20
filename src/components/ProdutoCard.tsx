"use client";

import Image from "next/image";
import Link from "next/link";
import { type Produto, formatBRL } from "@/lib/catalog";

// ============================================================
// CARD DO CATÁLOGO — nível premium.
// Repouso: sóbrio. Hover: o card ACORDA — poster ganha vida
// (scale sutil + brilho), moldura vermelha acende, preço sobe,
// selo de categoria aparece, linha corre na base.
// Tudo em GPU (transform/opacity), sem reflow.
// ============================================================

const CAT_LABEL: Record<string, string> = {
  "pre-treino": "PRÉ-TREINO",
  proteina: "PROTEÍNA",
  creatina: "CREATINA",
  acessorios: "ACESSÓRIO",
  vestuario: "VESTUÁRIO",
};

export default function ProdutoCard({ produto }: { produto: Produto }) {
  return (
    <Link
      href={`/produto/${produto.slug}`}
      className="group relative flex flex-col overflow-hidden bg-carbon transition-colors duration-300 hover:bg-[#121215]"
    >
      {/* moldura vermelha que acende no hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 border border-transparent transition-colors duration-300 group-hover:border-blood/40"
      />

      <div className="relative aspect-[4/5] overflow-hidden">
        {/* halo por trás do produto */}
        <span
          aria-hidden
          className="absolute inset-0 z-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        >
          <span className="h-3/4 w-3/4 rounded-full bg-blood/20 blur-[70px]" />
        </span>

        <Image
          src={`/posters/${produto.slug}.webp`}
          alt={produto.nome}
          fill
          sizes="(max-width: 768px) 60vw, 22vw"
          className="relative z-10 object-cover transition-transform duration-[900ms] ease-out will-change-transform group-hover:scale-[1.06]"
        />

        {/* selo de categoria — entra no hover */}
        <span className="num absolute left-3 top-3 z-20 translate-y-[-6px] bg-void/80 px-2.5 py-1 text-[10px] tracking-[0.14em] text-ash opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {CAT_LABEL[produto.categoria] ?? produto.categoria.toUpperCase()}
        </span>

        {/* gradiente inferior para o texto respirar sobre o poster */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-carbon to-transparent"
        />
      </div>

      <div className="relative z-10 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="display text-lg tracking-tight">{produto.nome}</h3>
          <p className="num shrink-0 text-sm text-bone transition-transform duration-300 group-hover:-translate-y-0.5">
            {formatBRL(produto.preco)}
          </p>
        </div>
        <p className="mt-1.5 line-clamp-1 text-xs text-ash">{produto.linha}</p>

        {/* CTA fantasma que aparece no hover */}
        <span className="num mt-3 flex items-center gap-2 text-[11px] tracking-[0.16em] text-blood opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          VER PRODUTO <span aria-hidden>→</span>
        </span>
      </div>

      {/* linha vermelha de 1px que corre na base */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-20 h-px origin-left scale-x-0 bg-blood transition-transform duration-500 group-hover:scale-x-100"
      />
    </Link>
  );
}
