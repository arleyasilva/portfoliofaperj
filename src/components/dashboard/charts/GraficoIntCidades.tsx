import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, Typography, Box, CircularProgress, Alert } from "@mui/material";

import useFaperjData from "@/hooks/useFaperjData";
import { IntCidadesData } from "@/types/faperj";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

// Paleta profissional e consistente
const colors = [
  "#2989b5",
  "#5F93CF",
  "#7CB342",
  "#FBC02D",
  "#E57373",
  "#8E44AD",
  "#63C28F",
  "#A3D1C6",
  "#B5C4DD",
  "#93A9D1",
  "#BA68C8",
  "#A0A0A0",
];

const GraficoIntCidades: React.FC = () => {
  const { data, loading, error } = useFaperjData<IntCidadesData[]>("int_cidades");

  const option = useMemo(() => {
    if (!data) return {};

    return {
      grid: {
        left: 30,
        right: 30,
        top: 70,
        bottom: 40,
        containLabel: true,
      },

      tooltip: {
        trigger: "item",
        backgroundColor: "#ffffff",
        borderColor: "rgba(0,0,0,0.15)",
        borderWidth: 1,
        extraCssText: "border-radius:6px; padding:8px;",
        textStyle: { color: "#000", fontSize: 13 },

        formatter: (p: any) => `
          <strong>${p.data.label}</strong><br/>
          Instituições: <strong>${p.data.value}</strong>
        `,
      },

      xAxis: {
        type: "value",
        axisLabel: { fontSize: 12, color: "#555" },
        splitLine: {
          lineStyle: { type: "dashed", color: "#ccc" },
        },
      },

      yAxis: {
        type: "category",
        data: data.map((i) => i.label),
        axisLabel: { fontSize: 12, color: "#124b6c" },
      },

      series: [
        {
          type: "bar",
          barWidth: "45%",
          data: data.map((i, idx) => ({
            value: i.value,
            label: i.label,
            itemStyle: { color: colors[idx % colors.length] },
          })),

          label: {
            show: true,
            position: "right",
            formatter: "{c}",
            color: "#124b6c",
            fontSize: 13,
          },
        },
      ],
    };
  }, [data]);

  if (loading)
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );

  if (error) return <Alert severity="error">Erro ao carregar os dados.</Alert>;
  if (!data) return <Alert severity="warning">Dados indisponíveis.</Alert>;

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
      {/* 🟦 TÍTULO */}
      <Typography
        variant="h6"
        fontWeight={700}
        color="#124b6c"
        sx={{ textAlign: "left", mb: 1, fontSize: "18px" }}
      >
        Instituições por Cidade
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
        Fonte: Assessoria Internacional - ASSINT / FAPERJ [2025]
      </Typography>
    </Card>
  );
};

export default GraficoIntCidades;
