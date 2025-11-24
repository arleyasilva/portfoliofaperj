import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, Typography, Box, CircularProgress, Alert } from "@mui/material";
import useFaperjData from "@/hooks/useFaperjData";

const GraficoIntAnos = () => {
  const { data, loading, error } = useFaperjData("int_anos");

  if (loading)
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );

  if (error) return <Alert severity="error">Erro ao carregar os dados.</Alert>;
  if (!data) return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

  const option = {
    grid: {
      left: 60,
      right: 20,
      top: 50,
      bottom: 60,
    },

    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,0.75)",
      textStyle: { color: "#fff" },
      borderRadius: 6,
      formatter: (params: any) => {
        const p = params[0];
        return `
          <strong>${p.axisValue}</strong><br/>
          Instituições: <strong>${p.data}</strong>
        `;
      },
    },

    xAxis: {
      type: "category",
      data: data.map((d: any) => d.label),
      axisLabel: { fontSize: 12, rotate: 0 },
    },

    yAxis: {
      type: "value",
      name: "Instituições",
      axisLabel: { fontSize: 12 },
      splitLine: {
        lineStyle: { type: "dashed", color: "#ccc" },
      },
    },

    series: [
      {
        name: "Instituições",
        type: "line",
        smooth: true,
        data: data.map((d: any) => d.value),
        lineStyle: { width: 3, color: "#2989b5" },
        itemStyle: { color: "#2989b5" },
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
      {/* Título */}
      <Typography
        variant="h6"
        fontWeight={700}
        color="#124b6c"
        sx={{ textAlign: "left", mb: 1, fontSize: "18px" }}
      >
        Evolução das Colaborações Internacionais por Ano
      </Typography>

      {/* Linha suave */}
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
        Fonte: Sistema de Bolsas e Auxílios – SBA / FAPERJ [2018 – 2025]
      </Typography>
    </Card>
  );
};

export default GraficoIntAnos;
