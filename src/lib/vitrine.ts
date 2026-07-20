// ============================================================
// VITRINE DA HOME — destaques + prova social.
// Feedbacks fictícios realistas — troque por reais quando tiver.
// Novos/mais-vendidos referenciam slugs do catálogo (catalog.ts).
// ============================================================

export const NOVOS = ["flux-camiseta", "ignite-pre-treino", "iso-whey", "cinch-luvas"];
export const MAIS_VENDIDOS = ["mono-creatina", "helix-garrafa", "core-whey", "brace-cinto"];

export type Feedback = {
  nome: string;
  inicial: string;
  produto: string;
  nota: number; // 1..5
  texto: string;
};

export const FEEDBACKS: Feedback[] = [
  {
    nome: "Rafael M.",
    inicial: "R",
    produto: "MONO · Creatina",
    nota: 5,
    texto: "Dose batida no rótulo. Sem sabor artificial, dissolve fácil. Já é a terceira compra.",
  },
  {
    nome: "Carla S.",
    inicial: "C",
    produto: "HELIX · Shaker",
    nota: 5,
    texto: "Não vaza, a mola mistura bem e a tampa não trava. Vale cada real.",
  },
  {
    nome: "Diego T.",
    inicial: "D",
    produto: "IGNITE · Pré-treino",
    nota: 4,
    texto: "Foco sem tremedeira, uso no treino da noite e durmo normal. Podia ter mais sabores.",
  },
  {
    nome: "Beatriz L.",
    inicial: "B",
    produto: "FLUX · Camiseta",
    nota: 5,
    texto: "Tecido seca rápido e não fica pesado no treino. Caimento certo, não encolheu.",
  },
];
