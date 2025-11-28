import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, Box, Typography, CircularProgress, Alert } from "@mui/material";

import useFaperjData from "@/hooks/useFaperjData";
import { Grafico4Data } from "@/types/faperj";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

const abreviarValor = (num: number): string => {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + " bi";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + " mi";
  return num.toLocaleString("pt-BR");
};

const Grafico4: React.FC = () => {
  const { data, loading, error } = useFaperjData<Grafico4Data>("grafico4");

  const option = useMemo(() => {
    if (!data) return {};

    return {
      tooltip: {
        trigger: "axis",
        formatter: (params: any[]) => {
          const b = params.find((p) => p.seriesName === "Bolsas")?.data;
          const a = params.find((p) => p.seriesName === "Auxílios")?.data;

          return `
            <strong>${b.label}</strong><br/>
            Bolsas: <strong>R$ ${b.value.toLocaleString("pt-BR")}</strong><br/>
            Auxílios: <strong>R$ ${a.value.toLocaleString("pt-BR")}</strong>
          `;
        },
      },

      legend: { top: 0 },

      grid: { top: 70, left: 30, right: 30, bottom: 30, containLabel: true },

      xAxis: {
        type: "category",
        data: data.map((item) => item.label),
      },

      yAxis: {
        type: "value",
        axisLabel: { formatter: abreviarValor },
      },

      series: [
        {
          name: "Bolsas",
          type: "bar",
          itemStyle: { color: "#1b77b3" },
          data: data.map((item) => ({
            label: item.label,
            value: item.bolsas,
          })),
        },
        {
          name: "Auxílios",
          type: "bar",
          itemStyle: { color: "#21a179" },
          data: data.map((item) => ({
            label: item.label,
            value: item.auxilios,
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

  if (error) return <Alert severity="error">Erro ao carregar dados.</Alert>;
  if (!data) return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

  return (
    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, height: 430 }}>
      <Typography variant="h6" fontWeight={700} color="#124b6c" sx={{ mb: 1 }}>
        Distribuição de Bolsas e Auxílios
      </Typography>

      <Box sx={{ width: "100%", height: 1, backgroundColor: "rgba(0,0,0,0.1)", mb: 2 }} />

      <Box sx={{ height: "100%" }}>
        <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
      </Box>
    </Card>
  );
};

export default Grafico4;
