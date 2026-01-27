import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, Typography, CircularProgress, Box, Alert } from "@mui/material";

import useFaperjData from "@/hooks/useFaperjData";
import { Grafico10Data } from "@/types/faperj";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

// Tipagem para permitir uso com props
interface Grafico10Props {
  title?: string;
  data?: Grafico10Data; // OPCIONAL — se não vier, usa useFaperjData
}

type TooltipParams = {
  data: {
    label: string;
    value: number;
  };
};

const Grafico10: React.FC<Grafico10Props> = ({ title, data: dataFromProps }) => {
  
  // Se vier "data" via props, usa ela. Se não, usa o hook.
  const { data, loading, error } = useFaperjData<Grafico10Data>("grafico10");

  // Decide qual fonte de dados usar:
  const finalData = dataFromProps ?? data;

  const option = useMemo(() => {
    if (!finalData) return {};

    // Detectar se é mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return {
      grid: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
      },

      tooltip: {
        trigger: "item",
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        textStyle: { color: "#333", fontSize: isMobile ? 11 : 15 },
        borderRadius: 8,
        padding: isMobile ? 8 : 12,
        confine: true,
        formatter: (p: TooltipParams) => `
          <strong style="font-size: ${isMobile ? '12px' : '16px'}">${p.data.label}</strong><br/>
          <span style="font-size: ${isMobile ? '10px' : '14px'}">Valor Total: <strong>R$ ${p.data.value.toLocaleString("pt-BR")}</strong></span>
        `,
      },

      legend: {
        orient: "vertical",
        right: isMobile ? 5 : 10,
        top: "center",
        textStyle: { fontSize: isMobile ? 11 : 15 },
      },

      series: [
        {
          type: "pie",
          radius: isMobile ? ["40%", "70%"] : ["45%", "80%"],
          center: isMobile ? ["35%", "50%"] : ["40%", "48%"],

          data: finalData.map((item) => {
            let color = "#2989b5"; // Masculino (azul)
            if (item.label === "Feminino") {
              color = "#ff69b4"; // Rosa
            } else if (item.label === "Não Definido" || item.label === "Não definido") {
              color = "#FBC02D"; // Amarelo
            }
            
            return {
              name: item.label,
              label: item.label,
              value: item.value,
              itemStyle: { color },
            };
          }),

          emphasis: {
            scale: true,
            scaleSize: 8,
            itemStyle: {
              shadowBlur: 20,
              shadowColor: "rgba(0,0,0,0.25)",
            },
          },

          label: { show: false },
        },
      ],
    };
  }, [finalData]);

  if (!dataFromProps) {
    // SOMENTE MOSTRA LOADING/ERRO SE ESTIVER USANDO O HOOK
    if (loading)
      return (
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress />
        </Box>
      );

    if (error) return <Alert severity="error">Erro ao carregar os dados.</Alert>;
  }

  if (!finalData)
    return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

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
      {/* TÍTULO — agora aceita a prop title */}
      <Typography
        variant="h6"
        fontWeight={700}
        color="#124b6c"
        sx={{ textAlign: "left", mb: 1, fontSize: "18px" }}
      >
        Distribuição Total de Bolsas e Auxílios por Sexo
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
        <ReactECharts
          option={option}
          style={{ height: "100%", width: "100%" }}
        />
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

export default Grafico10;
