import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, Box, Typography, CircularProgress, Alert } from "@mui/material";

import useFaperjData from "@/hooks/useFaperjData";
import { Grafico4Data } from "@/types/faperj";
import { TooltipFormatterParams } from "@/types/echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

const abreviarValor = (num: number): string => {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + " bi";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + " mi";
  return num.toLocaleString("pt-BR");
};

const Grafico4: React.FC = () => {
  const { data, loading, error } = useFaperjData<Grafico4Data>("grafico4");

  const option = useMemo(() => {
    // se não tem dados ainda, devolve opção vazia
    if (!data || data.length === 0) {
      return {
        xAxis: { type: "category", data: [] },
        yAxis: { type: "value" },
        series: [],
      };
    }

    return {
      tooltip: {
        trigger: "axis",
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        textStyle: { color: "#333" },
        borderRadius: 6,
        formatter: (params: TooltipFormatterParams) => {
          if (!Array.isArray(params)) return "";
          
          const b = params.find((p) => p.seriesName === "Bolsas");
          const a = params.find((p) => p.seriesName === "Auxílios");

          if (!b || !a || typeof b.data !== 'object' || typeof a.data !== 'object') return "";

          const bData = b.data as { label: string; value: number };
          const aData = a.data as { label: string; value: number };
          const total = bData.value + aData.value;

          return `
            <strong>${bData.label}</strong><br/>
            Bolsas: <strong>R$ ${bData.value.toLocaleString("pt-BR")}</strong><br/>
            Auxílios: <strong>R$ ${aData.value.toLocaleString("pt-BR")}</strong><br/>
            Total: <strong>R$ ${total.toLocaleString("pt-BR")}</strong>
          `;
        },
      },

      legend: {
        top: 0,
        data: ["Bolsas", "Auxílios", "Total"],
      },

      grid: {
        top: 70,
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
        axisLabel: { formatter: (v: number) => abreviarValor(v) },
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
          data: data.map((item) => item.bolsas + item.auxilios),
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
    return <Alert severity="error">Erro ao carregar dados do gráfico 4.</Alert>;
  }

  if (!data || data.length === 0) {
    return <Alert severity="warning">Nenhum dado encontrado para o gráfico 4.</Alert>;
  }

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
      <Typography
        variant="h6"
        fontWeight={700}
        color="#124b6c"
        sx={{ mb: 1, fontSize: "18px", textAlign: "left" }}
      >
        Distribuição de Bolsas e Auxílios
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
        <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
      </Box>

      <Typography
        variant="caption"
        sx={{ mt: 1, color: "rgba(0,0,0,0.6)", fontStyle: "italic" }}
      >
        Fonte: Sistema de Bolsas e Auxílios – SBA / FAPERJ [2019 – 2025]
      </Typography>
    </Card>
  );
};

export default Grafico4;
