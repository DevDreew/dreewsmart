import { notFound } from "next/navigation";
import Link from "next/link";
import { CATALOGO, getProduto, formatBRL } from "@/lib/catalog";
import Voltar from "@/components/Voltar";
import PdpP1 from "@/components/PdpP1";
import Cinematica from "@/components/Cinematica";
import ProdutoCard from "@/components/ProdutoCard";

// ============================================================
// TEMPLATE /produto/[slug] — generateStaticParams
// P1 viewer + compra sticky · P2 cinemática (mesmo scrub da home)
// P3 tabela de dose · P4 como usar · P5 prova técnica · P6 cross-sell
// ============================================================

export function generateStaticParams() {
  return CATALOGO.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const produto = getProduto(slug);
  return {
    title: produto ? `${produto.nome} — DREEWSMART` : "DREEWSMART",
    description: produto?.linha,
  };
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const produto = getProduto(slug);
  if (!produto) notFound();

  const crossSell = CATALOGO.filter((p) => p.slug !== produto.slug).slice(0, 3);

  return (
    <div className="pb-24">
      {/* P1 — viewer + painel de compra */}
      <div className="mx-auto max-w-[1440px] px-5 pt-16 md:px-10">
        <PdpP1 produto={produto} />
      </div>

      {/* P2 — sequência cinemática (só quando os frames do produto existem) */}
      {produto.cinematica && (
        <div className="mt-16">
          <Cinematica
            slug={produto.slug}
            cta={{ href: "/rotulo-aberto", label: "VER O RÓTULO ABERTO" }}
          />
        </div>
      )}

      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        {/* P3 — tabela de dose monoespaçada. Sem gráfico. Sem ícone. */}
        {produto.tabelaDose && (
          <section className="mt-24">
            <p className="eyebrow mb-6">DOSE POR PORÇÃO</p>
            <div className="max-w-2xl border border-steel">
              {produto.tabelaDose.map((d) => (
                <div
                  key={d.composto}
                  className="num flex items-center justify-between border-b border-steel px-6 py-4 text-sm last:border-b-0"
                >
                  <span className="text-ash">{d.composto}</span>
                  <span>{d.dose}</span>
                </div>
              ))}
            </div>
            <Link
              href="/rotulo-aberto"
              className="num mt-6 inline-block text-[11px] tracking-[0.14em] text-ash hover:text-bone"
            >
              POR QUE A GENTE ABRE O RÓTULO →
            </Link>
          </section>
        )}

        {/* P4 — como usar. 3 passos, texto seco. */}
        {produto.comoUsar && (
          <section className="mt-24">
            <p className="eyebrow mb-6">COMO USAR</p>
            <div className="grid gap-px bg-steel md:grid-cols-3">
              {produto.comoUsar.map((passo, i) => (
                <div key={passo} className="bg-void p-8">
                  <span className="num text-sm text-steel">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-sm text-bone">{passo}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* P5 — prova técnica: laudo, lote, origem */}
        {produto.provaTecnica && (
          <section className="mt-24">
            <p className="eyebrow mb-6">PROVA TÉCNICA</p>
            <div className="grid gap-px bg-steel md:grid-cols-3">
              {(["laudo", "lote", "origem"] as const).map((k) => (
                <div key={k} className="bg-void p-8">
                  <p className="num text-[11px] tracking-[0.14em] text-ash">
                    {k.toUpperCase()}
                  </p>
                  <p className="mt-3 text-sm text-bone">
                    {produto.provaTecnica![k]}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* P6 — cross-sell: 3 produtos, mesmo card do catálogo */}
        <section className="mt-24">
          <p className="eyebrow mb-6">COMPLETA O PROTOCOLO</p>
          <div className="grid grid-cols-1 gap-px bg-steel sm:grid-cols-3">
            {crossSell.map((p) => (
              <ProdutoCard key={p.slug} produto={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
