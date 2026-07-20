import CarrinhoView from "@/components/CarrinhoView";
import Voltar from "@/components/Voltar";

export const metadata = { title: "Carrinho — DREEWSMART" };

export default function Carrinho() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
      <Voltar atual="CARRINHO" />
      <p className="eyebrow mb-4">CARRINHO</p>
      <h1 className="display text-4xl font-extrabold md:text-6xl">SEU PEDIDO.</h1>
      <CarrinhoView />
    </div>
  );
}
