import Link from "next/link";
import Voltar from "@/components/Voltar";
import { UNIDADE } from "@/lib/academia";
import ComoChegar from "@/components/ComoChegar";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";

export const metadata = { title: "Academia — DREEWSMART" };

const BLOCOS = [
  { href: "/academia/estrutura", nome: "ESTRUTURA", linha: "1.400m². Barra olímpica em toda estação." },
  { href: "/academia/planos", nome: "PLANOS", linha: "3 planos. 4 itens cada. Sem letra miúda." },
  { href: "/academia/modalidades", nome: "MODALIDADES", linha: "Força primeiro. O resto orbita." },
  { href: "/academia/treinadores", nome: "TREINADORES", linha: "CREF na parede. Planilha na mão." },
  { href: "/academia/matricula", nome: "MATRÍCULA", linha: "Entra hoje. Treina hoje." },
];

export default function Academia() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
      <Voltar atual="ACADEMIA" />
      <p className="eyebrow mb-4">BARUERI · 1.400M² · 24H</p>
      <h1 className="display text-4xl md:text-6xl">TREINE AQUI.</h1>

      {/* NÚMEROS DA UNIDADE — prova concreta, estilo Smart Fit mas seco */}
      <div className="mt-12 grid grid-cols-2 gap-px border border-steel bg-steel lg:grid-cols-4">
        {UNIDADE.numeros.map((n) => (
          <div key={n.label} className="bg-carbon p-6 md:p-8">
            <p className="display text-4xl md:text-5xl">
              {n.valor}
              <span className="text-blood">{n.unidade}</span>
            </p>
            <p className="num mt-2 text-[11px] tracking-[0.14em] text-ash">
              {n.label.toUpperCase()}
            </p>
          </div>
        ))}
      </div>

      {/* BLOCOS DE NAVEGAÇÃO */}
      <div className="mt-16 grid gap-px bg-steel md:grid-cols-2 lg:grid-cols-3">
        {BLOCOS.map((b) => (
          <Link
            key={b.href}
            href={b.href}
            className="group relative overflow-hidden bg-void p-8 transition-colors hover:bg-carbon"
          >
            <h2 className="display text-xl group-hover:text-blood">{b.nome}</h2>
            <p className="mt-3 text-sm text-ash">{b.linha}</p>
            <span
              aria-hidden
              className="mt-6 flex items-center gap-2 text-[11px] tracking-[0.16em] text-blood opacity-0 transition-opacity num group-hover:opacity-100"
            >
              ABRIR →
            </span>
          </Link>
        ))}
      </div>

      {/* COMO CHEGAR */}
      <section className="mt-24">
        <Reveal>
          <p className="eyebrow mb-4">COMO CHEGAR</p>
          <h2 className="display mb-10 text-3xl md:text-5xl">SEM DESCULPA DE DISTÂNCIA.</h2>
          <ComoChegar />
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mt-24">
        <Reveal>
          <p className="eyebrow mb-4">DÚVIDAS FREQUENTES</p>
          <h2 className="display mb-10 text-3xl md:text-5xl">ANTES DE PERGUNTAR.</h2>
          <FAQ />
        </Reveal>
      </section>
    </div>
  );
}
