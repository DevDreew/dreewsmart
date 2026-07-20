import { CATALOGO } from "@/lib/catalog";
import ProdutoCard from "./ProdutoCard";

// ============================================================
// SEÇÃO 04 — CATÁLOGO
// Fundo --carbon. Grid 5col / 2col tablet / scroll-x mobile.
// Home mostra um recorte; loja mostra tudo. Produtos com render
// real (helix, mono) vêm primeiro para a home não liderar com placeholder.
// ============================================================

const COM_RENDER = ["helix-garrafa", "mono-creatina"];
const DESTAQUE = [
  ...CATALOGO.filter((p) => COM_RENDER.includes(p.slug)),
  ...CATALOGO.filter((p) => !COM_RENDER.includes(p.slug)),
].slice(0, 5);

export default function CatalogoHome() {
  return (
    <section className="bg-carbon py-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <h2 className="display text-3xl md:text-5xl">CATÁLOGO</h2>
      </div>

      {/* mobile: scroll-x · tablet: 2col · desktop: 5col */}
      <div className="mt-12 px-5 md:mx-auto md:max-w-[1440px] md:px-10">
        <div className="flex snap-x snap-mandatory gap-px overflow-x-auto bg-steel md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-5">
          {DESTAQUE.map((p) => (
            <div key={p.slug} className="w-[64vw] shrink-0 snap-start md:w-auto">
              <ProdutoCard produto={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
