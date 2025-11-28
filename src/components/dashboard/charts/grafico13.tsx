import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, Typography, Box, CircularProgress, Alert } from "@mui/material";

import useFaperjData from "@/hooks/useFaperjData";
import { Grafico13Data } from "@/types/faperj";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

// 🔹 Abreviação padrão institucional (mi / mil / valor cheio)
const abreviarValor = (v: number): string => {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1).replace(".0", "") + " mi";
  if (v >= 1_000) return v.toLocaleString("pt-BR");
  return v.toString();
};

const Grafico13: React.FC = () => {
  // 🔹 Aqui estava o erro — o tipo deve ser ARRAY
  const { data, loading, error } = useFaperjData<Grafico13Data>("grafico13");

  const option = useMemo(() => {
    if (!data) return {};

    return {
      grid: { top: 70, left: 30, right: 30, bottom: 30, containLabel: true },

      tooltip: {
        trigger: "axis",
        backgroundColor: "#ffffff",
        borderColor: "rgba(0,0,0,0.15)",
        borderWidth: 1,
        extraCssText: "border-radius:6px; padding:10px;",
        textStyle: { color: "#000", fontSize: 13 },

        formatter: (params: any[]) => {
          const f = params.find((p) => p.seriesName === "Feminino")?.data;
          const m = params.find((p) => p.seriesName === "Masculino")?.data;

          return `
            <strong>Ano ${f.label}</strong><br/>
            Bolsas Femininas: <strong>${f.value.toLocaleString("pt-BR")}</strong><br/>
            Bolsas Masculinas: <strong>${m.value.toLocaleString("pt-BR")}</strong>
          `;
        },
      },

      legend: { data: ["Feminino", "Masculino"], top: 0 },

      xAxis: {
        type: "category",
        data: data.map((i) => i.label),
        axisLabel: { fontSize: 12 },
      },

      yAxis: {
        type: "value",
        axisLabel: { formatter: (v: number) => abreviarValor(v) },
        splitLine: { lineStyle: { type: "dashed", color: "#ddd" } },
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

  if (loading) return <Box p={3} textAlign="center"><CircularProgress /></Box>;
  if (error) return <Alert severity="error">Erro ao carregar os dados.</Alert>;
  if (!data) return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

  return (
    <Card sx={{
      p: 3,
      borderRadius: 3,
      boxShadow: 3,
      height: 430,
      display: "flex",
      flexDirection: "column",
    }}>
      <Typography variant="h6" fontWeight={700} color="#124b6c" sx={{ textAlign: "left", mb: 1, fontSize: "18px" }}>
        Quantidade de Bolsas por Sexo e Ano
      </Typography>

      <Box sx={{ width: "100%", height: "1px", backgroundColor: "rgba(0,0,0,0.1)", mb: 2 }} />

      <Box sx={{ flexGrow: 1 }}>
        <ReactECharts option={option} style={{ width: "100%", height: "100%" }} />
      </Box>

      <Typography variant="caption" sx={{ mt: 1, color: "rgba(0,0,0,0.6)", fontStyle: "italic" }}>
        Fonte: Sistema de Bolsas e Auxílios – SBA / FAPERJ (2019–2025)
      </Typography>
    </Card>
  );
};

export default Grafico13;
