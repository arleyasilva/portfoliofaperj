// src/components/dashboard/charts/grafico5.tsx
import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, Typography, Box, CircularProgress, Alert } from "@mui/material";
import useFaperjData from "@/hooks/useFaperjData";

const Grafico5 = () => {
  const { data, loading, error } = useFaperjData("grafico5");

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
      left: 60,
      right: 20,
      bottom: 60,
    },

    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const item = params[0].data;
        return `
          <strong>Ano ${item.label}</strong><br/>
          Projetos Contemplados: <strong>${item.value.toLocaleString("pt-BR")}</strong>
        `;
      },
    },

    xAxis: {
      type: "category",
      data: data.map((item: any) => item.label),
      axisLabel: { fontSize: 11 },
    },

    yAxis: {
      type: "value",
      axisLabel: {
        fontSize: 11,
        formatter: (v: number) =>
          v >= 1_000_000
            ? `${(v / 1_000_000).toFixed(0)} mi`
            : v >= 1_000
            ? `${(v / 1_000).toFixed(0)} mil`
            : v,
      },
    },

    series: [
      {
        name: "Projetos",
        type: "line",
        smooth: true,
        data: data.map((item: any) => ({
          value: item.value,
          label: item.label,
        })),
        itemStyle: { color: "#2989b5" },
        lineStyle: { color: "#2989b5", width: 3 },
        symbolSize: 7,
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
      {/* TÍTULO */}
      <Typography
        variant="h6"
        fontWeight={700}
        color="#124b6c"
        sx={{ textAlign: "left", mb: 1, fontSize: "18px" }}
      >
        Projetos Contemplados por Ano
      </Typography>

      {/* LINHA SUAVE */}
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
        <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
      </Box>

      {/* FONTE */}
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

export default Grafico5;
