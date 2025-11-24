// src/components/dashboard/charts/grafico10.tsx

import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, Typography, CircularProgress, Box, Alert } from "@mui/material";
import useFaperjData from "@/hooks/useFaperjData";

const Grafico10 = () => {
  const { data, loading, error } = useFaperjData("grafico10");

  if (loading)
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Alert severity="error">Erro ao carregar os dados.</Alert>;
  if (!data) return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

  const option = {
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(18,75,108,0.9)",
      textStyle: { color: "#fff" },
      borderRadius: 6,
      formatter: (p: any) => `
        <strong>${p.data.label}</strong><br/>
        Valor Total: <strong>R$ ${p.data.value.toLocaleString("pt-BR")}</strong>
      `,
    },

    legend: {
      orient: "vertical",
      right: 10,
      top: "center",
      textStyle: { fontSize: 13 },
    },

    series: [
      {
        type: "pie",
        radius: ["45%", "70%"], // donut elegante
        center: ["40%", "55%"],
        avoidLabelOverlap: true,

        data: data.map((item: any) => ({
          name: item.label,
          label: item.label,
          value: item.value,
        })),

        itemStyle: {
          color: (params: any) =>
            params.data.label === "Feminino" ? "#ff69b4" : "#2989b5",
        },

        emphasis: {
          scale: true,
          scaleSize: 8,
          itemStyle: {
            shadowBlur: 20,
            shadowColor: "rgba(0,0,0,0.25)",
          },
        },

        label: {
          show: false,
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
      {/* TÍTULO ALINHADO À ESQUERDA */}
      <Typography
        variant="h6"
        fontWeight={700}
        color="#124b6c"
        sx={{ textAlign: "left", mb: 1, fontSize: "18px" }}
      >
        Distribuição Total de Fomento por Sexo
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
        <ReactECharts
          option={option}
          style={{ height: "100%", width: "100%" }}
        />
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

export default Grafico10;
