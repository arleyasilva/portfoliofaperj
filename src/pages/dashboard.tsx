// Arquivo: src/pages/dashboard.tsx

import Head from "next/head";
import {
  Box,
  Grid,
  Container,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";

// ====== GRÁFICOS NACIONAIS ======
import Grafico1 from "../components/dashboard/charts/grafico1";
import Grafico2 from "../components/dashboard/charts/grafico2";
import Grafico3 from "../components/dashboard/charts/grafico3";
import Grafico4 from "../components/dashboard/charts/grafico4";
import Grafico5 from "../components/dashboard/charts/grafico5";
import Grafico6 from "../components/dashboard/charts/grafico6";
import Grafico7 from "../components/dashboard/charts/grafico7";
import Grafico8 from "../components/dashboard/charts/grafico8";
import Grafico9 from "../components/dashboard/charts/grafico9";
import Grafico9_1 from "../components/dashboard/charts/grafico9_1";
import Grafico10 from "../components/dashboard/charts/grafico10";
import Grafico11 from "../components/dashboard/charts/grafico11";
import Grafico12 from "../components/dashboard/charts/grafico12";
import Grafico13 from "../components/dashboard/charts/grafico13";
import Grafico14 from "../components/dashboard/charts/grafico14";
import Grafico15 from "../components/dashboard/charts/grafico15";
import Grafico16 from "../components/dashboard/charts/grafico16";
import Grafico16_1 from "../components/dashboard/charts/grafico16_1";
import Grafico17 from "../components/dashboard/charts/grafico17";
import Grafico18 from "../components/dashboard/charts/grafico18";
import GraficoLineRace from "../components/dashboard/charts/GraficoLineRace";

// ====== GRÁFICOS INTERNACIONAIS ======
import GraficoIntPaises from "../components/dashboard/charts/GraficoIntPaises";
import GraficoIntCidades from "../components/dashboard/charts/GraficoIntCidades";
import GraficoIntAnos from "../components/dashboard/charts/GraficoIntAnos";
import GraficoIntAreas from "../components/dashboard/charts/GraficoIntAreas";
import GraficoIntSankey from "../components/dashboard/charts/GraficoIntSankey";

// Layout
import Header from "../components/Header";
import Footer from "../components/Footer";

// Tipagem para componente de gráfico
type ChartComponent = React.FC;

// ====== MAPEAMENTO DAS CATEGORIAS PARA LISTA DE COMPONENTES ======
const chartCategories = {
  Bolsas: [Grafico3, Grafico4, Grafico9, Grafico9_1, Grafico16, Grafico17],
  Auxílios: [
    Grafico3,
    Grafico4,
    Grafico5,
    Grafico6,
    Grafico7,
    Grafico8,
    Grafico14,
    Grafico15,
  ],
  "Área de Conhecimento": [Grafico2, Grafico6, Grafico1],
  Sexo: [
    Grafico10,
    Grafico11,
    Grafico12,
    Grafico13,
    Grafico14,
    Grafico15,
    Grafico16,
    Grafico16_1,
    Grafico17,
    Grafico18,
  ],
  Regionalização: [GraficoLineRace],
  Internacionalização: [
    GraficoIntPaises,
    GraficoIntCidades,
    GraficoIntAnos,
    GraficoIntAreas,
    GraficoIntSankey,
  ],
} as const;

type ChartCategory = keyof typeof chartCategories;

const Dashboard: React.FC = () => {
  const [activeCategory, setActiveCategory] =
    useState<ChartCategory>("Bolsas");

  // 🔥 Correção oficial do erro TS — converte length em number normal
  const chartsToRender = chartCategories[activeCategory];

  const renderCharts = () => {
    const charts = chartCategories[activeCategory];

    // FIX do erro: remove literal type e usa number plano
    const count: number = charts.length;

    return (
      <Grid container spacing={4} justifyContent="center">
        {charts.map((ChartComponent, index) => {
          const isSankey =
            activeCategory === "Internacionalização" &&
            ChartComponent === GraficoIntSankey;

          const fullWidth = count === 1 || isSankey;

          return (
            <Grid
              item
              key={index}
              xs={12}
              sm={fullWidth ? 12 : 6}
              md={fullWidth ? 12 : 6}
            >
              <ChartComponent />
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f5f5f5",
      }}
    >
      <Head>
        <title>Portfolio FAPERJ - Indicadores</title>
        <meta name="description" content="Dashboard com indicadores da FAPERJ." />
      </Head>

      <Header />

      <Box component="main" sx={{ flexGrow: 1, py: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl">
          {/* Faixa de título */}
          <Box
            sx={{
              textAlign: "center",
              mb: 4,
              p: { xs: 1.5, md: 2.5 },
              backgroundColor: "#124b6c",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              color="white"
              sx={{ fontSize: { xs: "1.6rem", md: "2.125rem" } }}
            >
              INDICADORES
            </Typography>
          </Box>

          {/* Botões das categorias */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 1.5,
              mb: 4,
            }}
          >
            {(Object.keys(chartCategories) as ChartCategory[]).map(
              (category) => (
                <Button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  variant={
                    activeCategory === category ? "contained" : "outlined"
                  }
                  sx={{
                    fontWeight: "bold",
                    borderColor: "#861539",
                    color:
                      activeCategory === category ? "white" : "#861539",
                    backgroundColor:
                      activeCategory === category ? "#861539" : "transparent",
                    "&:hover": {
                      backgroundColor: "#861539",
                      color: "white",
                    },
                    fontSize: { xs: "0.75rem", md: "0.875rem" },
                    px: { xs: 1.5, md: 2.5 },
                    py: { xs: 0.5, md: 0.7 },
                  }}
                >
                  {category}
                </Button>
              )
            )}
          </Box>

          {/* Renderização dos gráficos */}
          {renderCharts()}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default Dashboard;
