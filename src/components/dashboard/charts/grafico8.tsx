import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, Typography, CircularProgress, Box, Alert } from "@mui/material";

import useFaperjData from "@/hooks/useFaperjData";
import { Grafico8Data } from "@/types/faperj";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

// Abreviação institucional
const abreviarValor = (v: number): string => {
  if (v >= 1_000_000_000) return (v / 1_000_000_000).toFixed(1).replace(".0", "") + " bi";
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(0) + " mi";
  return v.toLocaleString("pt-BR");
};

const Grafico8: React.FC = () => {
  const { data, loading, error } = useFaperjData<Grafico8Data>("grafico8");

  const option = useMemo(() => {
    if (!data) return {};

    return {
      grid: {
        top: 70,
        left: 30,
        right: 30,
        bottom: 30,
        containLabel: true,
      },

      tooltip: {
        trigger: "axis",
        formatter: (params: any[]) => {
          const item = params[0].data;
          return `
            <strong>${item.label}</strong><br/>
            Valor: <strong>R$ ${item.value.toLocaleString("pt-BR")}</strong>
          `;
        },
      },

      xAxis: {
        type: "category",
        data: data.map((item) => item.label),
        axisLabel: { rotate: 35, fontSize: 12 },
      },

      yAxis: {
        type: "value",
        axisLabel: {
          formatter: (value: number) => abreviarValor(value),
        },
      },

      series: [
        {
          type: "bar",
          name: "Auxílios",
          data: data.map((item) => ({
            label: item.label,
            value: item.value,
          })),
          barWidth: "55%",
          itemStyle: { color: "#2989b5" }, // cor original do gráfico 8
        },
      ],
    };
  }, [data]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return <Alert severity="error">Erro ao carregar os dados.</Alert>;

  if (!data)
    return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

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
      {/* TÍTULO — COM TEMA ORIGINAL */}
      <Typography
        variant="h6"
        fontWeight={700}
        color="#124b6c"
        sx={{ textAlign: "left", mb: 1, fontSize: "18px" }}
      >
        Valor de Auxílios por Modalidade
      </Typography>

      {/* LINHA SUAVE PADRÃO */}
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

      {/* FONTE — PADRÃO INSTITUCIONAL */}
      <Typography
        variant="caption"
        sx={{ mt: 1, color: "rgba(0,0,0,0.6)", fontStyle: "italic" }}
      >
        Fonte: Sistema de Bolsas e Auxílios – SBA / FAPERJ [2019 – 2025]
      </Typography>
    </Card>
  );
};

export default Grafico8;
