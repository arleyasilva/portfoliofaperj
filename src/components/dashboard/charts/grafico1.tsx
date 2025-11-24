import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, Typography, CircularProgress, Box, Alert } from "@mui/material";
import useFaperjData from "@/hooks/useFaperjData";

const Grafico1 = () => {
  const { data, loading, error } = useFaperjData("grafico1");

  if (loading)
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Alert severity="error">Erro ao carregar dados.</Alert>;
  if (!data) return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

  const option = {
    animationDuration: 800,

    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const item = params[0]?.data;
        return `
          <strong>${item.area}</strong><br/>
          Total: <strong>R$ ${item.total.toLocaleString("pt-BR")}</strong>
        `;
      },
    },

    xAxis: {
      type: "category",
      data: data.map((i: any) => i.area),
      axisLabel: {
        interval: 0,
        fontSize: 11,
        overflow: "break",
        width: 80,
      },
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
        data: data.map((i: any) => ({
          value: i.total,
          area: i.area,
          total: i.total,
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
        Valor Total por Área de Conhecimento
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
