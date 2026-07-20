export const metadata = { title: "Estrutura — DREEWSMART" };

import Image from "next/image";
import Voltar from "@/components/Voltar";

const NUMEROS = [
  { n: "1.400", u: "m²", l: "de área de treino" },
  { n: "24", u: "h", l: "aberta todo dia" },
  { n: "12", u: "", l: "racks de agachamento" },
  { n: "800", u: "kg", l: "de anilha calibrada" },
];

const AREAS = [
  { nome: "ÁREA DE FORÇA", linha: "Racks, barras olímpicas e anilha calibrada em toda estação. Ninguém espera barra." },
  { nome: "PLATAFORMAS LPO", linha: "4 plataformas com piso de impacto. Pode soltar a barra — é pra isso que existe." },
  { nome: "CARDIO", linha: "Esteiras e bikes no fundo, onde é o lugar delas. Cardio serve o treino, não o contrário." },
  { nome: "VESTIÁRIO 24H", linha: "Armário com chave, chuveiro quente de madrugada. Aberto quando a academia está aberta: sempre." },
];

export default function Estrutura() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
      <Voltar atual="ESTRUTURA" />
      <p className="eyebrow mb-4">ACADEMIA / ESTRUTURA</p>
      <h1 className="display text-4xl font-extrabold md:text-6xl">
        EQUIPAMENTO QUE AGUENTA.
      </h1>

      {/* render real da unidade */}
      <div className="relative mt-12 aspect-[16/10] overflow-hidden">
        <Image
          src="/img/academia-wide.webp"
          alt="Área de treino da DREEWSMART: racks, halteres e piso de impacto"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1440px) 100vw, 1440px"
        />
      </div>

      <div className="mt-14 grid grid-cols-2 gap-px bg-steel lg:grid-cols-4">
        {NUMEROS.map((item) => (
          <div key={item.l} className="bg-void p-8">
            <p className="num text-4xl text-bone">
              {item.n}
              <span className="text-xl text-ash">{item.u}</span>
            </p>
            <p className="mt-2 text-sm text-ash">{item.l}</p>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <p className="eyebrow mb-6">POR ÁREA</p>
        <div className="grid gap-px bg-steel md:grid-cols-2">
          {AREAS.map((a) => (
            <div key={a.nome} className="bg-void p-8">
              <h2 className="display text-xl font-bold">{a.nome}</h2>
              <p className="mt-3 text-sm text-ash">{a.linha}</p>
            </div>
          ))}
        </div>
      </div>
      {/* ASSET PENDENTE: galeria de fotos reais da unidade */}
    </div>
  );
}
