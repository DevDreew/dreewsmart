// ============================================================
// PLANOS — modelo Smart Fit adaptado (valores fictícios/exemplo).
// Cada plano tem: preço cheio + preço promocional do 1º mês,
// % OFF, fidelidade, selo, e a MESMA lista de benefícios com
// flag incluso/não — o riscado mostra o que se perde no mais
// barato e o que se ganha subindo de plano.
// ============================================================

export interface BeneficioPlano {
  label: string;
  incluso: boolean;
}

export interface Plano {
  id: string;
  nome: string;
  tagline: string;              // uma linha vendendo o plano
  preco: number;                // preço cheio /mês
  precoPromo: number;           // 1º mês (promo)
  off: number;                  // % de desconto do 1º mês
  fidelidade: string;           // "SEM FIDELIDADE" | "12 MESES"
  selo?: string;                // "O MAIS ESCOLHIDO" etc.
  destaque: boolean;
  beneficios: BeneficioPlano[]; // lista UNIFICADA — riscado quando não incluso
}

// Lista-mestre de benefícios (ordem fixa em todos os cards)
const B = {
  musc24: "Musculação 24h",
  aval: "Avaliação física de entrada",
  app: "App de treino",
  planilha: "Planilha por treinador",
  reav: "Reavaliação mensal",
  off10: "10% off na loja",
  onefone: "Acompanhamento 1:1",
  ajuste: "Ajuste quinzenal de treino",
  pulse: "1 PULSE por mês incluso",
};

export const PLANOS: Plano[] = [
  {
    id: "base",
    nome: "BASE",
    tagline: "Pra quem treina sozinho e só precisa de estrutura séria.",
    preco: 129,
    precoPromo: 99,
    off: 23,
    fidelidade: "SEM FIDELIDADE",
    destaque: false,
    beneficios: [
      { label: B.musc24, incluso: true },
      { label: B.aval, incluso: true },
      { label: B.app, incluso: true },
      { label: B.planilha, incluso: false },
      { label: B.reav, incluso: false },
      { label: B.off10, incluso: false },
      { label: B.onefone, incluso: false },
      { label: B.pulse, incluso: false },
    ],
  },
  {
    id: "performance",
    nome: "PERFORMANCE",
    tagline: "Treinador montando e cobrando. O plano de quem quer número.",
    preco: 189,
    precoPromo: 139,
    off: 26,
    fidelidade: "12 MESES DE FIDELIDADE",
    selo: "O MAIS ESCOLHIDO",
    destaque: true,
    beneficios: [
      { label: B.musc24, incluso: true },
      { label: B.aval, incluso: true },
      { label: B.app, incluso: true },
      { label: B.planilha, incluso: true },
      { label: B.reav, incluso: true },
      { label: B.off10, incluso: true },
      { label: B.onefone, incluso: false },
      { label: B.pulse, incluso: false },
    ],
  },
  {
    id: "protocolo",
    nome: "PROTOCOLO",
    tagline: "Tudo dentro: treino, ajuste e suplemento. Sem desculpa.",
    preco: 289,
    precoPromo: 219,
    off: 24,
    fidelidade: "12 MESES DE FIDELIDADE",
    destaque: false,
    beneficios: [
      { label: B.musc24, incluso: true },
      { label: B.aval, incluso: true },
      { label: B.app, incluso: true },
      { label: B.planilha, incluso: true },
      { label: B.reav, incluso: true },
      { label: B.off10, incluso: true },
      { label: B.onefone, incluso: true },
      { label: B.pulse, incluso: true },
    ],
  },
];

export function getPlano(id: string) {
  return PLANOS.find((p) => p.id === id);
}
