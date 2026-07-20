import Voltar from "@/components/Voltar";
import LojaView from "@/components/LojaView";

export const metadata = { title: "Loja — DREEWSMART" };

export default function Loja() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
      <Voltar atual="LOJA" />
      <p className="eyebrow mb-4">LOJA</p>
      <h1 className="display text-4xl font-extrabold md:text-6xl">
        5 PRODUTOS. DOSE ABERTA.
      </h1>
      <LojaView />
    </div>
  );
}
