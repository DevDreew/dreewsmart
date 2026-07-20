"use client";

import { useState } from "react";
import { CATALOGO, CATEGORIAS, type Categoria } from "@/lib/catalog";
import ProdutoCard from "./ProdutoCard";

// ============================================================
// LOJA — filtro por pills, sem reload. Estado local, zero rota.
// (Densidade do grid: ref 07 — estrutura sim, estética não.)
// ============================================================

type Filtro = "todos" | Categoria;

export default function LojaView() {
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const produtos =
    filtro === "todos"
      ? CATALOGO
      : CATALOGO.filter((p) => p.categoria === filtro);

  const pill = (ativo: boolean) =>
    `num border px-5 py-2.5 text-[11px] tracking-[0.14em] transition-colors ${
      ativo
        ? "border-blood bg-blood/10 text-bone"
        : "border-steel text-ash hover:text-bone"
    }`;

  return (
    <>
      <div className="mt-10 flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por categoria">
        <button
          type="button"
          className={pill(filtro === "todos")}
          onClick={() => setFiltro("todos")}
          aria-pressed={filtro === "todos"}
        >
          TODOS
        </button>
        {CATEGORIAS.map((c) => (
          <button
            key={c.slug}
            type="button"
            className={pill(filtro === c.slug)}
            onClick={() => setFiltro(c.slug)}
            aria-pressed={filtro === c.slug}
          >
            {c.nome}
          </button>
        ))}
        <span className="num ml-auto hidden text-[11px] tracking-[0.14em] text-ash sm:block">
          {produtos.length.toString().padStart(2, "0")}{" "}
          {produtos.length === 1 ? "PRODUTO" : "PRODUTOS"}
        </span>
      </div>

      {produtos.length === 0 ? (
        <div className="mt-10 max-w-xl border border-steel p-10">
          <p className="text-sm text-ash">
            Linha em produção. Sem previsão inflada.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-px bg-steel md:grid-cols-3 lg:grid-cols-5">
          {produtos.map((p) => (
            <ProdutoCard key={p.slug} produto={p} />
          ))}
        </div>
      )}
    </>
  );
}
