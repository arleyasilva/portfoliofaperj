// faperj-data.ts
// ------------------------------------------------------------
// 🔵 Arquivo reduzido APENAS para dados institucionais gerais.
// Todos os dados de gráficos foram movidos para JSON externos.
// ------------------------------------------------------------

// ------------------------------------------------------------
// Estatísticas gerais (usado no StatisticalCards.tsx)
// ------------------------------------------------------------
export const STATS_DATA = {
  valorTotal: 2850000000,
  cardData: [
    { value: 1530000000, label: "Auxílios Contemplados", isCurrency: true },
    { value: 1310000000, label: "Total em Bolsas", isCurrency: true },
    { value: 74641, label: "Bolsas" },
    { value: 9349, label: "Auxílios" },
    { value: 407, label: "Editais Lançados" },
  ],
  sourceText:
    "Fonte: Sistema de Bolsas e Auxílios - SBA / Faperj [2019 - 2025]",
};

// ------------------------------------------------------------
// MOCKS – usados em alguns componentes auxiliares da Home
// ------------------------------------------------------------
export interface AreaDistributionData {
  name: string;
  value: number;
}

export const MOCK_AREA_DISTRIBUTION: AreaDistributionData[] = [
  { name: "Ciências Biológicas", value: 400 },
  { name: "Ciências Exatas", value: 300 },
  { name: "Engenharias", value: 300 },
  { name: "Ciências Humanas", value: 200 },
];

// ------------------------------------------------------------

export interface MonthlyProjectsData {
  name: string;
  projetosAtivos: number;
  projetosInativos: number;
}

export const MOCK_MONTHLY_PROJECTS: MonthlyProjectsData[] = [
  { name: "Universidade 01", projetosAtivos: 68, projetosInativos: 25 },
  { name: "Universidade 02", projetosAtivos: 80, projetosInativos: 32 },
  { name: "Universidade 03", projetosAtivos: 86, projetosInativos: 43 },
  { name: "Universidade 04", projetosAtivos: 100, projetosInativos: 53 },
  { name: "Universidade 05", projetosAtivos: 108, projetosInativos: 60 },
];

// ------------------------------------------------------------

export interface TrendData {
  period: string;
  value: number;
}

export interface HighlightData {
  area: string;
  description: string;
  trend: TrendData[];
}

export const MOCK_HIGHLIGHT_DATA: HighlightData = {
  area: "Ciências Biológicas",
  description:
    "A área de Ciências Biológicas recebeu o maior investimento, com R$ 801,28 milhões no período.",
  trend: [
    { period: "2021", value: 100 },
    { period: "2022", value: 120 },
    { period: "2023", value: 145 },
    { period: "2024", value: 130 },
  ],
};

// ------------------------------------------------------------

export const MOCK_STATS_DATA = {
  projetos: 1200,
  editais: 35,
  pesquisasContempladas: 800,
  bolsas: 450,
  fomentos: 2500000,
};

// ------------------------------------------------------------
// 🔚 FIM — arquivo limpo: sem gráficos, sem sankey, sem duplicações
// ------------------------------------------------------------
