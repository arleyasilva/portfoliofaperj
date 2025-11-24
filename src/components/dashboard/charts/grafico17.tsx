// src/components/dashboard/charts/grafico17.tsx
import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, Typography, Box, CircularProgress, Alert } from "@mui/material";
import useFaperjData from "@/hooks/useFaperjData";

const Grafico17 = () => {
  const { data, loading, error } = useFaperjData("grafico17");

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
          <strong>Ano ${f.label}</strong><br/>
          Fomentos Femininos: ${f.feminino.toLocaleString("pt-BR")}<br/>
          Fomentos Masculinos: ${m.masculino.toLocaleString("pt-BR")}
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
          v >= 1000 ? `${(v / 1000).toFixed(0)} mil` : v,
      },
    },

    series: [
      {
        name: "Feminino",
        type: "bar",
        data: data.map((i: any) => ({
          value: i.feminino,
          ...i,
        })),
        barWidth: "45%",
        itemStyle: { color: "#FBC02D" },
      },
      {
        name: "Masculino",
        type: "bar",
        data: data.map((i: any) => ({
          value: i.masculino,
          ...i,
        })),
        barWidth: "45%",
        itemStyle: { color: "#5F93CF" },
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
        Quantidade de Fomentos por Sexo e Ano
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
        <ReactECharts option={option} style={{ width: "100%", height: "100%" }} />
      </Box>

      {/* FONTE */}
      <Typography
        variant="caption"
        sx={{ mt: 1, color: "rgba(0,0,0,0.6)", fontStyle: "italic" }}
      >
        Fonte: Sistema de Bolsas e Auxílios – SBA / FAPERJ (2019–2025)
      </Typography>
    </Card>
  );
};

export default Grafico17;
