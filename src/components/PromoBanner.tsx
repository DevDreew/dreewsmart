import Link from "next/link";
import { PLANOS } from "@/lib/planos";

// ============================================================
// BANNER DE PROMOÇÃO — meio da home (padrão Smart Fit).
// Mostra o plano mais barato, sempre calculado do dado real.
// ============================================================

export default function PromoBanner() {
  const maisBarato = [...PLANOS].sort((a, b) => a.preco - b.preco)[0];

  return (
    <section className="relative overflow-hidden border-y border-blood/40 bg-blood">
      {/* textura diagonal sutil */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #000 0 2px, transparent 2px 14px)",
        }}
      />
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-5 py-14 md:flex-row md:items-center md:px-10">
        <div>
          <p className="num text-[11px] tracking-[0.2em] text-bone/80">
            COMECE HOJE · {maisBarato.fidelidade}
          </p>
          <p className="display mt-2 text-4xl text-bone md:text-6xl">
            PLANO {maisBarato.nome} — R$ {maisBarato.precoPromo}
            <span className="text-xl text-bone/70"> no 1º mês</span>
          </p>
          <p className="mt-3 max-w-lg text-sm text-bone/80">
            Depois R$ {maisBarato.preco}/mês. Musculação 24h, avaliação de
            entrada e app de treino. Entra hoje, treina hoje.
          </p>
        </div>
        <Link
          href="/academia/matricula"
          className="num shrink-0 border-2 border-bone bg-void px-10 py-5 text-[13px] tracking-[0.16em] text-bone transition-colors hover:bg-bone hover:text-void"
        >
          MATRICULAR AGORA →
        </Link>
      </div>
    </section>
  );
}
