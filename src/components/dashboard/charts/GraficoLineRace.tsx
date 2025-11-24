import React from "react";
import ReactECharts from "echarts-for-react";
import { Box, Card, Typography, CircularProgress, Alert } from "@mui/material";
import useFaperjData from "@/hooks/useFaperjData";

// Conversão para formato brasileiro
const formatBR = (n: number) => "R$ " + n.toLocaleString("pt-BR");

// Paleta corporativa suave e consistente
const regionColors: Record<string, string> = {
  "Metropolitana 1": "#64B5F6",
  "Metropolitana 2": "#81C784",
  "Norte": "#9575CD",
  "Serrana": "#4DB6AC",
  "Médio Paraíba": "#FFB74D",
  "Baixada Litorânea": "#E57373",
  "Centro-Sul": "#BA68C8"
};

const GraficoLineRace = () => {
  const { data, loading, error } = useFaperjData("grafico18");

  if (loading)
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">Erro ao carregar os dados.</Alert>;
  if (!data) return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

  const { years, regions } = data;

  // Construir opções de cada frame do timeline
  const timelineOptions = years.map((year: string, index: number) => ({
    title: {
      text: `Regionalização – Ano ${year}`,
      left: "center",
      top: 10,
      textStyle: { fontSize: 16, fontWeight: 600, color: "#124b6c" }
    },

    series: [
      {
        type: "bar",
        data: regions
          .map((r: any) => ({
            name: r.label,
            value: r.values[index]
          }))
          .sort((a: any, b: any) => b.value - a.value),

        itemStyle: {
          color: (params: any) => regionColors[params.data.name],
          borderRadius: 6
        },

        label: {
          show: true,
          position: "right",
          color: "#124b6c",
          fontSize: 12,
          formatter: (p: any) => formatBR(p.value) // valores reais e completos
        }
      }
    ]
  }));

  // Opções gerais
  const option = {
    baseOption: {
      timeline: {
        axisType: "category",
        autoPlay: true,
        playInterval: 1800,
        data: years,
        bottom: 0,
        label: { color: "#2989b5" }
      },

      grid: {
        left: 150,
        right: 40,
        top: 70,
        bottom: 80
      },

      xAxis: {
        type: "value",
        axisLabel: {
          formatter: (v: number) => formatBR(v),
          color: "#666"
        },
        splitLine: {
          lineStyle: { type: "dashed", color: "#ccc" }
        }
      },

      yAxis: {
        type: "category",
        inverse: true,
        data: regions.map((r: any) => r.label),
        axisLabel: { color: "#124b6c", fontSize: 13 }
      },

      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(0,0,0,0.7)",
        textStyle: { color: "#fff" },
        formatter: (p: any) =>
          `<strong>${p.name}</strong><br/>${formatBR(p.value)}`
      },

      series: [{ type: "bar" }]
    },

    options: timelineOptions
  };

  return (
    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
      <Typography
        textAlign="left"
        fontWeight={700}
        mb={1}
        color="#124b6c"
        sx={{ fontSize: "18px" }}
      >
        Regionalização – Corrida de Regiões (Line Race)
      </Typography>

      {/* Linha suave */}
      <Box
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: "rgba(0,0,0,0.1)",
          mb: 2
        }}
      />

      <ReactECharts option={option} style={{ height: 520, width: "100%" }} />

      {/* Fonte */}
      <Typography
        variant="caption"
        sx={{ mt: 1, color: "rgba(0,0,0,0.6)", fontStyle: "italic" }}
      >
        Fonte: Sistema de Bolsas e Auxílios – SBA / FAPERJ [2019 – 2025]
      </Typography>
    </Card>
  );
};

export default GraficoLineRace;
