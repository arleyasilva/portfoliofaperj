import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, Typography, CircularProgress, Box, Alert } from "@mui/material";
import useFaperjData from "@/hooks/useFaperjData";
import { Grafico2Data } from "@/types/faperj";
import { SeriesLabelFormatterParam } from "@/types/echarts";

interface PieTooltipParams {
  data: {
    label: string;
    value: number;
  };
}

const Grafico2: React.FC = () => {
  const { data, loading, error } = useFaperjData<Grafico2Data>("grafico2");

  if (loading)
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return <Alert severity="error">Erro ao carregar dados do gráfico 2.</Alert>;

  if (!data || data.length === 0)
    return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

  // Detectar se é mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const option = {
    animationDuration: 800,

    tooltip: {
      trigger: "item",
      backgroundColor: "#fff",
      borderColor: "rgba(0,0,0,0.15)",
      borderWidth: 1,
      borderRadius: 8,
      padding: isMobile ? 8 : 12,
      textStyle: { color: "#000", fontSize: isMobile ? 11 : 15 },
      confine: true, // Mantém tooltip dentro dos limites do gráfico
      position: function (point: number[], params: any, dom: any, rect: any, size: any) {
        // Ajusta posição para não sair da tela
        const x = point[0] < size.viewSize[0] / 2 ? point[0] + 10 : point[0] - size.contentSize[0] - 10;
        const y = point[1] < size.viewSize[1] / 2 ? point[1] + 10 : point[1] - size.contentSize[1] - 10;
        return [x, y];
      },
      formatter: (p: PieTooltipParams) => `
        <strong style="font-size: ${isMobile ? '12px' : '16px'}">${p.data.label}</strong><br/>
        <span style="font-size: ${isMobile ? '10px' : '14px'}">Investimento: <strong>R$ ${p.data.value.toLocaleString("pt-BR")}</strong></span>
      `,
    },

    legend: {
      orient: isMobile ? "horizontal" : "vertical",
      ...(isMobile
        ? {
            bottom: 0,
            left: "center",
            textStyle: { fontSize: 10 },
          }
        : {
            right: 10,
            top: "center",
            textStyle: { fontSize: 15 },
          }),
    },

    series: [
      {
        type: "pie",
        radius: isMobile ? "45%" : "70%",
        center: isMobile ? ["50%", "35%"] : ["40%", "50%"],

        data: data.map((item) => ({
          name: item.label,
          value: item.value,
          label: item.label,
          itemStyle: {
            color: item.color ?? "#2989b5", // fallback seguro
          },
        })),

        label: {
          show: true, // Mostrar labels em todos os dispositivos
          color: "#000",
          fontSize: isMobile ? 9 : 14,
          formatter: (param: SeriesLabelFormatterParam) => param.data.label || param.name,
          overflow: 'truncate',
        },

        emphasis: {
          itemStyle: {
            shadowBlur: 15,
            shadowOffsetX: 0,
            shadowColor: "rgba(0,0,0,0.25)",
          },
        },
      },
    ],
  };

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: 3,
        height: { xs: 500, sm: 430 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        color="#124b6c"
        sx={{ textAlign: "left", mb: 1, fontSize: "18px" }}
      >
        Distribuição do Valor Total por Microáreas
      </Typography>

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

export default Grafico2;
