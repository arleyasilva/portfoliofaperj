import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, Typography, Box, CircularProgress, Alert } from "@mui/material";

import useFaperjData from "@/hooks/useFaperjData";
import { IntSankeyData } from "@/types/faperj";
import { SankeyFormatterParam } from "@/types/echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

const GraficoIntSankey: React.FC = () => {
  const { data, loading, error } = useFaperjData<IntSankeyData>("int_sankey");

  const option = useMemo(() => {
    if (!data) return {};

    return {
      tooltip: {
        trigger: "item",
        backgroundColor: "#ffffff",
        borderColor: "rgba(0,0,0,0.15)",
        borderWidth: 1,
        extraCssText: "border-radius:6px; padding:10px;",
        textStyle: { color: "#000", fontSize: 13 },

        formatter: (p: SankeyFormatterParam) => {
          if (p.dataType === "edge" && 'source' in p.data && 'target' in p.data) {
            return `
              <strong>${p.data.source} → ${p.data.target}</strong><br/>
              Colaborações: <strong>${p.data.value}</strong>
            `;
          }
          if ('name' in p.data) {
            return `<strong>${p.data.name}</strong>`;
          }
          return '';
        },
      },

      series: [
        {
          type: "sankey",
          layout: "none",
          emphasis: { focus: "adjacency" },

          data: data.nodes,
          links: data.links,

          lineStyle: {
            color: "source",
            curveness: 0.4,
          },

          label: {
            color: "#124b6c",
            fontSize: 12,
            fontWeight: 600,
          },

          nodeGap: 12,
          nodeWidth: 18,
        },
      ],
    };
  }, [data]);

  // LOADING / ERROR
  if (loading)
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );

  if (error)
    return <Alert severity="error">Erro ao carregar dados do Sankey.</Alert>;

  if (!data)
    return <Alert severity="warning">Nenhum dado encontrado.</Alert>;

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: 3,
        height: 470,
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
        Fluxo de Colaboração Internacional – País ↔ Grande Área
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
        sx={{ mt: 1, color: "rgba(0,0,0,0.6)", fontStyle: "italic" }}
      >
        Fonte: Sistema FAPERJ – Cooperação Internacional
      </Typography>
    </Card>
  );
};

export default GraficoIntSankey;
