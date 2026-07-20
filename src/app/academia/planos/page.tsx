import { PLANOS } from "@/lib/planos";
import PlanoCard from "@/components/PlanoCard";
import Voltar from "@/components/Voltar";

export const metadata = { title: "Planos — DREEWSMART" };

export default function Planos() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
      <Voltar atual="PLANOS" />
      <p className="eyebrow mb-4">ACADEMIA / PLANOS</p>
      <h1 className="display text-4xl md:text-6xl">PLANOS</h1>
      <p className="mt-4 max-w-xl text-ash">
        Preço do 1º mês promocional. O que não está incluso aparece riscado —
        você compara os três de olho fechado.
      </p>
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {PLANOS.map((p) => (
          <PlanoCard key={p.id} plano={p} />
        ))}
      </div>
      <p className="num mt-10 text-[10px] tracking-[0.12em] text-steel">
        * VALORES PROMOCIONAIS DE EXEMPLO. CONSULTE CONDIÇÕES NA RECEPÇÃO.
      </p>
    </div>
  );
}
