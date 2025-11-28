import Head from "next/head";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
} from "@mui/material";
import React from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import Grafico10 from "@/components/dashboard/charts/grafico10";
import Grafico11 from "@/components/dashboard/charts/grafico11";
import Grafico12 from "@/components/dashboard/charts/grafico12";
import Grafico13 from "@/components/dashboard/charts/grafico13";
import Grafico14 from "@/components/dashboard/charts/grafico14";
import Grafico15 from "@/components/dashboard/charts/grafico15";
import Grafico16 from "@/components/dashboard/charts/grafico16";
import Grafico16_1 from "@/components/dashboard/charts/grafico16_1";
import Grafico17 from "@/components/dashboard/charts/grafico17";

import { GraficoSexoAno } from "@/types/faperj";

// ======================================================================
// 🔹 EXEMPLO DE DADOS COM TIPAGEM (VOCÊ DEPOIS PUXA DO JSON)
// ======================================================================

const dataSexoExemplo: GraficoSexoAno[] = [
  { label: "2019", feminino: 200, masculino: 180 },
  { label: "2020", feminino: 230, masculino: 210 },
  { label: "2021", feminino: 260, masculino: 230 },
  { label: "2022", feminino: 300, masculino: 260 },
];

// ======================================================================
// 🔹 PÁGINA PRINCIPAL
// ======================================================================

export default function IndicadoresSexo() {
  return (
    <>
      <Head>
        <title>Indicadores — Sexo</title>
      </Head>

      <Header />

      <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", py: 4 }}>
        <Container maxWidth="xl">

          {/* ======================== TÍTULO ======================== */}
          <Card
            sx={{
              p: 3,
              mb: 4,
              backgroundColor: "#124b6c",
              color: "white",
              textAlign: "center",
              borderRadius: 2,
            }}
          >
            <Typography variant="h4" fontWeight={700}>
              Indicadores — Fomento por Sexo
            </Typography>
          </Card>

          {/* ======================== GRID DOS GRÁFICOS ======================== */}
          <Grid container spacing={4}>

            <Grid item xs={12} md={6}>
              <Grafico10
                title="Gráfico 10 — Evolução do Fomento"
                data={dataSexoExemplo}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Grafico11
                title="Gráfico 11 — Fomento por Ano"
                data={dataSexoExemplo}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Grafico12
                title="Gráfico 12 — Distribuição Anual"
                data={dataSexoExemplo}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Grafico13
                title="Gráfico 13 — Comparativo"
                data={dataSexoExemplo}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Grafico14
                title="Gráfico 14 — Participação Feminina"
                data={dataSexoExemplo}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Grafico15
                title="Gráfico 15 — Participação Masculina"
                data={dataSexoExemplo}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Grafico16
                title="Gráfico 16 — Percentual Relativo"
                data={dataSexoExemplo}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Grafico16_1
                title="Gráfico 16.1 — Evolução Relativa"
                data={dataSexoExemplo}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Grafico17
                title="Gráfico 17 — Série Histórica Geral"
                data={dataSexoExemplo}
              />
            </Grid>

          </Grid>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
