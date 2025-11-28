import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, Typography, CircularProgress, Box, Alert } from "@mui/material";
import useFaperjData from "@/hooks/useFaperjData";
import { Grafico2Data } from "@/types/faperj";

type PieTooltipParams = {
  data: {
    label: string;
    value: number;
  };
};

const Grafico2: React.FC = () => {
  const { data, loading, error } = useFaperjData<Grafico2Data>("grafico2");

  if (loading)
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return <Alert severity="error">Erro ao carregar dados do gráfico 2.</Alert>;

  if (!data || data.length === 0)
    return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

  const option = {
    animationDuration: 800,

    tooltip: {
      trigger: "item",
      backgroundColor: "#fff",
      borderColor: "rgba(0,0,0,0.15)",
      borderWidth: 1,
      borderRadius: 6,
      textStyle: { color: "#000", fontSize: 13 },
      formatter: (p: PieTooltipParams) => `
        <strong>${p.data.label}</strong><br/>
        Investimento: <strong>R$ ${p.data.value.toLocaleString("pt-BR")}</strong>
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
        radius: "60%",
        center: ["40%", "55%"],

        data: data.map((item) => ({
          name: item.label,
          value: item.value,
          label: item.label,
          itemStyle: {
            color: item.color ?? "#2989b5", // fallback seguro
          },
        })),

        label: {
          color: "#000",
          fontSize: 11,
          formatter: (param: any) => param.data.label,
        },

        emphasis: {
          itemStyle: {
            shadowBlur: 15,
            shadowOffsetX: 0,
            shadowColor: "rgba(0,0,0,0.25)",
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
      <Typography
        variant="h6"
        fontWeight={700}
        color="#124b6c"
        sx={{ textAlign: "left", mb: 1, fontSize: "18px" }}
      >
        Distribuição do Valor Total por Microáreas
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: "rgba(0,0,0,0.1)",
          mb: 2,
        }}
      />

      <Box sx={{ flexGrow: 1 }}>
        <ReactECharts option={option} style={{ width: "100%", height: "100%" }} />
      </Box>

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
