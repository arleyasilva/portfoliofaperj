import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, Typography, CircularProgress, Box, Alert } from "@mui/material";
import useFaperjData from "@/hooks/useFaperjData";

const Grafico2 = () => {
  const { data, loading, error } = useFaperjData("grafico2");

  if (loading)
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Alert severity="error">Erro ao carregar dados do gráfico 2.</Alert>
    );

  if (!data)
    return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

  const option = {
    animationDuration: 800,

    tooltip: {
      trigger: "item",
      formatter: (p: any) => `
        <strong>${p.data.label}</strong><br/>
        Investimento: <strong>R$ ${p.data.value.toLocaleString("pt-BR")}</strong>
      `,
    },

    legend: {
      orient: "vertical",
      right: 10,
      top: "center",
    },

    series: [
      {
        type: "pie",
        radius: "60%",
        data: data.map((item: any) => ({
          name: item.label,
          value: item.value,
          label: item.label,
          itemStyle: { color: item.color },
        })),
        label: {
          formatter: (param: any) => param.data.label,
          fontSize: 11,
          width: 110,
          overflow: "break",
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 15,
            shadowOffsetX: 0,
            shadowColor: "rgba(0,0,0,0.3)",
          },
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
        Distribuição do Valor Total por Microáreas
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

export default Grafico2;
