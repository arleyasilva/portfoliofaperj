import Head from "next/head";
import {
  Box,
  Container,
  Typography,
  Card,
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import React from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

import Grafico10 from "@/components/dashboard/charts/grafico10";
import Grafico11 from "@/components/dashboard/charts/grafico11";
import Grafico12 from "@/components/dashboard/charts/grafico12";
import Grafico13 from "@/components/dashboard/charts/grafico13";
import Grafico14 from "@/components/dashboard/charts/grafico14";
import Grafico15 from "@/components/dashboard/charts/grafico15";
import Grafico16 from "@/components/dashboard/charts/grafico16";
import Grafico16_1 from "@/components/dashboard/charts/grafico16_1";

// ======================================================================
// 🔹 PÁGINA PRINCIPAL
// ======================================================================

export default function IndicadoresSexo() {
  return (
    <>
      <SEO
        title="Distribuição de Bolsas e Auxílios por Gênero – FAPERJ"
        description="Análise comparativa de bolsas e auxílios concedidos pela FAPERJ segmentados por gênero ao longo dos anos."
        url="https://portfolio-faperj.vercel.app/indicadores-sexo"
        image="/images/seo-sexo.png"
      />

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
              Indicadores — Fomento por Gênero
            </Typography>
          </Card>

          {/* ======================== GRID DOS GRÁFICOS ======================== */}
          <Grid container spacing={4}>

            <Grid xs={12} md={6}>
              <Grafico10 />
            </Grid>

            <Grid xs={12} md={6}>
              <Grafico11 />
            </Grid>

            <Grid xs={12} md={6}>
              <Grafico12 />
            </Grid>

            <Grid xs={12} md={6}>
              <Grafico13 />
            </Grid>

            <Grid xs={12} md={6}>
              <Grafico14 />
            </Grid>

            <Grid xs={12} md={6}>
              <Grafico15 />
            </Grid>

            <Grid xs={12} md={6}>
              <Grafico16 />
            </Grid>

            <Grid xs={12} md={6}>
              <Grafico16_1 />
            </Grid>

          </Grid>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
