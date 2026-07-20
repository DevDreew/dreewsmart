// ============================================================
// SEÇÃO 06 — PROTOCOLO
// 3 colunas. Número gigante em Archivo 800, cor --steel,
// ATRÁS do texto. Sequência real: 01→02→03.
// ============================================================

const PASSOS = [
  { n: "01", nome: "TREINE", linha: "Planilha com carga, série e descanso. Nada de treino de rede social." },
  { n: "02", nome: "SUPLEMENTE", linha: "Dose declarada no rótulo. Você sabe o que toma e quanto toma." },
  { n: "03", nome: "MEÇA", linha: "Reavaliação marcada. Número no papel. O espelho não é métrica." },
];

export default function ProtocoloHome() {
  return (
    <section className="bg-void py-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <h2 className="display text-3xl md:text-5xl">PROTOCOLO</h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PASSOS.map((p) => (
            <div
              key={p.n}
              className="relative overflow-hidden border border-steel p-8 pt-24"
            >
              <span
                aria-hidden
                className="display pointer-events-none absolute -top-6 left-3 select-none text-[7rem] font-extrabold text-steel/50 md:text-[9rem] lg:text-[10rem]"
              >
                {p.n}
              </span>
              <div className="relative">
                <h3 className="display text-2xl font-bold">{p.nome}</h3>
                <p className="mt-3 text-sm text-ash">{p.linha}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
