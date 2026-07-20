import CheckoutView from "@/components/CheckoutView";
import Voltar from "@/components/Voltar";

export const metadata = { title: "Checkout — DREEWSMART" };

export default function Checkout() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
      <Voltar atual="CHECKOUT" />
      <p className="eyebrow mb-4">CHECKOUT</p>
      <h1 className="display text-4xl font-extrabold md:text-6xl">FECHAR PEDIDO.</h1>
      <CheckoutView />
    </div>
  );
}
