// src/components/dashboard/charts/grafico18.tsx
import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, Typography, Box, CircularProgress, Alert } from "@mui/material";
import useFaperjData from "@/hooks/useFaperjData";

const Grafico18 = () => {
  const { data, loading, error } = useFaperjData("grafico18");

  if (loading)
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Alert severity="error">Erro ao carregar os dados.</Alert>;
  if (!data) return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

  const { years, regions } = data;

  const option = {
    grid: {
      top: 40,
      left: 60,
      right: 30,
      bottom: 60
    },

    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(18,75,108,0.9)",
      textStyle: { color: "#fff" },
      borderRadius: 6,
      formatter: (params: any[]) => {
        let html = `<strong>${params[0].axisValue}</strong><br/>`;
        params.forEach((p: any) => {
          html += `${p.seriesName}: R$ ${p.value.toLocaleString("pt-BR")}<br/>`;
        });
        return html;
      }
    },

    legend: {
      top: 0,
      data: regions.map((r: any) => r.label)
    },

    xAxis: {
      type: "category",
      data: years,
      axisLabel: { fontSize: 12 }
    },

    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (v: number) =>
          v >= 1_000_000
            ? `${(v / 1_000_000).toFixed(0)} mi`
            : v.toLocaleString("pt-BR")
      }
    },

    series: regions.map((region: any) => ({
      name: region.label,
      type: "line",
      smooth: true,
      symbolSize: 6,
      data: region.values,
      lineStyle: {
        width: 3
      }
    }))
  };

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: 3,
        height: 430,
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Título */}
      <Typography
        variant="h6"
        fontWeight={700}
        color="#124b6c"
        sx={{ textAlign: "left", mb: 1, fontSize: "18px" }}
      >
        Regionalização – Evolução Anual por Região (2019–2024)
      </Typography>

      {/* Linha divisória */}
      <Box
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: "rgba(0,0,0,0.1)",
          mb: 2
        }}
      />

      {/* Gráfico */}
      <Box sx={{ flexGrow: 1 }}>
        <ReactECharts option={option} style={{ width: "100%", height: "100%" }} />
      </Box>

      {/* Fonte */}
      <Typography
        variant="caption"
        sx={{ mt: 1, color: "rgba(0,0,0,0.6)", fontStyle: "italic" }}
      >
        Fonte: Sistema de Bolsas e Auxílios – SBA / FAPERJ (2019–2024)
      </Typography>
    </Card>
  );
};

export default Grafico18;
