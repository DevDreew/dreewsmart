import { PLANOS } from "@/lib/planos";
import PlanoCard from "./PlanoCard";

// ============================================================
// SEÇÃO 07 — PLANOS (modelo Smart Fit: de/por, OFF, checklist)
// ============================================================

export default function PlanosHome() {
  return (
    <section className="bg-void py-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <h2 className="display text-3xl md:text-5xl">PLANOS</h2>
        <p className="mt-4 max-w-xl text-ash">
          Preço do 1º mês promocional. O que não está incluso aparece riscado
          — sem surpresa depois.
        </p>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANOS.map((p) => (
            <PlanoCard key={p.id} plano={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
