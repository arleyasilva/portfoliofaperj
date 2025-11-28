import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Box, Card, Typography, CircularProgress, Alert } from "@mui/material";
import useFaperjData from "@/hooks/useFaperjData";
import { Grafico18Data } from "@/types/faperj";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

const formatValor = (n: number) => "R$ " + n.toLocaleString("pt-BR");

const regionColors: Record<string, string> = {
  "Metropolitana 1": "#2989b5",
  "Metropolitana 2": "#5F93CF",
  "Norte": "#8E44AD",
  "Serrana": "#7CB342",
  "Médio Paraíba": "#FBC02D",
  "Baixada Litorânea": "#E57373",
  "Centro-Sul": "#D35400"
};

const GraficoLineRace: React.FC = () => {
  const { data, loading, error } = useFaperjData<Grafico18Data>("grafico18");

  const option = useMemo(() => {
    if (!data) return {};

    const { years, regions } = data;

    const timelineFrames = years.map((year: string, index: number) => ({
      title: {
        text: `Regionalização – Ano ${year}`,
        left: "center",
        top: 10,
        textStyle: { fontSize: 16, fontWeight: 700, color: "#124b6c" }
      },

      series: [
        {
          type: "bar",
          data: regions
            .map((r) => ({
              name: r.label,
              value: r.values[index]
            }))
            .sort((a, b) => b.value - a.value),

          itemStyle: {
            color: (params: any) => regionColors[params.data.name],
            borderRadius: 6
          },

          label: {
            show: true,
            position: "right",
            color: "#124b6c",
            fontSize: 12,
            formatter: (p: any) => formatValor(p.value)
          }
        }
      ]
    }));

    return {
      baseOption: {
        timeline: {
          axisType: "category",
          autoPlay: true,
          playInterval: 1800,
          data: years,
          bottom: 0,
          label: { color: "#124b6c", fontWeight: 600 }
        },

        grid: {
          top: 70,
          left: 150,
          right: 40,
          bottom: 80,
          containLabel: true
        },

        xAxis: {
          type: "value",
          axisLabel: {
            formatter: (v: number) => formatValor(v),
            color: "#666"
          },
          splitLine: { lineStyle: { type: "dashed", color: "#ccc" } }
        },

        yAxis: {
          type: "category",
          inverse: true,
          data: regions.map((r) => r.label),
          axisLabel: { color: "#124b6c", fontSize: 13 }
        },

        tooltip: {
          trigger: "item",
          backgroundColor: "#ffffff",
          borderColor: "rgba(0,0,0,0.15)",
          borderWidth: 1,
          extraCssText: "border-radius:6px; padding:8px;",
          textStyle: { color: "#000", fontSize: 13 },

          formatter: (p: any) =>
            `<strong>${p.name}</strong><br/>${formatValor(p.value)}`
        },

        series: [{ type: "bar" }]
      },

      options: timelineFrames
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
        Regionalização – Corrida de Regiões (Line Race)
      </Typography>

      {/* LINHA */}
      <Box
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: "rgba(0,0,0,0.1)",
          mb: 2
        }}
      />

      {/* GRÁFICO */}
      <ReactECharts option={option} style={{ height: 520, width: "100%" }} />

      {/* FONTE */}
      <Typography
        variant="caption"
        sx={{
          mt: 1,
          color: "rgba(0,0,0,0.6)",
          fontStyle: "italic"
        }}
      >
        Fonte: Sistema de Bolsas e Auxílios – SBA / FAPERJ [2019 – 2025]
      </Typography>
    </Card>
  );
};

export default GraficoLineRace;
