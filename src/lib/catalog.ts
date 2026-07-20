// ============================================================
// DREEWSMART — CATÁLOGO
// Fonte única de verdade. As páginas leem daqui.
// Quando o Supabase entrar, esta interface não muda — só a origem.
// ============================================================

export type Categoria =
  | "pre-treino"
  | "proteina"
  | "creatina"
  | "acessorios"
  | "vestuario";

export interface DoseItem {
  composto: string;
  dose: string;
}

export interface Hotspot {
  /** posição em % sobre o viewer (0-100) */
  x: number;
  y: number;
  titulo: string;
  texto: string;
}

export interface Produto {
  slug: string;
  nome: string;
  linha: string;
  categoria: Categoria;
  preco: number;
  peso: string;
  doses?: number;
  tabelaDose?: DoseItem[];
  comoUsar?: [string, string, string];
  provaTecnica?: { laudo: string; lote: string; origem: string };
  /** primitiva do placeholder 3D até o GLB real chegar */
  primitiva: "cilindro" | "capsula" | "caixa";
  /** cor base da primitiva */
  cor3d: string;
  sabores?: string[];
  /** rótulo do seletor de variante — "SABOR" (padrão) ou "TAMANHO" para vestuário */
  varianteLabel?: string;
  /** cor da primitiva por sabor — cross-fade 300ms no viewer */
  saborCores?: Record<string, string>;
  /** MÁXIMO 3 por produto */
  hotspots?: Hotspot[];
  /** true quando existem frames em /public/frames/[slug]/ */
  cinematica?: boolean;
}

