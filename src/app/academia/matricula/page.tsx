import { Suspense } from "react";
import Voltar from "@/components/Voltar";
import FormMatricula from "@/components/FormMatricula";

export const metadata = { title: "Matrícula — DREEWSMART" };

export default function Matricula() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
      <Voltar atual="MATRÍCULA" />
      <p className="eyebrow mb-4">ACADEMIA / MATRÍCULA</p>
      <h1 className="display text-4xl font-extrabold md:text-6xl">ENTRA HOJE. TREINA HOJE.</h1>
      <Suspense>
        <FormMatricula />
      </Suspense>
    </div>
  );
}
