import Link from "next/link";
import { getPorCategoria } from "@/lib/catalog";
import ProdutoCard from "@/components/ProdutoCard";

export const metadata = { title: "PRÉ-TREINO — DREEWSMART" };

export default function Categoria() {
  const produtos = getPorCategoria("pre-treino");
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
      <p className="eyebrow mb-4">LOJA / PRÉ-TREINO</p>
      <h1 className="display text-4xl font-extrabold md:text-6xl">PRÉ-TREINO</h1>
      {produtos.length === 0 ? (
        <div className="mt-14 border border-steel p-10">
          <p className="text-sm text-ash">Linha em produção. Sem previsão inflada.</p>
          <Link href="/loja" className="num mt-6 inline-block border border-steel px-6 py-3 text-[11px] tracking-[0.14em] text-bone hover:border-blood">
            VER CATÁLOGO COMPLETO
          </Link>
        </div>
      ) : (
        <div className="mt-14 grid grid-cols-2 gap-px bg-steel md:grid-cols-3 lg:grid-cols-5">
          {produtos.map((p) => (
            <ProdutoCard key={p.slug} produto={p} />
          ))}
        </div>
      )}
    </div>
  );
}