export const CATALOGO: Produto[] = [
  {
    slug: "pulse-pre-treino",
    nome: "PULSE",
    linha: "Pré-treino. Blackberry. 360g.",
    categoria: "pre-treino",
    preco: 189,
    peso: "360g",
    doses: 60,
    sabores: ["Blackberry"],
    saborCores: { Blackberry: "#2b0a12" },
    cor3d: "#1a1a1d",
    cinematica: true,
    hotspots: [
      { x: 50, y: 18, titulo: "TAMPA DE ROSCA TRIPLA", texto: "Três voltas de vedação. Umidade não entra, pó não empedra. Abre com uma mão suja de magnésio." },
      { x: 30, y: 52, titulo: "DOSE NO RÓTULO", texto: "400mg de cafeína anidra declarados por porção. Sem blend proprietário. O que está escrito é o que tem." },
      { x: 68, y: 78, titulo: "SCOOP CALIBRADO", texto: "6g rasos. Uma dose. A colher que vem no pote é a medida do rótulo, não um enfeite." },
    ],
    tabelaDose: [
      { composto: "CAFEÍNA ANIDRA", dose: "400mg" },
      { composto: "BETA-ALANINA", dose: "3.2g" },
      { composto: "CITRULINA MALATO", dose: "6g" },
      { composto: "TAURINA", dose: "1g" },
      { composto: "TIROSINA", dose: "500mg" },
    ],
    comoUsar: [
      "1 dose (6g) em 300ml de água.",
      "20 minutos antes da barra.",
      "Não repita a dose no mesmo dia.",
    ],
    provaTecnica: {
      laudo: "Laudo por lote. HPLC. Disponível no QR do rótulo.",
      lote: "Rastreável do fornecedor à prateleira.",
      origem: "Matéria-prima com certificado de análise.",
    },
    primitiva: "cilindro",
  },
  {
    slug: "helix-garrafa",
    nome: "HELIX",
    linha: "Garrafa 700ml. Rosca que não vaza.",
    categoria: "acessorios",
    preco: 129,
    peso: "700ml",
    cor3d: "#17171a",
    hotspots: [
      { x: 50, y: 14, titulo: "ROSCA DE 0.1MM", texto: "Tolerância de injeção de 0.1mm. Fecha no clique, vira de cabeça pra baixo na mochila e nada sai." },
      { x: 34, y: 50, titulo: "TRITAN SEM BPA", texto: "Polímero certificado. Não retém cheiro de whey de ontem. Aguenta queda no piso da área de força." },
      { x: 62, y: 84, titulo: "BASE ANTIDERRAPANTE", texto: "Anel de borracha na base. Fica em pé no banco, no rack e no chão molhado do vestiário." },
    ],
    comoUsar: [
      "Líquido primeiro. Pó depois.",
      "Rosque até o clique.",
      "Lave à mão. A rosca agradece.",
    ],
    provaTecnica: {
      laudo: "Tritan livre de BPA. Certificado do polímero.",
      lote: "Injeção rastreada por cavidade.",
      origem: "Molde próprio. Tolerância de 0.1mm na rosca.",
    },
    primitiva: "capsula",
  },
  {
    slug: "core-whey",
    nome: "CORE",
    linha: "Whey isolado. 900g. Sem blend.",
    categoria: "proteina",
    preco: 249,
    peso: "900g",
    doses: 30,
    sabores: ["Cacau", "Baunilha"],
    saborCores: { Cacau: "#241611", Baunilha: "#8f8578" },
    cor3d: "#241611",
    hotspots: [
      { x: 46, y: 46, titulo: "AMINOGRAMA POR LOTE", texto: "27g de proteína isolada por dose, aminograma impresso. Não é média da categoria — é o número do seu pote." },
      { x: 64, y: 74, titulo: "MICROFILTRADO", texto: "Isolamento por microfiltração. Menos de 0.5g de lactose por dose. Origem da matéria-prima declarada." },
    ],
    tabelaDose: [
      { composto: "PROTEÍNA ISOLADA", dose: "27g" },
      { composto: "CARBOIDRATO", dose: "1.2g" },
      { composto: "GORDURA", dose: "0.8g" },
      { composto: "LACTOSE", dose: "<0.5g" },
    ],
    comoUsar: [
      "1 dose (30g) em 250ml de água ou leite.",
      "Até 40 minutos pós-treino.",
      "Serve como refeição proteica em dia sem treino.",
    ],
    provaTecnica: {
      laudo: "Aminograma completo por lote.",
      lote: "Impressa na base do pote.",
      origem: "Isolado por microfiltração. Origem declarada.",
    },
    primitiva: "cilindro",
  },
  {
    slug: "mono-creatina",
    nome: "MONO",
    linha: "Creatina monoidratada. 300g. Só isso.",
    categoria: "creatina",
    preco: 99,
    peso: "300g",
    doses: 60,
    cor3d: "#1a1a1d",
    hotspots: [
      { x: 50, y: 46, titulo: "99.9% PURA", texto: "Um ingrediente no rótulo. Creatina monoidratada, pureza mínima 99.9%, laudo por lote. Não tem o que esconder." },
    ],
    tabelaDose: [
      { composto: "CREATINA MONOIDRATADA", dose: "5g" },
      { composto: "— PUREZA (CREAPURE®)", dose: "99.9%" },
      { composto: "CARBOIDRATO", dose: "0g" },
      { composto: "SÓDIO", dose: "0mg" },
      { composto: "ADITIVO / CORANTE", dose: "0g" },
    ],
    comoUsar: [
      "5g por dia. Qualquer horário.",
      "Todo dia. Inclusive no descanso.",
      "Não precisa de fase de saturação.",
    ],
    provaTecnica: {
      laudo: "Pureza mínima 99.9%. Laudo por lote.",
      lote: "Rastreável.",
      origem: "Matéria-prima com certificado.",
    },
    primitiva: "cilindro",
  },
  {
    slug: "grip-straps",
    nome: "GRIP",
    linha: "Straps de levantamento. Algodão denso.",
    categoria: "acessorios",
    preco: 79,
    peso: "Par",
    cor3d: "#1c1c1f",
    hotspots: [
      { x: 44, y: 40, titulo: "COSTURA EM X", texto: "Reforço em X no ponto de tração. Testado a 300kg. O strap cede depois de você, não antes." },
      { x: 62, y: 66, titulo: "ALGODÃO 600GSM", texto: "Gramatura densa. Não afina com suor e magnésio. Amacia com o uso sem perder pegada." },
    ],
    comoUsar: [
      "Passe pela alça. Enrole na barra.",
      "Use no puxar pesado, não no aquecer.",
      "A pegada treina sem eles. Eles entram no topo da série.",
    ],
    provaTecnica: {
      laudo: "Costura reforçada em X. Testado a 300kg.",
      lote: "Corte e costura nacionais.",
      origem: "Algodão 600gsm.",
    },
    primitiva: "caixa",
  },
  {
    slug: "cinch-luvas",
    nome: "CINCH",
    linha: "Luvas de treino. Palma reforçada.",
    categoria: "acessorios",
    preco: 89,
    peso: "Par",
    cor3d: "#161618",
    hotspots: [
      { x: 48, y: 44, titulo: "PALMA EM COURO SINTÉTICO", texto: "3mm de espessura no ponto de apoio. Segura a barra sem criar calo em uma semana de treino." },
      { x: 66, y: 70, titulo: "PUNHO AJUSTÁVEL", texto: "Velcro de dupla trava. Não afrouxa no meio da série de puxada." },
    ],
    comoUsar: [
      "Ajuste o velcro antes da primeira série.",
      "Use em puxada e empurrão pesado.",
      "Lave à mão. Não seque no sol direto.",
    ],
    provaTecnica: {
      laudo: "Costura reforçada nos pontos de tração.",
      lote: "Corte e costura nacionais.",
      origem: "Couro sintético 3mm + tecido respirável.",
    },
    primitiva: "caixa",
  },
  {
    slug: "brace-cinto",
    nome: "BRACE",
    linha: "Cinto de levantamento. Couro. 10mm.",
    categoria: "acessorios",
    preco: 219,
    peso: "Único",
    cor3d: "#141416",
    hotspots: [
      { x: 50, y: 40, titulo: "COURO 10MM", texto: "Espessura única do início ao fim. Não amolece no ponto da fivela depois de meses de uso." },
      { x: 50, y: 72, titulo: "FIVELA DUPLA PRONG", texto: "Trava em dois pontos. Não solta sob carga máxima de agachamento e terra." },
    ],
    comoUsar: [
      "Ajuste na última casa confortável, não na mais apertada.",
      "Use em agachamento, terra e desenvolvimento pesado.",
      "Guarde plano. Não enrole por longos períodos.",
    ],
    provaTecnica: {
      laudo: "Couro vegetal 10mm. Fivela de aço inox.",
      lote: "Corte e costura nacionais.",
      origem: "Curtume certificado.",
    },
    primitiva: "capsula",
  },
  {
    slug: "ignite-pre-treino",
    nome: "IGNITE",
    linha: "Pré-treino sem estimulante. 300g.",
    categoria: "pre-treino",
    preco: 179,
    peso: "300g",
    doses: 50,
    sabores: ["Limão"],
    saborCores: { Limão: "#1c2408" },
    cor3d: "#1a1a1d",
    hotspots: [
      { x: 50, y: 46, titulo: "ZERO CAFEÍNA", texto: "Bombeamento e foco sem estimulante. Treina de noite sem pagar a conta no sono." },
      { x: 66, y: 74, titulo: "CITRULINA EM DOSE CLÍNICA", texto: "8g por porção — a dose usada nos estudos, não a fração que cabe no marketing." },
    ],
    tabelaDose: [
      { composto: "CITRULINA MALATO", dose: "8g" },
      { composto: "BETA-ALANINA", dose: "3.2g" },
      { composto: "NITRATO DE BETERRABA", dose: "500mg" },
      { composto: "TAURINA", dose: "1g" },
    ],
    comoUsar: [
      "1 dose (6g) em 300ml de água.",
      "20 minutos antes da barra. Qualquer horário do dia.",
      "Pode combinar com café, se quiser o estímulo à parte.",
    ],
    provaTecnica: {
      laudo: "Laudo por lote. HPLC. Disponível no QR do rótulo.",
      lote: "Rastreável do fornecedor à prateleira.",
      origem: "Matéria-prima com certificado de análise.",
    },
    primitiva: "cilindro",
  },
  {
    slug: "iso-whey",
    nome: "ISO",
    linha: "Whey concentrado. 900g. 3 sabores.",
    categoria: "proteina",
    preco: 179,
    peso: "900g",
    doses: 30,
    sabores: ["Cacau", "Baunilha", "Morango"],
    saborCores: { Cacau: "#241611", Baunilha: "#8f8578", Morango: "#3a1218" },
    cor3d: "#241611",
    hotspots: [
      { x: 46, y: 46, titulo: "24G POR DOSE", texto: "Concentrado, não isolado — por isso custa menos que o CORE. A proteína continua declarada por lote." },
    ],
    tabelaDose: [
      { composto: "PROTEÍNA CONCENTRADA", dose: "24g" },
      { composto: "CARBOIDRATO", dose: "3g" },
      { composto: "GORDURA", dose: "2g" },
    ],
    comoUsar: [
      "1 dose (32g) em 250ml de água ou leite.",
      "Até 40 minutos pós-treino.",
      "Alternativa de custo ao CORE — mesma origem, sem microfiltração.",
    ],
    provaTecnica: {
      laudo: "Aminograma por lote.",
      lote: "Impressa na base do pote.",
      origem: "Concentrado de origem declarada.",
    },
    primitiva: "cilindro",
  },
  {
    slug: "flux-camiseta",
    nome: "FLUX",
    linha: "Camiseta técnica dry-fit. P ao GG.",
    categoria: "vestuario",
    preco: 149,
    peso: "Único",
    sabores: ["P", "M", "G", "GG"],
    varianteLabel: "TAMANHO",
    cor3d: "#141416",
    hotspots: [
      { x: 50, y: 40, titulo: "TECIDO DRY-FIT", texto: "Fibra que evapora suor em vez de segurar. Seca antes do fim do treino de costas." },
      { x: 50, y: 74, titulo: "COSTURA PLANA", texto: "Sem atrito com a alça da mochila nem com o cinto de levantamento." },
    ],
    comoUsar: [
      "Lave do avesso, água fria.",
      "Não passe ferro na estampa.",
      "Seca rápido — não precisa de secadora.",
    ],
    provaTecnica: {
      laudo: "Poliamida técnica com proteção UV.",
      lote: "Corte e costura nacionais.",
      origem: "Malha importada, confecção própria.",
    },
    primitiva: "caixa",
  },
  {
    slug: "ridge-shorts",
    nome: "RIDGE",
    linha: "Shorts de treino. Tela dupla. P ao GG.",
    categoria: "vestuario",
    preco: 129,
    peso: "Único",
    sabores: ["P", "M", "G", "GG"],
    varianteLabel: "TAMANHO",
    cor3d: "#141416",
    hotspots: [
      { x: 50, y: 42, titulo: "TELA DUPLA", texto: "Forro interno de compressão. Agacha sem se preocupar com o short." },
      { x: 50, y: 76, titulo: "BOLSO COM ZÍPER", texto: "Cabe chave e celular sem balançar na esteira." },
    ],
    comoUsar: [
      "Lave à máquina, ciclo delicado.",
      "Não use amaciante — reduz a compressão do forro.",
      "Seca rápido, pendurado.",
    ],
    provaTecnica: {
      laudo: "Tecido com secagem rápida e proteção UV.",
      lote: "Corte e costura nacionais.",
      origem: "Malha importada, confecção própria.",
    },
    primitiva: "caixa",
  },
];

export const CATEGORIAS: { slug: Categoria; nome: string }[] = [
  { slug: "pre-treino", nome: "PRÉ-TREINO" },
  { slug: "proteina", nome: "PROTEÍNA" },
  { slug: "creatina", nome: "CREATINA" },
  { slug: "acessorios", nome: "ACESSÓRIOS" },
  { slug: "vestuario", nome: "VESTUÁRIO" },
];

export function getProduto(slug: string): Produto | undefined {
  return CATALOGO.find((p) => p.slug === slug);
}

export function getPorCategoria(cat: Categoria): Produto[] {
  return CATALOGO.filter((p) => p.categoria === cat);
}

export function formatBRL(v: number): string {
  return `R$ ${v}`;
}
