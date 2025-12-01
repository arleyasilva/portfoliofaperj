import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, Box, Typography, CircularProgress, Alert } from "@mui/material";

import useFaperjData from "@/hooks/useFaperjData";
import { Grafico6Data } from "@/types/faperj";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

// Abrevia número (1 bi / 800 mi / etc.)
const abreviarValor = (num: number): string => {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(".0", "") + " bi";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(".0", "") + " mi";
  return num.toLocaleString("pt-BR");
};

const Grafico6: React.FC = () => {
  const { data, loading, error } = useFaperjData<Grafico6Data>("grafico6");

  const option = useMemo(() => {
    if (!data) return {};

    return {
      tooltip: {
        trigger: "axis",
        formatter: (params: any[]) => {
          const bar = params.find((p) => p.seriesType === "bar");
          const line = params.find((p) => p.seriesType === "line");

          return `
            <strong>${bar.data.label}</strong><br/>
            Quantidade: <strong>${bar.data.quantidade}</strong><br/>
            Valor: <strong>R$ ${line.data.toLocaleString("pt-BR")}</strong>
          `;
        },
      },

      legend: {
        top: 0,
        left: "center",
        textStyle: { fontSize: 12 },
      },

      grid: {
        top: 70,
        left: 30,
        right: 30,
        bottom: 30,
        containLabel: true,
      },

      xAxis: {
        type: "category",
        data: data.map((item) => item.label),
      },

      yAxis: [
        {
          type: "value",
          name: "Quantidade",
          axisLabel: {
            formatter: (value: number) => value.toLocaleString("pt-BR"),
          },
        },
        {
          type: "value",
          name: "Valor",
          axisLabel: {
            formatter: (value: number) => abreviarValor(value),
          },
        },
      ],

      series: [
        {
          name: "Quantidade",
          type: "bar",
          yAxisIndex: 0,
          itemStyle: { color: "#1b77b3" },
          data: data.map((item) => ({
            label: item.label,
            quantidade: item.quantidade,
            valor: item.valor,
            value: item.quantidade,
          })),
        },
        {
          name: "Valor",
          type: "line",
          yAxisIndex: 1,
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: { color: "#e67e22", width: 3 },
          itemStyle: { color: "#e67e22" },
          data: data.map((item) => item.valor),
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
    return <Alert severity="error">Erro ao carregar dados do gráfico 6.</Alert>;

  if (!data)
    return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

  return (
    <Card
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: 3,
        height: 430,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Título padrão institucional */}
      <Typography
        variant="h6"
        fontWeight={700}
        color="#124b6c"
        sx={{ textAlign: "left", mb: 1, fontSize: "18px" }}
      >
        Evolução de Quantidade e Valor
      </Typography>

      {/* Linha suave */}
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
        sx={{ mt: 1, color: "rgba(0,0,0,0.6)", fontStyle: "italic" }}
      >
        Fonte: Sistema de Bolsas e Auxílios – SBA / FAPERJ [2019 – 2025]
      </Typography>
    </Card>
  );
};

export default Grafico6;
