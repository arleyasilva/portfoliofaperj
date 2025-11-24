// src/components/dashboard/charts/grafico6.tsx
import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, Typography, CircularProgress, Box, Alert } from "@mui/material";
import useFaperjData from "@/hooks/useFaperjData";

const Grafico6 = () => {
  const { data, loading, error } = useFaperjData("grafico6");

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
      right: 40,
      bottom: 60,
    },

    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const qtd = params.find((p: any) => p.seriesName === "Quantidade").data;
        const val = params.find((p: any) => p.seriesName === "Valor (R$)").data;

        return `
          <strong>${qtd.label}</strong><br/>
          Quantidade: ${qtd.quantidade}<br/>
          Valor: R$ ${val.valor.toLocaleString("pt-BR")}
        `;
      },
    },

    legend: {
      data: ["Quantidade", "Valor (R$)"],
      top: 0,
    },

    xAxis: {
      type: "category",
      data: data.map((i: any) => i.label),
      axisLabel: { fontSize: 11 },
    },

    yAxis: [
      {
        type: "value",
        name: "Qtd",
        axisLabel: { fontSize: 11 },
      },
      {
        type: "value",
        name: "Valor (R$)",
        axisLabel: {
          formatter: (v: number) =>
            v >= 1_000_000 ? `${(v / 1_000_000).toFixed(0)} mi` : v,
          fontSize: 11,
        },
      },
    ],

    series: [
      {
        name: "Quantidade",
        type: "bar",
        data: data.map((i: any) => ({
          value: i.quantidade,
          ...i,
        })),
        barWidth: "45%",
        itemStyle: { color: "#5F93CF" }, // azul suave
      },
      {
        name: "Valor (R$)",
        type: "line",
        yAxisIndex: 1,
        smooth: true,
        data: data.map((i: any) => ({
          value: i.valor,
          ...i,
        })),
        lineStyle: { width: 3, color: "#2CB66D" }, // verde moderno
        itemStyle: { color: "#2CB66D" },
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
        Valor e Quantidade de Projetos por Ano
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
        sx={{ mt: 1, color: "rgba(0,0,0,0.6)", fontStyle: "italic" }}
      >
        Fonte: Sistema de Bolsas e Auxílios – SBA / FAPERJ [2019 – 2025]
      </Typography>
    </Card>
  );
};

export default Grafico6;
