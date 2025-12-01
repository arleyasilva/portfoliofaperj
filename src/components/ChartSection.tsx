import React from "react";
import { Box, Card, Typography } from "@mui/material";
import ReactECharts from "echarts-for-react";

import useFaperjData from "@/hooks/useFaperjData";
import { ChartDataItem } from "@/types/echarts";

interface ChartSectionProps {
  title: string;
  fileName: string;
  chartType?: "bar" | "line" | "pie";
}

export default function ChartSection({
  title,
  fileName,
  chartType = "bar",
}: ChartSectionProps) {
  const { data, loading, error } = useFaperjData<ChartDataItem[]>(fileName);

  if (loading)
    return (
      <Typography sx={{ p: 2, mb: 4, textAlign: "center" }}>
        Carregando gráfico...
      </Typography>
    );

  if (error)
    return (
      <Typography color="error" sx={{ p: 2, mb: 4, textAlign: "center" }}>
        Erro ao carregar {fileName}: {error}
      </Typography>
    );

  if (!data)
    return (
      <Typography color="error" sx={{ p: 2, mb: 4, textAlign: "center" }}>
        Dados indisponíveis ({fileName})
      </Typography>
    );

  // AUTO-GERAÇÃO DE GRÁFICO SIMPLES (MODELO)
  const option = {
    xAxis: {
      type: "category",
      data: data.map((d) => d.label || d.name || ''),
    },
    yAxis: { type: "value" },
    series: [
      {
        type: chartType,
        data: data.map((d) => d.value || d.total || d.feminino || d.masculino || 0),
      },
    ],
    tooltip: { trigger: "axis" },
  };

  return (
    <Card sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <ReactECharts option={option} style={{ height: 400 }} />
    </Card>
  );
}
