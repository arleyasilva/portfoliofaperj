// ========================================================================
// 📘 TIPOS OFICIAIS DO PORTFÓLIO FAPERJ — Dashboard Institucional
// ========================================================================

// ------------------------------------------------------------------------
// 1. Tipos genéricos simples
// ------------------------------------------------------------------------

export interface LabelValue {
  label: string;
  value: number;
  color?: string; // Usado em gráficos de pizza/microáreas
}

// ------------------------------------------------------------------------
// 2. Tipos para estatísticas gerais
// ------------------------------------------------------------------------

export interface StatsCardItem {
  value: number;
  label: string;
  isCurrency?: boolean;
}

export interface StatsData {
  valorTotal: number;
  cardData: StatsCardItem[];
  sourceText: string;
}

// ------------------------------------------------------------------------
// 3. Tipos auxiliares (mocks ou dados estáticos)
// ------------------------------------------------------------------------

export interface AreaDistributionData {
  name: string;
  value: number;
}

export interface MonthlyProjectsData {
  name: string;
  projetosAtivos: number;
  projetosInativos: number;
}

export interface TrendData {
  period: string;
  value: number;
}

export interface HighlightData {
  area: string;
  description: string;
  trend: TrendData[];
}

export interface MockStatsData {
  projetos: number;
  editais: number;
  pesquisasContempladas: number;
  bolsas: number;
  fomentos: number;
}

// ------------------------------------------------------------------------
// 4. Gráfico 1 — Área + Total
// ------------------------------------------------------------------------

export interface Grafico1Item {
  area: string;
  total: number;
}

export type Grafico1Data = Grafico1Item[];

// ------------------------------------------------------------------------
// 5. Gráficos simples (label + value)
// ------------------------------------------------------------------------

export type Grafico2Data = LabelValue[];
export type Grafico5Data = LabelValue[];
export type Grafico7Data = LabelValue[];
export type Grafico8Data = LabelValue[];
export type Grafico9Data = LabelValue[];
export type Grafico9_1Data = LabelValue[];
export type Grafico10Data = LabelValue[];

// ------------------------------------------------------------------------
// 5-B. Gráfico 3 — Bolsas, Auxílios e Total
// ------------------------------------------------------------------------

export interface Grafico3Item {
  label: string;
  bolsas: number;
  auxilios: number;
  total: number;
}

export type Grafico3Data = Grafico3Item[];

// ------------------------------------------------------------------------
// 5-C. Gráfico 4 — Bolsas e Auxílios
// ------------------------------------------------------------------------

export interface Grafico4Item {
  label: string;
  bolsas: number;
  auxilios: number;
}

export type Grafico4Data = Grafico4Item[];

// ------------------------------------------------------------------------
// 5-D. Gráfico 6 — Quantidade + Valor
// ------------------------------------------------------------------------

export interface Grafico6Item {
  label: string;
  quantidade: number;
  valor: number;
}

export type Grafico6Data = Grafico6Item[];

// ------------------------------------------------------------------------
// 6. Gráficos segregados por sexo (F/M)
// ------------------------------------------------------------------------

export interface GraficoSexoAno {
  label: string; // ano
  feminino: number;
  masculino: number;
  naoDefinido?: number; // opcional para novos dados
}

export type Grafico11Data = GraficoSexoAno[];
export type Grafico12Data = GraficoSexoAno[];
export type Grafico13Data = GraficoSexoAno[];
export type Grafico14Data = GraficoSexoAno[];
export type Grafico15Data = GraficoSexoAno[];
export type Grafico16Data = GraficoSexoAno[];
export type Grafico16_1Data = GraficoSexoAno[];
export type Grafico17Data = GraficoSexoAno[];

// ------------------------------------------------------------------------
// 7. Regionalização — gráfico 18 e line race
// ------------------------------------------------------------------------

export interface RegionalizacaoRegiao {
  label: string;
  values: number[];
}

export interface Grafico18Data {
  years: string[];
  regions: RegionalizacaoRegiao[];
}

export type GraficoLineRaceData = Grafico18Data;

// ------------------------------------------------------------------------
// 8. Internacionalização — Evolução Anual
// ------------------------------------------------------------------------

export interface IntAnosData {
  label: string;
  value: number;
}

export type IntAnosResponse = IntAnosData[];

// ------------------------------------------------------------------------
// 9. Internacionalização — Instituições por Cidade
// ------------------------------------------------------------------------

export interface IntCidadesData {
  label: string;
  value: number;
}

export type IntCidadesResponse = IntCidadesData[];

// ------------------------------------------------------------------------
// 10. Internacionalização — Instituições por País
// ------------------------------------------------------------------------

export interface IntPaisesData {
  label: string;
  value: number;
}

export type IntPaisesResponse = IntPaisesData[];

// ------------------------------------------------------------------------
// 11. Internacionalização — Sankey
// ------------------------------------------------------------------------

export interface IntSankeyNode {
  name: string;
}

export interface IntSankeyLink {
  source: string;
  target: string;
  value: number;
}

export interface IntSankeyData {
  nodes: IntSankeyNode[];
  links: IntSankeyLink[];
}

// ------------------------------------------------------------------------
// 12. Internacionalização — Instituições por Áreas
// ------------------------------------------------------------------------

export interface IntAreasItem {
  label: string;
  value: number;
}

export type IntAreasData = IntAreasItem[];

// ========================================================================
// 🔚 FIM DO ARQUIVO — Totalmente atualizado e validado
// ========================================================================
