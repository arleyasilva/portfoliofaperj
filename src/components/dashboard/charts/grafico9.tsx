import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, Typography, Box, CircularProgress, Alert } from "@mui/material";

import useFaperjData from "@/hooks/useFaperjData";
import { Grafico9Data } from "@/types/faperj";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

// Abreviação institucional
const abreviarValor = (v: number): string => {
  if (v >= 1_000_000_000) return (v / 1_000_000_000).toFixed(1).replace(".0", "") + " bi";
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(0) + " mi";
  return v.toLocaleString("pt-BR");
};

const Grafico9: React.FC = () => {
  const { data, loading, error } = useFaperjData<Grafico9Data>("grafico9");

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
          const p = params[0].data;
          return `
            <strong>Ano ${p.label}</strong><br/>
            Valor Total: <strong>R$ ${p.value.toLocaleString("pt-BR")}</strong>
          `;
        },
      },

      xAxis: {
        type: "category",
        data: data.map((i) => i.label),
        axisLabel: { fontSize: 12 },
      },

      yAxis: {
        type: "value",
        axisLabel: {
          formatter: (v: number) => abreviarValor(v),
        },
        splitLine: {
          lineStyle: { type: "dashed", color: "#ddd" },
        },
      },

      series: [
        {
          name: "Bolsas",
          type: "line",
          smooth: true,
          data: data.map((i) => ({
            value: i.value,
            label: i.label,
          })),
          lineStyle: { width: 3, color: "#2989b5" },
          itemStyle: { color: "#2989b5" },
          symbolSize: 7,
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

  if (error) return <Alert severity="error">Erro ao carregar os dados.</Alert>;
  if (!data) return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

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
        Valor Total de Bolsas por Ano
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

export default Grafico9;
