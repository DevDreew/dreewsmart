import Link from "next/link";
import Voltar from "@/components/Voltar";
import FAQ from "@/components/FAQ";
import { UNIDADE } from "@/lib/academia";

export const metadata = { title: "Central de Ajuda — DREEWSMART" };

// ============================================================
// CENTRAL DE AJUDA — padrão Smart Fit (help center) adaptado.
// Categorias de auto-atendimento + FAQ + canais diretos +
// Disque Denúncia (ouvidoria) + botão "Voltar para o site".
// ============================================================

const CATEGORIAS = [
  {
    titulo: "MATRÍCULA E PLANOS",
    linha: "Como entrar, mudar de plano, trancar ou cancelar.",
    href: "/academia/planos",
    acao: "VER PLANOS",
  },
  {
    titulo: "PEDIDOS DA LOJA",
    linha: "Acompanhar pedido, troca, devolução e prazo de entrega.",
    href: "/conta",
    acao: "MINHA CONTA",
  },
  {
    titulo: "PAGAMENTOS",
    linha: "Formas de pagamento, cobrança e segunda via.",
    href: "/contato",
    acao: "FALAR COM A GENTE",
  },
  {
    titulo: "TREINO E ESTRUTURA",
    linha: "Horários, modalidades, equipamentos e regras da unidade.",
    href: "/academia",
    acao: "VER ACADEMIA",
  },
];

export default function Ajuda() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
      <Voltar atual="AJUDA" />
      {/* topo */}
      <p className="eyebrow mb-3">CENTRAL DE AJUDA</p>
      <h1 className="display max-w-3xl text-4xl md:text-6xl">
        COMO PODEMOS AJUDAR?
      </h1>
      <p className="mt-5 max-w-xl text-ash">
        Resolve aqui, sem fila. Escolha um assunto, veja as dúvidas mais
        comuns ou fale direto com a gente.
      </p>

      {/* categorias de auto-atendimento */}
      <div className="mt-12 grid gap-px bg-steel sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIAS.map((c) => (
          <Link
            key={c.titulo}
            href={c.href}
            className="group flex flex-col justify-between gap-8 bg-carbon p-6 transition-colors hover:bg-[#141418]"
          >
            <div>
              <h2 className="display text-lg tracking-tight group-hover:text-blood">
                {c.titulo}
              </h2>
              <p className="mt-2 text-sm text-ash">{c.linha}</p>
            </div>
            <span className="num flex items-center gap-2 text-[11px] tracking-[0.16em] text-blood">
              {c.acao} <span aria-hidden>→</span>
            </span>
          </Link>
        ))}
      </div>

      {/* FAQ */}
      <section className="mt-20">
        <h2 className="display mb-8 text-2xl md:text-4xl">DÚVIDAS FREQUENTES</h2>
        <FAQ />
      </section>

      {/* canais diretos */}
      <section className="mt-20 grid gap-px bg-steel lg:grid-cols-3">
        <div className="bg-carbon p-8">
          <p className="eyebrow mb-3">WHATSAPP</p>
          <p className="text-sm text-ash">Resposta no horário da recepção. Assunto resolvido na conversa.</p>
          <a
            href={`https://wa.me/${UNIDADE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-blood mt-6 inline-flex"
          >
            CHAMAR AGORA
          </a>
        </div>
        <div className="bg-carbon p-8">
          <p className="eyebrow mb-3">E-MAIL</p>
          <p className="text-sm text-ash">Para assuntos com anexo ou que precisam de registro.</p>
          <a href="mailto:ajuda@dreewsmart.com.br" className="btn btn-ghost mt-6 inline-flex">
            AJUDA@DREEWSMART.COM.BR
          </a>
        </div>

        {/* DISQUE DENÚNCIA / OUVIDORIA */}
        <div className="border-l-2 border-blood bg-carbon p-8">
          <p className="eyebrow mb-3 text-blood">DISQUE DENÚNCIA</p>
          <p className="text-sm text-ash">
            Assédio, discriminação, conduta inadequada de funcionário ou
            aluno, irregularidade na unidade. Canal sigiloso, direto com a
            direção — sem passar pela recepção.
          </p>
          <a href="mailto:denuncia@dreewsmart.com.br" className="btn btn-ghost mt-6 inline-flex">
            DENUNCIA@DREEWSMART.COM.BR
          </a>
          <p className="num mt-4 text-[10px] tracking-[0.12em] text-steel">
            SIGILO GARANTIDO · RESPOSTA EM ATÉ 48H ÚTEIS
          </p>
        </div>
      </section>

      {/* voltar para o site — padrão Smart Fit */}
      <div className="mt-20 flex justify-center border-t border-steel pt-12">
        <Link href="/" className="btn btn-blood">
          VOLTAR PARA O SITE
        </Link>
      </div>
    </div>
  );
}
