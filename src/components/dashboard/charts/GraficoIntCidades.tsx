import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, Typography, Box, CircularProgress, Alert } from "@mui/material";
import useFaperjData from "@/hooks/useFaperjData";

const GraficoIntCidades = () => {
  const { data, loading, error } = useFaperjData("int_cidades");

  if (loading)
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );

  if (error) return <Alert severity="error">Erro ao carregar os dados.</Alert>;
  if (!data) return <Alert severity="warning">Dados indisponíveis.</Alert>;

  // Paleta suave e profissional
  const colors = [
    "#5A8FDC",
    "#76B5C5",
    "#A3D1C6",
    "#F2C879",
    "#E8956F",
    "#C47AC0",
    "#7A6FF0",
    "#63C28F",
    "#93A9D1",
    "#B5C4DD",
    "#8BA3A8",
    "#A0A0A0",
  ];

  const option = {
    grid: {
      left: 130,
      right: 30,
      top: 60,
      bottom: 40,
    },

    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(0,0,0,0.75)",
      textStyle: { color: "#fff" },
      borderRadius: 6,
      formatter: (p: any) => `
        <strong>${p.data.label}</strong><br/>
        Instituições: <strong>${p.data.value}</strong>
      `,
    },

    xAxis: {
      type: "value",
      axisLabel: { fontSize: 12 },
      splitLine: {
        lineStyle: { type: "dashed", color: "#ccc" },
      },
    },

    yAxis: {
      type: "category",
      data: data.map((i: any) => i.label),
      axisLabel: { fontSize: 12 },
    },

    series: [
      {
        type: "bar",
        barWidth: "45%",
        data: data.map((i: any, idx: number) => ({
          value: i.value,
          label: i.label,
          itemStyle: { color: colors[idx % colors.length] },
        })),
        label: {
          show: true,
          position: "right",
          formatter: "{c}",
          color: "#333",
          fontSize: 12,
        },
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
      {/* TÍTULO PADRÃO */}
      <Typography
        variant="h6"
        fontWeight={700}
        color="#124b6c"
        sx={{ textAlign: "left", mb: 1, fontSize: "18px" }}
      >
        Instituições por Cidade
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
        Fonte: Sistema de Bolsas e Auxílios – SBA / FAPERJ (Colaborações Internacionais)
      </Typography>
    </Card>
  );
};

export default GraficoIntCidades;
