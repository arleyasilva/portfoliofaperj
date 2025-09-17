import Head from 'next/head';
import { Box, useTheme, Grid, Container } from '@mui/material';
import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';


import Grafico1 from '../components/dashboard/charts/grafico1';
import Grafico2 from '../components/dashboard/charts/grafico2';
import Grafico3 from '../components/dashboard/charts/grafico3';
import Grafico4 from '../components/dashboard/charts/grafico4';

import StatisticalCards from '../components/StatisticalCards';

import useDashboardData from '../hooks/useDashboardData';
import IconNav from '../components/IconNav';
import TripleColumnNav from '../components/TripleColumnNav';
import SearchSection from '../components/SearchSection';
import LattesSearch from '../components/LattesSearch';



export default function Dashboard(): JSX.Element {
  const theme = useTheme();

  const {
    statsData,
    areaDistribution,
    monthlyProjects,
    highlightData,
    loading,
    error,
    handleRefresh,
  } = useDashboardData();
  return (
    <>
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/images/fundo-branco.png)',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -2,
        },
        '&::after': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          zIndex: -1,
        },
      }}
    >
      
      <Head>
        <title>Portfolio FAPERJ em rede</title>
        <meta name="description" content="Página de teste" />
      </Head>

      <Header />
      <Banner />
      <IconNav />

      {/* Cards de estatística */}
      <StatisticalCards statsData={statsData} />

      {/* SEÇÃO DO GRID COM OS GRÁFICOS LADO A LADO */}
      <Box sx={{ py: 4 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Grafico1 />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Grafico2 />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* AQUI ESTÁ O NOVO GRÁFICO 3 E 4 */}
      <Box>
        <Container maxWidth="xl">
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Grafico3 />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Grafico4 />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* A linha '<DynamicChartSection ... />' foi removida. */}
      
      <TripleColumnNav />
      <Box sx={{ mb: 4 }}>
      <SearchSection />
      </Box>
      <Box sx={{ mb: 4 }}>
      <LattesSearch />
      </Box>
      <Footer />
    </Box>
    </>
  );
}