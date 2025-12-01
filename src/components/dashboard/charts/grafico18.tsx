import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, Typography, Box, CircularProgress, Alert } from "@mui/material";

import useFaperjData from "@/hooks/useFaperjData";
import { Grafico18Data } from "@/types/faperj";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

// Abreviação institucional
const abreviar = (v: number): string => {
  if (v >= 1_000_000_000) return (v / 1_000_000_000).toFixed(1) + " bi";
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(0) + " mi";
  return v.toLocaleString("pt-BR");
};

const regionColors = [
  "#2989b5",
  "#5F93CF",
  "#FBC02D",
  "#7CB342",
  "#8E44AD",
  "#D35400",
];

const Grafico18: React.FC = () => {
  const { data, loading, error } = useFaperjData<Grafico18Data>("grafico18");

  const option = useMemo(() => {
    if (!data) return {};

    const { years, regions } = data;

    return {
      grid: {
        top: 70,
        left: 30,
        right: 30,
        bottom: 30,
        containLabel: true,
      },

      tooltip: {
        trigger: "axis",
        backgroundColor: "#ffffff",
        borderColor: "rgba(0,0,0,0.15)",
        borderWidth: 1,
        extraCssText: "border-radius:6px; padding:10px;",
        textStyle: { color: "#000", fontSize: 13 },

        formatter: (params: any[]) => {
          let html = `<strong>${params[0].axisValue}</strong><br/>`;
          params.forEach((p) => {
            html += `${p.marker} ${p.seriesName}: <strong>R$ ${p.value.toLocaleString(
              "pt-BR"
            )}</strong><br/>`;
          });
          return html;
        },
      },

      legend: {
        top: 0,
        data: regions.map((r) => r.label),
      },

      xAxis: {
        type: "category",
        data: years,
        axisLabel: { fontSize: 12 },
      },

      yAxis: {
        type: "value",
        axisLabel: {
          formatter: (v: number) => abreviar(v),
        },
      },

      series: regions.map((region, index) => ({
        name: region.label,
        type: "line",
        smooth: true,
        symbolSize: 7,
        lineStyle: {
          width: 3,
          color: regionColors[index % regionColors.length],
        },
        itemStyle: {
          color: regionColors[index % regionColors.length],
        },
        data: region.values,
      })),
    };
  }, [data]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Alert severity="error">Erro ao carregar os dados.</Alert>;
  if (!data) return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: 3,
        height: 430,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* TÍTULO */}
      <Typography
        variant="h6"
        fontWeight={700}
        color="#124b6c"
        sx={{ textAlign: "left", mb: 1, fontSize: "18px" }}
      >
        Regionalização – Evolução Anual por Região (2019–2024)
      </Typography>

      {/* LINHA */}
      <Box
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: "rgba(0,0,0,0.1)",
          mb: 2,
        }}
      />

      {/* GRÁFICO */}
      <Box sx={{ flexGrow: 1 }}>
        <ReactECharts option={option} style={{ width: "100%", height: "100%" }} />
      </Box>

      {/* FONTE */}
      <Typography
        variant="caption"
        sx={{ mt: 1, color: "rgba(0,0,0,0.6)", fontStyle: "italic" }}
      >
        Fonte: Sistema de Bolsas e Auxílios – SBA / FAPERJ (2019–2024)
      </Typography>
    </Card>
  );
};

export default Grafico18;
