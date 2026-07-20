import Link from "next/link";
import Voltar from "@/components/Voltar";
import { MODALIDADES } from "@/lib/academia";
import Reveal from "@/components/Reveal";

export const metadata = { title: "Modalidades — DREEWSMART" };

const NIVEL_COR: Record<string, string> = {
  BASE: "text-ash",
  FORTE: "text-bone",
  MÁXIMA: "text-blood",
};

export default function Modalidades() {
  return (
    <div>
      {/* HERO da página (padrão Smart Fit: banner + frase + CTA) */}
      <section className="border-b border-steel bg-void">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
      <Voltar atual="MODALIDADES" />
          <p className="eyebrow mb-4">ACADEMIA / MODALIDADES</p>
          <h1 className="display max-w-4xl text-4xl md:text-7xl">
            É PRA LEVANTAR. É PRA SUAR. É DREEWSMART.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ash">
            Seis frentes de treino sob o mesmo teto. Cada uma com espaço e
            equipamento dedicado — força primeiro, o resto orbita.
          </p>
          <Link href="/academia/matricula" className="btn btn-blood mt-10 inline-flex">
            ESCOLHER MEU PLANO
          </Link>
        </div>
      </section>

      {/* GRADE de modalidades — cards com Duração · Intensidade · Foco */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-px bg-steel sm:grid-cols-2 lg:grid-cols-3">
          {MODALIDADES.map((m, i) => (
            <Reveal key={m.slug} delay={(i % 3) * 80}>
              <article className="group relative flex h-full flex-col justify-between gap-8 bg-carbon p-8 transition-colors duration-300 hover:bg-[#141418]">
                <div className="flex items-start justify-between">
                  <span className="num text-sm text-steel">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`num text-[11px] tracking-[0.14em] ${NIVEL_COR[m.intensidade]}`}>
                    {m.intensidade}
                  </span>
                </div>

                <div>
                  <h2 className="display text-2xl tracking-tight">{m.nome}</h2>
                  <p className="mt-1 text-sm text-blood">{m.linha}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ash">{m.descricao}</p>
                </div>

                {/* metadados estilo Smart Fit: Duração + Foco */}
                <div className="grid grid-cols-2 gap-px border-t border-steel bg-steel">
                  <div className="bg-carbon pt-4">
                    <p className="num text-[10px] tracking-[0.12em] text-steel">DURAÇÃO</p>
                    <p className="num mt-1 text-sm text-bone">{m.duracao}</p>
                  </div>
                  <div className="bg-carbon pt-4 pl-4">
                    <p className="num text-[10px] tracking-[0.12em] text-steel">FOCO</p>
                    <p className="num mt-1 text-sm text-bone">{m.foco}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA recorrente de plano (padrão Smart Fit) */}
      <section className="border-t border-steel bg-carbon">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-5 py-16 md:flex-row md:items-center md:px-10">
          <div>
            <p className="eyebrow mb-3">PLANOS A PARTIR DE</p>
            <p className="display text-4xl md:text-6xl">
              R$ 129<span className="text-ash text-2xl">/mês</span>
            </p>
            <p className="mt-3 text-sm text-ash">Sem fidelidade no BASE. Treino sério desde o primeiro dia.</p>
          </div>
          <Link href="/academia/planos" className="btn btn-blood shrink-0">
            VER PLANOS
          </Link>
        </div>
      </section>
    </div>
  );
}
