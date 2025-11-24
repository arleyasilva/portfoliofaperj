// src/components/dashboard/charts/GraficoIntSankey.tsx
import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, Typography, Box, CircularProgress, Alert } from "@mui/material";
import useFaperjData from "@/hooks/useFaperjData";

const GraficoIntSankey = () => {
  const { data, loading, error } = useFaperjData("int_sankey");

  if (loading)
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );

  if (error)
    return <Alert severity="error">Erro ao carregar dados do Sankey.</Alert>;

  if (!data)
    return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

  const option = {
    tooltip: {
      trigger: "item",
      formatter: (p: any) => {
        if (p.dataType === "edge") {
          return `
            <strong>${p.data.source} → ${p.data.target}</strong><br/>
            Colaborações: ${p.data.value}
          `;
        }
        return `<strong>${p.data.name}</strong>`;
      },
    },

    series: [
      {
        type: "sankey",
        layout: "none",
        data: data.nodes,
        links: data.links,

        // Mantém as cores automáticas do ECharts
        lineStyle: {
          color: "gradient",
          curveness: 0.4,
        },

        label: {
          fontSize: 12,
          color: "#333",
        },

        nodeGap: 12,
        nodeWidth: 15,
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
        Fluxo de Colaboração Internacional – País ↔ Grande Área
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
        Fonte: Sistema FAPERJ – Cooperação Internacional
      </Typography>
    </Card>
  );
};

export default GraficoIntSankey;
