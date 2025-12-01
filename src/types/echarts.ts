// Tipos para ECharts formatters e callbacks

export interface TooltipFormatterParam {
  componentType: 'series';
  seriesType: string;
  seriesIndex: number;
  seriesName: string;
  name: string;
  dataIndex: number;
  data: number | { value: number; name?: string; [key: string]: unknown };
  value: number | number[];
  color: string;
  marker: string;
  percent?: number;
}

export type TooltipFormatterParams = TooltipFormatterParam | TooltipFormatterParam[];

export interface AxisLabelFormatterParam {
  value: number | string;
  index: number;
}

export interface SeriesLabelFormatterParam {
  name: string;
  value: number | number[];
  percent?: number;
  dataIndex: number;
  data: { value: number; name?: string; [key: string]: unknown };
}

// Tipos para dados do Sankey
export interface SankeyNodeParam {
  name: string;
  value?: number;
  depth?: number;
  height?: number;
}

export interface SankeyLinkParam {
  source: string;
  target: string;
  value: number;
}

export interface SankeyFormatterParam {
  componentType: 'series';
  seriesType: string;
  name: string;
  dataType: 'node' | 'edge';
  data: SankeyLinkParam | SankeyNodeParam;
  value: number;
  color: string;
  marker: string;
}

// Generic data item para gráficos
export interface ChartDataItem {
  name?: string;
  label?: string;
  value?: number;
  total?: number;
  feminino?: number;
  masculino?: number;
  [key: string]: unknown;
}
