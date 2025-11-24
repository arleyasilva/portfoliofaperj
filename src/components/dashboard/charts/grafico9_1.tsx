// src/components/dashboard/charts/grafico9_1.tsx
import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, Typography, Box, CircularProgress, Alert } from "@mui/material";
import useFaperjData from "@/hooks/useFaperjData";

const Grafico9_1 = () => {
  const { data, loading, error } = useFaperjData("grafico9_1");

  if (loading)
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Alert severity="error">Erro ao carregar os dados.</Alert>;
  if (!data) return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

  const option = {
    grid: {
      top: 40,
      left: 70,
      right: 20,
      bottom: 60,
    },

    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(18, 75, 108, 0.9)",
      textStyle: { color: "#fff" },
      borderRadius: 6,
      formatter: (params: any) => {
        const item = params[0].data;
        return `
          <strong>${item.label}</strong><br/>
          Valor BBP: <strong>R$ ${item.value.toLocaleString("pt-BR")}</strong>
        `;
      },
    },

    xAxis: {
      type: "category",
      data: data.map((i: any) => i.label),
      axisLabel: { fontSize: 12 },
    },

    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (v: number) =>
          v >= 1_000_000 ? `${(v / 1_000_000).toFixed(0)} mi` : v,
      },
      splitLine: {
        lineStyle: { color: "rgba(0,0,0,0.15)", type: "dashed" },
      },
    },

    series: [
      {
        name: "BBP",
        type: "line",
        smooth: true,
        symbolSize: 7,
        lineStyle: { width: 3, color: "#2989b5" },
        itemStyle: { color: "#2989b5" },
        data: data.map((item: any) => ({
          value: item.value,
          label: item.label,
        })),
      },
    ],
  };

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
      {/* Título alinhado à esquerda */}
      <Typography
        variant="h6"
        fontWeight={700}
        color="#124b6c"
        sx={{ textAlign: "left", mb: 1, fontSize: "18px" }}
      >
        Valor de Bolsas de Bancada (BBP) por Ano
      </Typography>

      {/* Linha divisória */}
      <Box
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: "rgba(0,0,0,0.1)",
          mb: 2,
        }}
      />

      {/* Gráfico */}
      <Box sx={{ flexGrow: 1 }}>
        <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
      </Box>

      {/* Fonte */}
      <Typography
        variant="caption"
        sx={{
          mt: 1,
          color: "rgba(0,0,0,0.6)",
          fontStyle: "italic",
        }}
      >
        Fonte: Sistema de Bolsas e Auxílios – SBA / FAPERJ [2019 – 2025]
      </Typography>
    </Card>
  );
};

export default Grafico9_1;
