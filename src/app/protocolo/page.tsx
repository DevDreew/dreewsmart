import Voltar from "@/components/Voltar";
export const metadata = { title: "Protocolo — DREEWSMART" };

const PASSOS = [
  { n: "01", nome: "TREINE", linha: "Planilha com carga, série e descanso. Nada de treino de rede social." },
  { n: "02", nome: "SUPLEMENTE", linha: "Dose declarada no rótulo. Você sabe o que toma e quanto toma." },
  { n: "03", nome: "MEÇA", linha: "Reavaliação marcada. Número no papel. O espelho não é métrica." },
];

export default function Protocolo() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
      <Voltar atual="PROTOCOLO" />
      <h1 className="display text-4xl md:text-6xl">PROTOCOLO</h1>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {PASSOS.map((p) => (
          <div key={p.n} className="relative overflow-hidden border border-steel p-8 pt-20">
            {/* Número gigante ATRÁS do texto — Archivo 800, cor steel */}
            <span
              aria-hidden
              className="display pointer-events-none absolute -top-6 left-4 text-[9rem] font-extrabold text-steel/60"
            >
              {p.n}
            </span>
            <div className="relative">
              <h2 className="display text-2xl font-bold">{p.nome}</h2>
              <p className="mt-3 text-sm text-ash">{p.linha}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
