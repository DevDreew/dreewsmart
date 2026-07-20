"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProduto, formatBRL } from "@/lib/catalog";
import { NOVOS, MAIS_VENDIDOS, FEEDBACKS } from "@/lib/vitrine";
import ProdutoCard from "./ProdutoCard";

// ============================================================
// VITRINE DA HOME — foco no PRODUTO.
// Abas Novos / Mais vendidos. Um herói grande à esquerda +
// grade à direita. Feedback vira faixa embaixo, discreta,
// sem competir com o produto. Responsivo.
// ============================================================

function Estrelas({ n }: { n: number }) {
  return (
    <span className="num text-[11px] tracking-[0.1em] text-blood" aria-label={`${n} de 5`}>
      {"★".repeat(n)}
      <span className="text-steel">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export default function Vitrine() {
  const [aba, setAba] = useState<"novos" | "vendidos">("novos");
  const slugs = aba === "novos" ? NOVOS : MAIS_VENDIDOS;
  const produtos = slugs.map(getProduto).filter(Boolean).slice(0, 5);
  const heroi = produtos[0]!;
  const resto = produtos.slice(1, 5);

  return (
    <section className="bg-carbon py-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        {/* cabeçalho + abas */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3">EM DESTAQUE</p>
            <h2 className="display text-3xl md:text-5xl">
              {aba === "novos" ? "PRODUTOS NOVOS" : "MAIS VENDIDOS"}
            </h2>
          </div>
          <div className="flex gap-2" role="tablist" aria-label="Filtrar destaques">
            <button
              type="button" role="tab" aria-selected={aba === "novos"}
              onClick={() => setAba("novos")}
              className={`num px-5 py-2.5 text-[11px] tracking-[0.14em] transition-colors ${
                aba === "novos" ? "bg-blood text-bone" : "border border-steel text-ash hover:border-blood"
              }`}
            >NOVOS</button>
            <button
              type="button" role="tab" aria-selected={aba === "vendidos"}
              onClick={() => setAba("vendidos")}
              className={`num px-5 py-2.5 text-[11px] tracking-[0.14em] transition-colors ${
                aba === "vendidos" ? "bg-blood text-bone" : "border border-steel text-ash hover:border-blood"
              }`}
            >MAIS VENDIDOS</button>
          </div>
        </div>

        {/* HERÓI + GRADE — só produto */}
        <div className="mt-12 grid gap-px bg-steel lg:grid-cols-2">
          {/* herói grande à esquerda */}
          <Link
            href={`/produto/${heroi.slug}`}
            className="group relative flex min-h-[440px] flex-col justify-end overflow-hidden bg-void p-8 lg:min-h-[560px]"
          >
            <span aria-hidden className="absolute inset-0 z-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="h-3/4 w-3/4 rounded-full bg-blood/25 blur-[90px]" />
            </span>
            <Image
              src={`/posters/${heroi.slug}.webp`}
              alt={heroi.nome}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="relative z-[1] object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
            />
            <span aria-hidden className="absolute inset-0 z-[2] bg-gradient-to-t from-void via-void/30 to-transparent" />
            <div className="relative z-10">
              <span className="num text-[11px] tracking-[0.16em] text-blood">
                {aba === "novos" ? "NOVO" : "MAIS VENDIDO"}
              </span>
              <h3 className="display mt-2 text-3xl md:text-4xl">{heroi.nome}</h3>
              <p className="mt-2 max-w-md text-sm text-ash">{heroi.linha}</p>
              <div className="mt-4 flex items-center gap-4">
                <span className="num text-xl text-bone">{formatBRL(heroi.preco)}</span>
                <span className="num flex items-center gap-2 text-[11px] tracking-[0.16em] text-blood opacity-0 transition-opacity group-hover:opacity-100">
                  VER PRODUTO →
                </span>
              </div>
            </div>
          </Link>

          {/* grade 2x2 à direita */}
          <div className="grid grid-cols-2 gap-px bg-steel">
            {resto.map((p) => (
              <ProdutoCard key={p!.slug} produto={p!} />
            ))}
          </div>
        </div>

        {/* CTA loja */}
        <div className="mt-12 flex justify-center">
          <Link href="/loja" className="btn btn-ghost">VER CATÁLOGO COMPLETO</Link>
        </div>

        {/* FAIXA DE PROVA SOCIAL — discreta, embaixo, não compete */}
        <div className="mt-16 border-t border-steel pt-10">
          <p className="eyebrow mb-6">QUEM COMPROU</p>
          <div className="grid gap-px bg-steel sm:grid-cols-2 lg:grid-cols-4">
            {FEEDBACKS.map((f) => (
              <figure key={f.nome} className="bg-carbon p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="num flex h-8 w-8 items-center justify-center rounded-full bg-blood/15 text-xs text-blood">{f.inicial}</span>
                    <figcaption className="text-sm text-bone">{f.nome}</figcaption>
                  </div>
                  <Estrelas n={f.nota} />
                </div>
                <blockquote className="mt-3 text-xs leading-relaxed text-ash">“{f.texto}”</blockquote>
                <p className="num mt-2 text-[10px] tracking-[0.1em] text-steel">{f.produto}</p>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
