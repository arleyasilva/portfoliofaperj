import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Box, Card, Typography, CircularProgress, Alert } from "@mui/material";
import useFaperjData from "@/hooks/useFaperjData";
import { Grafico18Data } from "@/types/faperj";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

const formatValor = (n: number) => "R$ " + n.toLocaleString("pt-BR");

export const regionColors: Record<string, string> = {
  "Metropolitana 1": "#2989b5",
  "Metropolitana 2": "#5F93CF",
  Norte: "#8E44AD",
  Serrana: "#7CB342",
  "Médio Paraíba": "#FBC02D",
  "Baixada Litorânea": "#E57373",
  "Centro-Sul": "#D35400",
  "Baía da Ilha Grande": "#16A085", // NOVA REGIÃO
  Noroeste: "#C0392B",              // NOVA REGIÃO
};

type BarItemParams = {
  data: {
    name: string;
    value: number;
  };
};

type TooltipParams = {
  name: string;
  value: number;
};

const GraficoLineRace: React.FC = () => {
  const { data, loading, error } = useFaperjData<Grafico18Data>("grafico18");

  const option = useMemo(() => {
    if (!data) return {};

    const { years, regions } = data;

    // Detectar se é mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const timelineFrames = years.map((year: string, index: number) => {
      // Prepara os dados para este ano mantendo a ordem do JSON
      const yearData = regions.map((r) => ({
        name: r.label,
        value: r.values[index],
      }));

      return {
        title: {
          text: `Regionalização – Ano ${year}`,
          left: "center",
          top: 10,
          textStyle: { 
            fontSize: isMobile ? 14 : 16, 
            fontWeight: 700, 
            color: "#124b6c" 
          },
        },

        yAxis: {
          data: yearData.map((d) => d.name),
        },

        series: [
          {
            type: "bar",
            data: yearData,

            itemStyle: {
              color: (params: BarItemParams) => regionColors[params.data.name],
              borderRadius: isMobile ? 4 : 6,
            },

            label: {
              show: true,
              position: "right",
              color: "#124b6c",
              fontSize: isMobile ? 9 : 12,
              formatter: (p: BarItemParams) => formatValor(p.data.value),
            },
          },
        ],
      };
    });

    return {
      baseOption: {
        timeline: {
          axisType: "category",
          autoPlay: true,
          playInterval: 1800,
          data: years,
          bottom: 0,
          label: { 
            color: "#124b6c", 
            fontWeight: 600,
            fontSize: isMobile ? 10 : 12,
          },
        },

        grid: {
          top: isMobile ? 50 : 70,
          left: isMobile ? 10 : 70,
          right: isMobile ? 90 : 150,
          bottom: isMobile ? 60 : 80,
          containLabel: true,
        },

        xAxis: {
          type: "value",
          axisLabel: {
            formatter: (v: number) => formatValor(v),
            color: "#666",
            fontSize: isMobile ? 8 : 12,
            rotate: isMobile ? 45 : 0,
          },
          splitLine: { lineStyle: { type: "dashed", color: "#ccc" } },
        },

        yAxis: {
          type: "category",
          inverse: true,
          data: regions.map((r) => r.label),
          axisLabel: { 
            color: "#124b6c", 
            fontSize: isMobile ? 10 : 13,
          },
        },

        tooltip: {
          trigger: "item",
          backgroundColor: "#ffffff",
          borderColor: "rgba(0,0,0,0.15)",
          borderWidth: 1,
          extraCssText: "border-radius:6px; padding:8px;",
          textStyle: { color: "#000", fontSize: isMobile ? 11 : 13 },
          confine: true,

          formatter: (p: TooltipParams) =>
            `<strong>${p.name}</strong><br/>${formatValor(p.value)}`,
        },

        series: [{ type: "bar" }],
      },

      options: timelineFrames,
    };
  }, [data]);

  if (loading)
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );

  if (error) return <Alert severity="error">Erro ao carregar os dados.</Alert>;
  if (!data) return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

  return (
    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
      {/* TÍTULO */}
      <Typography
        textAlign="left"
        fontWeight={700}
        mb={1}
        color="#124b6c"
        sx={{ fontSize: "18px" }}
      >
        Fomento por Região
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
      <Box sx={{ height: { xs: 450, sm: 520 }, width: "100%" }}>
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

export default GraficoLineRace;
