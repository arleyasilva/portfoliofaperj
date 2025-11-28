// src/components/dashboard/charts/grafico1.tsx
import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, Typography, Box, CircularProgress, Alert } from "@mui/material";
import useFaperjData from "@/hooks/useFaperjData";
import { Grafico1Item } from "@/types/faperj";

const Grafico1 = () => {
  const { data, loading, error } = useFaperjData<Grafico1Item[]>("grafico1");

  if (loading)
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );

  if (error)
    return <Alert severity="error">Erro ao carregar dados do gráfico 1.</Alert>;

  if (!data)
    return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

  // 🔹 Agora data é ARRAY e tipado corretamente
  const categorias = data.map((item) => item.area);
  const valores = data.map((item) => item.total);

  const option = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "#fff",
      borderColor: "#ccc",
      borderWidth: 1,
      textStyle: { color: "#333" },
      formatter: (params: any) => {
        const p = params[0];
        return `
          <strong>${p.name}</strong><br/>
          Total: <strong>${p.value.toLocaleString("pt-BR")}</strong>
        `;
      },
    },

    grid: {
      top: 70,
      left: 30,
      right: 30,
      bottom: 30,
      containLabel: true,
    },

    xAxis: {
      type: "category",
      data: categorias,
      axisLabel: { rotate: 20 },
    },

    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (v: number) => {
          if (v >= 1_000_000_000) return (v / 1_000_000_000).toFixed(1) + "B";
          if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + "M";
          if (v >= 1_000) return (v / 1_000).toFixed(1) + "K";
          return v;
        },
      },
    },

    series: [
      {
        type: "bar",
        data: valores,
        itemStyle: { color: "#2989b5" },
        barWidth: "55%",
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
        Distribuição de Recursos por Grande Área
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

export default Grafico1;
