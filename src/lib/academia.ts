// ============================================================
// DADOS DA UNIDADE — fonte única. Editar aqui reflete no site todo.
// Valores de exemplo (Barueri/SP). Trocar pelos reais quando tiver.
// ============================================================

export const UNIDADE = {
  nome: "DREEWSMART BARUERI",
  endereco: "Av. Exemplo, 1234 — Centro, Barueri/SP",
  cep: "06401-000",
  // usado no embed do mapa e no botão de rota. Trocar por endereço real.
  mapsQuery: "Barueri, São Paulo",
  whatsapp: "5511999999999", // só dígitos, com DDI+DDD
  horarios: [
    { dias: "SEG A SEX", hora: "05H — 00H" },
    { dias: "SÁBADO", hora: "07H — 20H" },
    { dias: "DOMINGO", hora: "08H — 16H" },
    { dias: "FERIADOS", hora: "08H — 14H" },
  ],
  numeros: [
    { valor: "1.400", unidade: "M²", label: "Área de treino" },
    { valor: "24", unidade: "H", label: "Acesso diário" },
    { valor: "120", unidade: "+", label: "Equipamentos" },
    { valor: "8", unidade: "", label: "Modalidades" },
  ],
} as const;

// ============================================================
// MODALIDADES — grade visual. `intensidade` vira selo de nível.
// ============================================================

export type Modalidade = {
  slug: string;
  nome: string;
  linha: string;
  descricao: string;
  intensidade: "BASE" | "FORTE" | "MÁXIMA";
  duracao: string;   // ex: "60 MIN"
  foco: string;      // ex: "FORÇA"
};

export const MODALIDADES: Modalidade[] = [
  {
    slug: "musculacao",
    nome: "MUSCULAÇÃO",
    linha: "O centro de tudo. 24h.",
    descricao: "Área livre com peso, máquinas e cabos. Espaço para treinar pesado sem fila.",
    intensidade: "FORTE",
    duracao: "LIVRE",
    foco: "HIPERTROFIA",
  },
  {
    slug: "lpo",
    nome: "LPO",
    linha: "Arranco e arremesso.",
    descricao: "Plataforma dedicada, barras olímpicas e anilhas de borracha. Levantamento olímpico de verdade.",
    intensidade: "MÁXIMA",
    duracao: "60 MIN",
    foco: "POTÊNCIA",
  },
  {
    slug: "powerlifting",
    nome: "POWERLIFTING",
    linha: "Agachamento, supino, terra.",
    descricao: "Racks de competição, barra calibrada e área de terra reforçada. Os três grandes, sem improviso.",
    intensidade: "MÁXIMA",
    duracao: "75 MIN",
    foco: "FORÇA MÁXIMA",
  },
  {
    slug: "funcional",
    nome: "FUNCIONAL",
    linha: "Força aplicada. Sem coreografia.",
    descricao: "Kettlebell, corda, sled e caixa. Condicionamento que serve ao treino de força, não substitui.",
    intensidade: "FORTE",
    duracao: "45 MIN",
    foco: "CONDICIONAMENTO",
  },
  {
    slug: "mobilidade",
    nome: "MOBILIDADE",
    linha: "Amplitude a serviço da barra.",
    descricao: "Espaço de aquecimento e recuperação. Amplitude articular para levantar mais, com menos risco.",
    intensidade: "BASE",
    duracao: "30 MIN",
    foco: "RECUPERAÇÃO",
  },
  {
    slug: "cardio",
    nome: "CARDIO",
    linha: "Motor condicionado.",
    descricao: "Esteiras, bikes e remo. Base aeróbica para sustentar volume de treino, não para queimar tempo.",
    intensidade: "BASE",
    duracao: "LIVRE",
    foco: "RESISTÊNCIA",
  },
];

// ============================================================
// FAQ — acordeão. Reduz objeção antes da matrícula.
// ============================================================

export const FAQ: { pergunta: string; resposta: string }[] = [
  {
    pergunta: "Preciso de fidelidade ou tem multa de cancelamento?",
    resposta:
      "O plano BASE é mensal, sem fidelidade — cancela quando quiser. PERFORMANCE e PROTOCOLO têm compromisso de permanência com preço menor. As regras estão escritas no contrato, sem letra miúda escondida.",
  },
  {
    pergunta: "A academia funciona 24 horas mesmo?",
    resposta:
      "Sim. Acesso liberado 24h por dia para os planos com essa opção, por controle de acesso individual. A recepção com equipe tem horário próprio — veja a tabela acima.",
  },
  {
    pergunta: "Tem acompanhamento de treino ou é só o espaço?",
    resposta:
      "O espaço é liberado para quem já treina sozinho. Acompanhamento de treinador está incluído nos planos PERFORMANCE e PROTOCOLO. Você não paga por aula que não vai usar.",
  },
  {
    pergunta: "Posso experimentar antes de assinar?",
    resposta:
      "Sim. Agende uma aula experimental pelo WhatsApp. Você conhece a estrutura, testa os equipamentos e decide depois — sem pressão de venda.",
  },
  {
    pergunta: "Os suplementos da loja são vendidos na academia?",
    resposta:
      "Sim. A linha DreewSmart fica disponível na recepção, e alunos têm condição diferente da loja online. Rótulo aberto: você vê a dose declarada antes de comprar.",
  },
  {
    pergunta: "Como faço para trancar o plano se viajar?",
    resposta:
      "O trancamento temporário está disponível nos planos anuais, por até 30 dias no período. Solicita pela recepção ou WhatsApp, sem custo dentro da regra do contrato.",
  },
];
