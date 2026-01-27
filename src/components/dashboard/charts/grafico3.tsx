import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, Box, Typography, CircularProgress, Alert } from "@mui/material";

import useFaperjData from "@/hooks/useFaperjData";
import { Grafico3Data } from "@/types/faperj";
import { TooltipFormatterParams } from "@/types/echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

interface Grafico3DataItem {
  label: string;
  bolsas: number;
  auxilios: number;
  total: number;
}

// Função para abreviar valores (formato "mi", "bi")
const abreviarValor = (num: number): string => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(".0", "") + " bi";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(".0", "") + " mi";
  }
  return num.toLocaleString("pt-BR");
};

const Grafico3: React.FC = () => {
  const { data, loading, error } = useFaperjData<Grafico3Data>("grafico3");

  const option = useMemo(() => {
    if (!data) return {};

    return {
      tooltip: {
        trigger: "axis",
        formatter: (params: TooltipFormatterParams) => {
          if (Array.isArray(params) && params.length > 0) {
            const item = params[0].data as unknown as Grafico3DataItem;
            return `
              <strong>${item.label}</strong><br/>
              Bolsas: <strong>R$ ${item.bolsas.toLocaleString("pt-BR")}</strong><br/>
              Auxílios: <strong>R$ ${item.auxilios.toLocaleString("pt-BR")}</strong><br/>
              Total: <strong>R$ ${item.total.toLocaleString("pt-BR")}</strong>
            `;
          }
          return '';
        },
      },

      legend: {
        top: 0,
        left: "center",
      },

      // Ajuste para o gráfico não estourar o container
      grid: {
        top: 70,
        left: 30,
        right: 30,
        bottom: 20,
        containLabel: true,
      },

      xAxis: {
        type: "category",
        data: data.map((item) => item.label),
        axisLabel: { rotate: 20 },
      },

      yAxis: {
        type: "value",
        axisLabel: {
          formatter: (value: number) => abreviarValor(value),
        },
      },

      series: [
        {
          name: "Bolsas",
          type: "bar",
          itemStyle: { color: "#1b77b3" },
          data: data.map((item) => ({ ...item, value: item.bolsas })),
        },
        {
          name: "Auxílios",
          type: "bar",
          itemStyle: { color: "#21a179" },
          data: data.map((item) => ({ ...item, value: item.auxilios })),
        },
        {
          name: "Total",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: {
            color: "#e67e22",
            width: 3,
          },
          data: data.map((item) => item.total),
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
    return <Alert severity="error">Erro ao carregar dados do gráfico 3.</Alert>;

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
      {/* TÍTULO PADRÃO */}
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
        Distribuição de Bolsas e Auxílios por Universidades
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
        <ReactECharts
          option={option}
          style={{ width: "100%", height: "100%" }}
        />
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

export default Grafico3;
