// src/types/faperj.ts
// Tipagens oficiais dos JSON em /public/data

// -----------------------------
// faperj-stats.json
// -----------------------------

export interface StatsCardItem {
  value: number;
  label: string;
  isCurrency?: boolean;
}

export interface FaperjStatsMain {
  valorTotal: number;
  cardData: StatsCardItem[];
  sourceText: string;
}

export interface FaperjAreaDistributionItem {
  name: string;
  value: number;
}

export interface FaperjMonthlyProjectsItem {
  name: string;
  projetosAtivos: number;
  projetosInativos: number;
}

export interface FaperjHighlightTrendPoint {
  period: string;
  value: number;
}

export interface FaperjHighlightBlock {
  area: string;
  description: string;
  trend: FaperjHighlightTrendPoint[];
}

export interface FaperjStatsSummary {
  projetos: number;
  editais: number;
  pesquisasContempladas: number;
  bolsas: number;
  fomentos: number;
}

export interface FaperjStatsJson {
  statsData: FaperjStatsMain;
  areaDistribution: FaperjAreaDistributionItem[];
  monthlyProjects: FaperjMonthlyProjectsItem[];
  highlights: FaperjHighlightBlock;
  statsSummary: FaperjStatsSummary;
}

// -----------------------------
// Tipos genéricos reutilizáveis
// -----------------------------

export interface LabelValueItem {
  label: string;
  value: number;
}

export interface AreaTotalItem {
  area: string;
  total: number;
}

export interface GenderSplitItem {
  label: string;
  feminino: number;
  masculino: number;
}

export interface YearGenderSplitItem {
  ano: string;
  feminino: number;
  masculino: number;
}

export interface QuantityValueItem {
  label: string;
  quantidade: number;
  valor: number;
}

export interface BolsaAuxilioItem {
  label: string;
  bolsas: number;
  auxilios: number;
}

export interface BolsaAuxilioTotalItem extends BolsaAuxilioItem {
  total: number;
}

// -----------------------------
// Dados dos gráficos (graficoX.json)
// -----------------------------

// grafico1.json
export type Grafico1Data = AreaTotalItem[];

// grafico2.json
export interface Grafico2Item extends LabelValueItem {
  color: string;
}
export type Grafico2Data = Grafico2Item[];

// grafico3.json
export type Grafico3Data = BolsaAuxilioTotalItem[];

// grafico4.json
export type Grafico4Data = BolsaAuxilioItem[];

// grafico5.json
export type Grafico5Data = LabelValueItem[];

// grafico6.json
export type Grafico6Data = QuantityValueItem[];

// grafico7.json
export type Grafico7Data = LabelValueItem[];

// grafico8.json
export type Grafico8Data = LabelValueItem[];

// grafico9.json
export type Grafico9Data = LabelValueItem[];

// grafico9_1.json
export type Grafico9_1Data = LabelValueItem[];

// grafico10.json
export type Grafico10Data = LabelValueItem[];

// grafico11.json
export type Grafico11Data = GenderSplitItem[];

// grafico12.json
export type Grafico12Data = YearGenderSplitItem[];

// grafico13.json
export type Grafico13Data = GenderSplitItem[];

// grafico14.json
export type Grafico14Data = GenderSplitItem[];

// grafico15.json
export type Grafico15Data = GenderSplitItem[];

// grafico16.json
export type Grafico16Data = GenderSplitItem[];

// grafico16_1.json
export type Grafico16_1Data = GenderSplitItem[];

// grafico17.json
export type Grafico17Data = GenderSplitItem[];

// grafico18.json
export interface Grafico18Region {
  label: string;
  values: number[];
}
export interface Grafico18Data {
  years: string[];
  regions: Grafico18Region[];
}

// -----------------------------
// Dados de internacionalização (int_*.json)
// -----------------------------

// int_anos.json
export type IntAnosData = LabelValueItem[];

// int_areas.json
export type IntAreasData = LabelValueItem[];

// int_cidades.json
export type IntCidadesData = LabelValueItem[];

// int_paises.json
export type IntPaisesData = LabelValueItem[];

// int_sankey.json
export interface SankeyNode {
  name: string;
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

export interface IntSankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}
