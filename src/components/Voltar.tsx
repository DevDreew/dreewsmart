"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

// ============================================================
// VOLTAR — trilha de retorno nas páginas internas.
// "← Voltar" usa o histórico; "Início" é o porto seguro.
// O cliente nunca fica sem saída (pedido do prompt: retorno claro).
// ============================================================

export default function Voltar({ atual }: { atual: string }) {
  const router = useRouter();
  return (
    <nav aria-label="Caminho de navegação" className="mb-8 flex items-center gap-3">
      <button
        type="button"
        onClick={() => router.back()}
        className="num flex items-center gap-2 text-[11px] tracking-[0.14em] text-ash transition-colors hover:text-blood"
      >
        <span aria-hidden>←</span> VOLTAR
      </button>
      <span aria-hidden className="text-steel">·</span>
      <Link
        href="/"
        className="num text-[11px] tracking-[0.14em] text-ash transition-colors hover:text-blood"
      >
        INÍCIO
      </Link>
      <span aria-hidden className="text-steel">/</span>
      <span className="num text-[11px] tracking-[0.14em] text-bone">{atual}</span>
    </nav>
  );
}
