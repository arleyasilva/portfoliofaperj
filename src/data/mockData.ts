// src/data/mockData.ts

// 1. Interface para o array mockAreaDistribution
export interface AreaDistributionData {
  name: string;
  value: number;
}

export const mockAreaDistribution: AreaDistributionData[] = [
  { name: 'Marketing', value: 400 },
  { name: 'Vendas', value: 300 },
  { name: 'Desenvolvimento', value: 300 },
  { name: 'Suporte', value: 200 },
];

// 2. Interface para o array mockMonthlyProjects
export interface MonthlyProjectsData {
  name: string;
  projetosAtivos: number;
  projetosInativos: number;
}

export const mockMonthlyProjects: MonthlyProjectsData[] = [
  { name: 'Universidade 01', projetosAtivos: 68, projetosInativos: 25 },
  { name: 'Universidade 02', projetosAtivos: 80, projetosInativos: 32 },
  { name: 'Universidade 03', projetosAtivos: 86, projetosInativos: 43 },
  { name: 'Universidade 04', projetosAtivos: 100, projetosInativos: 53 },
  { name: 'Universidade 05', projetosAtivos: 108, projetosInativos: 60 },
  { name: 'Universidade 06', projetosAtivos: 90, projetosInativos: 68 },
  { name: 'Universidade 07', projetosAtivos: 100, projetosInativos: 77 },
  { name: 'Universidade 08', projetosAtivos: 110, projetosInativos: 85 },
];

// 3. Interfaces para o objeto mockHighlightData
export interface TrendData {
  period: string;
  value: number;
}

export interface HighlightData {
  area: string;
  description: string;
  trend: TrendData[];
}

export const mockHighlightData: HighlightData = {
  area: 'Desenvolvimento',
  description: 'O setor de Desenvolvimento teve um aumento de 20% nos últimos 3 meses.',
  trend: [
    { period: 'Q1', value: 100 },
    { period: 'Q2', value: 120 },
    { period: 'Q3', value: 145 },
    { period: 'Q4', value: 130 },
  ],
};