import Link from "next/link";
import { getProduto } from "@/lib/catalog";

// ============================================================
// SEÇÃO 05 — RÓTULO ABERTO
// ÚNICO bloco claro do site. De propósito — o assunto é transparência.
// ============================================================

export default function RotuloHome() {
  const mono = getProduto("mono-creatina")!;
  return (
    <section className="bg-bone text-void">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-10 lg:grid-cols-2">
        <div>
          <p className="num mb-4 text-[11px] tracking-[0.14em] text-void/50">
            RÓTULO ABERTO
          </p>
          <h2 className="display text-3xl md:text-5xl">
            CREATINA SEM SEGREDO.
          </h2>
          <p className="mt-6 max-w-lg text-lg text-void/70">
            5g de creatina monoidratada pura por dose. Sem carboidrato
            escondido, sem corante, sem blend pra disfarçar dose menor. O que
            está no pote é o que está no rótulo.
          </p>
          <Link
            href="/rotulo-aberto"
            className="num mt-8 inline-block border border-void px-7 py-3.5 text-[11px] tracking-[0.14em] transition-colors hover:bg-void hover:text-bone"
          >
            LER A POLÍTICA DE RÓTULO
          </Link>
        </div>

        {/* tabela monoespaçada real à direita */}
        <div>
          <p className="num mb-4 text-[11px] tracking-[0.14em] text-void/50">
            MONO · CREATINA · POR DOSE (5G)
          </p>
          <div className="border border-void/20">
            {mono.tabelaDose!.map((d) => (
              <div
                key={d.composto}
                className="num flex items-center justify-between border-b border-void/20 px-6 py-4 text-sm last:border-b-0"
              >
                <span className="text-void/60">{d.composto}</span>
                <span className="font-medium">{d.dose}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
