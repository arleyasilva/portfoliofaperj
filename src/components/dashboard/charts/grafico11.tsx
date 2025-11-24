// src/components/dashboard/charts/grafico11.tsx

import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, Typography, CircularProgress, Box, Alert } from "@mui/material";
import useFaperjData from "@/hooks/useFaperjData";

const Grafico11 = () => {
  const { data, loading, error } = useFaperjData("grafico11");

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
      backgroundColor: "rgba(18,75,108,0.9)",
      textStyle: { color: "#fff" },
      borderRadius: 6,
      formatter: (params: any) => {
        const f = params.find((p: any) => p.seriesName === "Feminino").data;
        const m = params.find((p: any) => p.seriesName === "Masculino").data;

        return `
          <strong>${f.label}</strong><br/>
          Feminino: R$ ${f.feminino.toLocaleString("pt-BR")}<br/>
          Masculino: R$ ${m.masculino.toLocaleString("pt-BR")}
        `;
      },
    },

    legend: {
      data: ["Feminino", "Masculino"],
      top: 0,
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
          v >= 1_000_000_000
            ? `${(v / 1_000_000_000).toFixed(1)} bi`
            : v >= 1_000_000
            ? `${(v / 1_000_000).toFixed(0)} mi`
            : v.toLocaleString("pt-BR"),
      },
    },

    series: [
      {
        name: "Feminino",
        type: "line",
        smooth: true,
        symbolSize: 7,
        data: data.map((item: any) => ({
          value: item.feminino,
          ...item,
        })),
        itemStyle: { color: "#ff69b4" },
        lineStyle: { width: 3, color: "#ff69b4" },
      },
      {
        name: "Masculino",
        type: "line",
        smooth: true,
        symbolSize: 7,
        data: data.map((item: any) => ({
          value: item.masculino,
          ...item,
        })),
        itemStyle: { color: "#2989b5" },
        lineStyle: { width: 3, color: "#2989b5" },
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
        Valor de Fomento por Sexo e Ano
      </Typography>

      {/* LINHA DIVISÓRIA */}
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
        sx={{
          mt: 1,
          color: "rgba(0,0,0,0.6)",
          fontStyle: "italic",
        }}
      >
        Fonte: Sistema de Bolsas e Auxílios – SBA / FAPERJ (2019–2025)
      </Typography>
    </Card>
  );
};

export default Grafico11;
