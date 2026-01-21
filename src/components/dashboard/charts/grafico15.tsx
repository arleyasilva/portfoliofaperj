import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, Typography, Box, CircularProgress, Alert } from "@mui/material";
import useFaperjData from "@/hooks/useFaperjData";
import { Grafico15Data } from "@/types/faperj";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

// Conversão padrão institucional
const abreviar = (v: number): string => {
  if (v >= 1_000_000_000) return (v / 1_000_000_000).toFixed(1) + " bi";
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + " mi";
  if (v >= 1_000) return (v / 1_000).toFixed(0) + "k";
  return v.toLocaleString("pt-BR");
};

const Grafico15: React.FC = () => {
  const { data, loading, error } = useFaperjData<Grafico15Data>("grafico15");

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
        backgroundColor: "#ffffff",
        borderColor: "rgba(0,0,0,0.15)",
        borderWidth: 1,
        extraCssText: "border-radius:6px; padding:10px;",
        textStyle: { color: "#000", fontSize: 13 },

        formatter: (params: any[]) => {
          const fem = params.find((p) => p.seriesName === "Feminino")?.data;
          const masc = params.find((p) => p.seriesName === "Masculino")?.data;

          return `
            <strong>Ano ${fem.label}</strong><br/>
            Feminino: <strong>${fem.value.toLocaleString("pt-BR")}</strong><br/>
            Masculino: <strong>${masc.value.toLocaleString("pt-BR")}</strong>
          `;
        },
      },

      legend: {
        data: ["Feminino", "Masculino"],
        top: 0,
      },

      xAxis: {
        type: "category",
        data: data.map((i) => i.label),
        axisLabel: { fontSize: 12 },
      },

      yAxis: {
        type: "value",
        axisLabel: {
          formatter: (v: number) => abreviar(v),
        },
      },

      series: [
        {
          name: "Feminino",
          type: "line",
          smooth: true,
          symbolSize: 7,
          lineStyle: { width: 3, color: "#FBC02D" },
          itemStyle: { color: "#FBC02D" },
          data: data.map((i) => ({
            value: i.feminino,
            label: i.label,
          })),
        },
        {
          name: "Masculino",
          type: "line",
          smooth: true,
          symbolSize: 7,
          lineStyle: { width: 3, color: "#5F93CF" },
          itemStyle: { color: "#5F93CF" },
          data: data.map((i) => ({
            value: i.masculino,
            label: i.label,
          })),
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
        sx={{ textAlign: "left", mb: 1, fontSize: "18px" }}
      >
        Quantidade de Auxílios por Sexo e Ano
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
      <Box sx={{ flexGrow: 1 }}>
        <ReactECharts option={option} style={{ width: "100%", height: "100%" }} />
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
        Fonte: Sistema de Bolsas e Auxílios – SBA / FAPERJ (2019–2025)
      </Typography>
    </Card>
  );
};

export default Grafico15;
