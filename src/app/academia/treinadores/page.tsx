import Voltar from "@/components/Voltar";
export const metadata = { title: "Treinadores — DREEWSMART" };

const TIME = [
  { nome: "EQUIPE FORÇA", foco: "Powerlifting e base de musculação", cref: "CREF ativo" },
  { nome: "EQUIPE LPO", foco: "Levantamento olímpico", cref: "CREF ativo" },
  { nome: "EQUIPE PROTOCOLO", foco: "Acompanhamento 1:1 do plano PROTOCOLO", cref: "CREF ativo" },
];

export default function Treinadores() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
      <Voltar atual="TREINADORES" />
      <p className="eyebrow mb-4">ACADEMIA / TREINADORES</p>
      <h1 className="display text-4xl font-extrabold md:text-6xl">
        CREF NA PAREDE. PLANILHA NA MÃO.
      </h1>
      <div className="mt-14 grid gap-px bg-steel md:grid-cols-3">
        {TIME.map((t) => (
          <div key={t.nome} className="bg-void p-8">
            <h2 className="display text-xl font-bold">{t.nome}</h2>
            <p className="mt-3 text-sm text-ash">{t.foco}</p>
            <p className="num mt-6 text-[11px] tracking-[0.14em] text-ash">{t.cref}</p>
          </div>
        ))}
      </div>
      {/* Fase 5: fichas individuais com foto e histórico */}
    </div>
  );
}
