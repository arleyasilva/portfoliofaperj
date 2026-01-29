import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, Box, Typography, CircularProgress, Alert } from "@mui/material";

import useFaperjData from "@/hooks/useFaperjData";
import { Grafico5Data } from "@/types/faperj";
import { TooltipFormatterParams } from "@/types/echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

// Função para abreviar quantidades (k = mil)
const abreviarQuantidade = (num: number): string => {
  if (num >= 1000) return (num / 1000).toFixed(1).replace(".0", "") + "k";
  return num.toString();
};

const Grafico5: React.FC = () => {
  const { data, loading, error } = useFaperjData<Grafico5Data>("grafico5");

  const option = useMemo(() => {
    if (!data) return {};

    return {
      tooltip: {
        trigger: "item",
        formatter: (p: TooltipFormatterParams) => {
          if (!Array.isArray(p) && typeof p.data === 'object' && 'label' in p.data && 'value' in p.data) {
            const data = p.data as { label: string; value: number };
            return `
              <strong>${data.label}</strong><br/>
              Quantidade: <strong>${data.value.toLocaleString("pt-BR")}</strong>
            `;
          }
          return '';
        },
      },

      grid: {
        top: 40,
        left: 30,
        right: 30,
        bottom: 30,
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
          formatter: (value: number) => abreviarQuantidade(value),
        },
      },

      series: [
        {
          name: "Quantidade",
          type: "bar",
          data: data.map((item) => ({
            label: item.label,
            value: item.value,
          })),
          itemStyle: { color: "#1b77b3" },
          barWidth: "50%",
        },
      ],
    };
  }, [data]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Erro ao carregar dados do gráfico 5.</Alert>;
  }

  if (!data || data.length === 0) {
    return <Alert severity="warning">Nenhum dado encontrado.</Alert>;
  }

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
        sx={{ textAlign: "left", mb: 1, fontSize: "18px" }}
      >
        Quantidade de Auxílios por Ano
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
        <ReactECharts option={option} style={{ width: "100%", height: "100%" }} />
      </Box>

      {/* FONTE */}
      <Typography
        variant="caption"
        sx={{ mt: 1, color: "rgba(0,0,0,0.6)", fontStyle: "italic" }}
      >
        Fonte: Sistema de Bolsas e Auxílios – SBA / FAPERJ [2019 – 2025]
      </Typography>
    </Card>
  );
};

export default Grafico5;
