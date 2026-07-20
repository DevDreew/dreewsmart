import { getProduto } from "@/lib/catalog";
import Voltar from "@/components/Voltar";

export const metadata = { title: "Rótulo aberto — DREEWSMART" };

// ÚNICO bloco claro do site. De propósito — o assunto é transparência.
export default function RotuloAberto() {
  const mono = getProduto("mono-creatina")!;
  return (
    <div className="bg-bone text-void">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
      <Voltar atual="RÓTULO ABERTO" />
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="num mb-4 text-[11px] tracking-[0.14em] text-void/50">
              RÓTULO ABERTO
            </p>
            <h1 className="display text-4xl md:text-6xl">
              CREATINA SEM SEGREDO.
            </h1>
            <p className="mt-8 max-w-lg text-lg text-void/70">
              Creatina boa não precisa de fórmula secreta: é monoidratada
              pura, e pronto. Nossa MONO entrega 5g por dose — a quantidade
              que a ciência usa — sem carboidrato pra encher pote, sem
              corante, sem aromatizante. O que pesa na balança é creatina.
            </p>
            <p className="mt-6 max-w-lg text-lg text-void/70">
              Você não precisa fazer fase de saturação nem tomar em jejum.
              Uma dose por dia, todo dia, no horário que der. Simples porque
              creatina é simples — quem complica está vendendo outra coisa.
            </p>
          </div>

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
            <p className="num mt-4 text-[11px] tracking-[0.14em] text-void/50">
              CREAPURE® · LAUDO POR LOTE · QR NO RÓTULO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
