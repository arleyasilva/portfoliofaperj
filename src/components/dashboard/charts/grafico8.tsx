import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, Typography, CircularProgress, Box, Alert } from "@mui/material";
import useFaperjData from "@/hooks/useFaperjData";

const Grafico8 = () => {
  const { data, loading, error } = useFaperjData("grafico8");

  if (loading)
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return <Alert severity="error">Erro ao carregar os dados.</Alert>;

  if (!data)
    return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

  const option = {
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const item = params[0].data;
        return `
          <strong>${item.label}</strong><br/>
          Valor: R$ ${item.value.toLocaleString("pt-BR")}
        `;
      }
    },

    xAxis: {
      type: "category",
      data: data.map((item: any) => item.label),
      axisLabel: { rotate: 35 }
    },

    yAxis: {
      type: "value",
      name: "Valor (R$)"
    },

    series: [
      {
        type: "bar",
        name: "Auxílios",
        data: data.map((item: any) => ({
          value: item.value,
          ...item
        })),
        barWidth: "55%",
        itemStyle: { color: "#2989b5" }
      }
    ]
  };

  return (
    <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
      <Typography
        variant="h6"
        fontWeight={600}
        textAlign="center"
        mb={2}
        color="#2989b5"
      >
        Valor de Auxílios por Modalidade
      </Typography>

      <ReactECharts option={option} style={{ height: 420 }} />
    </Card>
  );
};

export default Grafico8;
