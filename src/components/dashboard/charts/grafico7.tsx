import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, Typography, Box, CircularProgress, Alert } from "@mui/material";

import useFaperjData from "@/hooks/useFaperjData";
import { Grafico7Data } from "@/types/faperj";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

// Abreviação padrão institucional
const abreviarValor = (v: number): string => {
  if (v >= 1_000_000_000) return (v / 1_000_000_000).toFixed(1).replace(".0", "") + " bi";
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(0) + " mi";
  return v.toLocaleString("pt-BR");
};

const Grafico7 = () => {
  const { data, loading, error } = useFaperjData<Grafico7Data>("grafico7");

  const option = useMemo(() => {
    if (!data) return {};

    return {
      grid: {
        top: 60,
        left: 70,
        right: 30,
        bottom: 60,
        containLabel: true,
      },

      tooltip: {
        trigger: "axis",
        formatter: (params: any[]) => {
          const item = params[0].data;
          return `
            <strong>Ano ${item.label}</strong><br/>
            Auxílios: <strong>R$ ${item.value.toLocaleString("pt-BR")}</strong>
          `;
        },
      },

      xAxis: {
        type: "category",
        data: data.map((i) => i.label),
        axisLabel: { rotate: 0, fontSize: 12 },
      },

      yAxis: {
        type: "value",
        axisLabel: {
          formatter: (v: number) => abreviarValor(v),
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
          itemStyle: { color: "#2989b5" }, // Cor original do gráfico 7
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
      {/* TÍTULO ORIGINAL */}
      <Typography
        variant="h6"
        fontWeight={700}
        color="#124b6c"
        sx={{ textAlign: "left", mb: 1, fontSize: "18px" }}
      >
        Valor de Auxílios por Ano
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

      {/* FONTE PADRÃO */}
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

export default Grafico7;
