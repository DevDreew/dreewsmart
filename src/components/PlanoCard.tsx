import Link from "next/link";
import { type Plano } from "@/lib/planos";

// ============================================================
// CARD DE PLANO — padrão Smart Fit adaptado ao DreewSmart.
// Selo, preço de/por com % OFF, "no 1º mês", fidelidade,
// CTA e checklist unificada (riscado = não incluso).
// ============================================================

export default function PlanoCard({ plano }: { plano: Plano }) {
  return (
    <div
      className={`relative flex h-full flex-col bg-carbon p-8 ${
        plano.destaque
          ? "border-2 border-blood shadow-[0_0_48px_rgba(255,15,0,0.12)]"
          : "border border-steel"
      }`}
    >
      {plano.selo && (
        <span className="num absolute -top-3 left-8 bg-blood px-3 py-1 text-[10px] tracking-[0.14em] text-bone">
          {plano.selo}
        </span>
      )}

      <h3 className="display text-2xl">{plano.nome}</h3>
      <p className="mt-2 min-h-10 text-sm text-ash">{plano.tagline}</p>

      {/* preço de/por — padrão Smart Fit */}
      <div className="mt-6">
        <p className="num text-[10px] tracking-[0.14em] text-ash">A PARTIR DE</p>
        <p className="num mt-1 text-sm text-steel line-through">
          R$ {plano.preco},00
        </p>
        <p className="display mt-0.5 text-4xl">
          R$ {plano.precoPromo}
          <span className="num ml-2 align-middle text-[12px] tracking-[0.1em] text-blood">
            {plano.off}% OFF
          </span>
        </p>
        <p className="num mt-1 text-[11px] text-ash">
          <span className="text-bone">no 1º mês</span>, depois R$ {plano.preco}/mês
        </p>
      </div>

      <p className="num mt-4 border-t border-steel pt-4 text-[10px] tracking-[0.14em] text-ash">
        {plano.fidelidade}
      </p>

      <Link
        href={`/academia/matricula?plano=${plano.id}`}
        className={`num mt-6 flex items-center justify-center gap-3 py-5 text-[13px] tracking-[0.16em] transition-all duration-300 ${
          plano.destaque
            ? "bg-blood text-bone hover:bg-blood-dim hover:shadow-[0_8px_32px_rgba(255,15,0,0.25)]"
            : "border border-steel text-bone hover:border-blood hover:bg-blood/10"
        }`}
      >
        MATRICULAR <span aria-hidden>→</span>
      </Link>

      {/* checklist unificada — riscado quando não incluso */}
      <ul className="mt-8 space-y-3">
        {plano.beneficios.map((b) => (
          <li key={b.label} className="flex items-start gap-3 text-sm">
            <span
              aria-hidden
              className={`num mt-0.5 text-[13px] ${b.incluso ? "text-blood" : "text-steel"}`}
            >
              {b.incluso ? "✓" : "✕"}
            </span>
            <span className={b.incluso ? "text-bone" : "text-steel line-through"}>
              {b.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
