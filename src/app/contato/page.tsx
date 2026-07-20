import Voltar from "@/components/Voltar";
export const metadata = { title: "Contato — DREEWSMART" };

export default function Contato() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
      <Voltar atual="CONTATO" />
      <p className="eyebrow mb-4">CONTATO</p>
      <h1 className="display text-4xl font-extrabold md:text-6xl">FALA DIRETO.</h1>
      <div className="mt-14 grid gap-px bg-steel md:grid-cols-3">
        <div className="bg-void p-8">
          <p className="eyebrow mb-3">ENDEREÇO</p>
          <p className="text-sm text-bone">Barueri/SP</p>
          <p className="mt-1 text-sm text-ash">Unidade única. 24h.</p>
        </div>
        <div className="bg-void p-8">
          <p className="eyebrow mb-3">WHATSAPP</p>
          <a href="https://wa.me/5511900000000" className="num text-sm text-bone hover:text-blood">
            +55 11 90000-0000
          </a>
          <p className="mt-1 text-sm text-ash">Resposta em horário de treino.</p>
        </div>
        <div className="bg-void p-8">
          <p className="eyebrow mb-3">E-MAIL</p>
          <a href="mailto:contato@dreewsmart.com.br" className="num text-sm text-bone hover:text-blood">
            contato@dreewsmart.com.br
          </a>
          <p className="mt-1 text-sm text-ash">Pedidos, laudos, matrícula.</p>
        </div>
      </div>
      {/* Fase 6: formulário grava lead no Supabase (origem: contato) */}
    </div>
  );
}
