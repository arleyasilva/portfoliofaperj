// src/components/dashboard/charts/grafico3.tsx
import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, Typography, Box, CircularProgress, Alert } from "@mui/material";
import useFaperjData from "@/hooks/useFaperjData";

const Grafico3 = () => {
  const { data, loading, error } = useFaperjData("grafico3");

  if (loading)
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Alert severity="error">Erro ao carregar os dados.</Alert>;
  if (!data) return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

  // Aplica cálculo caso o JSON não venha com "total"
  const processed = data.map((item: any) => ({
    ...item,
    total: item.total ?? item.bolsas + item.auxilios,
  }));

  const option = {
    grid: {
      top: 40,
      left: 70,
      right: 20,
      bottom: 60,
    },

    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const item = params[0].data;
        return `
          <strong>${item.label}</strong><br/>
          Bolsas: R$ ${item.bolsas.toLocaleString("pt-BR")}<br/>
          Auxílios: R$ ${item.auxilios.toLocaleString("pt-BR")}<br/>
          Total: <strong>R$ ${item.total.toLocaleString("pt-BR")}</strong>
        `;
      },
    },

    xAxis: {
      type: "category",
      data: processed.map((i: any) => i.label),
      axisLabel: { rotate: 35, fontSize: 11 },
    },

    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (v: number) =>
          v >= 1_000_000
            ? `${(v / 1_000_000).toFixed(0)} mi`
            : v.toLocaleString("pt-BR"),
      },
    },

    series: [
      {
        type: "bar",
        data: processed.map((item: any) => ({
          value: item.total,
          ...item,
        })),
        barWidth: "55%",
        itemStyle: { color: "#2989b5" },
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
        sx={{
          textAlign: "left",
          mb: 1,
          fontSize: "18px",
        }}
      >
        Valor Total por Universidades
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

export default Grafico3;
