import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, Typography, CircularProgress, Box, Alert } from "@mui/material";

import useFaperjData from "@/hooks/useFaperjData";
import { Grafico12Data } from "@/types/faperj";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

const abreviarValor = (v: number): string => {
  if (v >= 1_000_000_000) return (v / 1_000_000_000).toFixed(1) + " bi";
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + " mi";
  return v.toLocaleString("pt-BR");
};

const Grafico12: React.FC = () => {
  const { data, loading, error } = useFaperjData<Grafico12Data>("grafico12");



  const option = useMemo(() => {
    if (!data) return {};

    return {
      grid: { top: 70, left: 30, right: 30, bottom: 30, containLabel: true },

      tooltip: {
        trigger: "axis",
        backgroundColor: "#fff",
        borderColor: "rgba(0,0,0,0.15)",
        borderWidth: 1,
        textStyle: { color: "#000", fontSize: 13 },
        borderRadius: 6,

        formatter: (params: any[]) => {
          const f = params.find((p) => p.seriesName === "Feminino")?.data;
          const m = params.find((p) => p.seriesName === "Masculino")?.data;

          return `
            <strong>Ano ${f.label}</strong><br/>
            Feminino: <strong>${abreviarValor(f.value)}</strong><br/>
            Masculino: <strong>${abreviarValor(m.value)}</strong>
          `;
        },
      },

      legend: { data: ["Feminino", "Masculino"], top: 0 },

      xAxis: {
        type: "category",
        data: data.map((i) => i.label), // <<< CORREÇÃO
        axisLabel: { fontSize: 12 },
      },

      yAxis: {
        type: "value",
        axisLabel: { formatter: (v: number) => abreviarValor(v) },
        splitLine: {
          lineStyle: { color: "rgba(0,0,0,0.15)", type: "dashed" },
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
          data: data.map((item) => ({
            value: item.feminino,
            label: item.label, // <<< CORREÇÃO
          })),
        },

        {
          name: "Masculino",
          type: "line",
          smooth: true,
          symbolSize: 7,
          lineStyle: { width: 3, color: "#5F93CF" },
          itemStyle: { color: "#5F93CF" },
          data: data.map((item) => ({
            value: item.masculino,
            label: item.label, // <<< CORREÇÃO
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
    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, height: 430, display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" fontWeight={700} color="#124b6c" sx={{ textAlign: "left", mb: 1, fontSize: "18px" }}>
        Valor total de fomentos da FAPERJ por sexo e ano
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

export default Grafico12;
