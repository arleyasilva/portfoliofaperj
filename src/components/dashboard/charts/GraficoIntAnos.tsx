import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, Typography, Box, CircularProgress, Alert } from "@mui/material";

import useFaperjData from "@/hooks/useFaperjData";
import { IntAnosData } from "@/types/faperj";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

const GraficoIntAnos: React.FC = () => {
  const { data, loading, error } = useFaperjData<IntAnosData[]>("int_anos");

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
        textStyle: { color: "#000" },

        formatter: (params: any[]) => {
          const p = params[0];
          return `
            <strong>${p.axisValue}</strong><br/>
            Instituições: <strong>${p.data}</strong>
          `;
        },
      },

      xAxis: {
        type: "category",
        data: data.map((d) => d.label),
        axisLabel: { fontSize: 12 },
      },

      yAxis: {
        type: "value",
        name: "Instituições",
        axisLabel: { fontSize: 12 },
        splitLine: { lineStyle: { type: "dashed", color: "#ccc" } },
      },

      series: [
        {
          name: "Instituições",
          type: "line",
          smooth: true,
          data: data.map((d) => d.value),
          lineStyle: { width: 3, color: "#2989b5" },
          itemStyle: { color: "#2989b5" },
          symbolSize: 7,
        },
      ],
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
        Evolução das Colaborações Internacionais por Ano
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
        <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
      </Box>

      {/* FONTE */}
      <Typography
        variant="caption"
        sx={{ mt: 1, color: "rgba(0,0,0,0.6)", fontStyle: "italic" }}
      >
        Fonte: Assessoria Internacional - ASSINT / FAPERJ [2025]
      </Typography>
    </Card>
  );
};

export default GraficoIntAnos;
