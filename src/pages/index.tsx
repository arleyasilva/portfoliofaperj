import Head from 'next/head';
import { Box, useTheme, Grid, Container } from '@mui/material';
import dynamic from 'next/dynamic';
import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';

// IMPORTS CORRIGIDOS: o "g" agora é minúsculo no caminho do arquivo.
import Grafico1 from '../components/dashboard/charts/grafico1';
import Grafico2 from '../components/dashboard/charts/grafico2';
import Grafico3 from '../components/dashboard/charts/grafico3';
import Grafico4 from '../components/dashboard/charts/grafico4'; // <-- AQUI! Importação do novo gráfico

import StatisticalCards from '../components/StatisticalCards';

import useDashboardData from '../hooks/useDashboardData';
import IconNav from '../components/IconNav';
import TripleColumnNav from '../components/TripleColumnNav';
import SearchSection from '../components/SearchSection';
import LattesSearch from '../components/LattesSearch';

const DynamicChartSection = dynamic(
  () => import('../components/ChartSection'),
  { ssr: false }
);

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
      <StatisticalCards statsData={statsData}  />

      {/* SEÇÃO DO GRID COM OS GRÁFICOS LADO A LADO */}
      <Box sx={{ py: 4 }}>
        <Container maxWidth="xl">
          <Grid container spacing={8} justifyContent="center">
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
      <Box sx={{ py: 4 }}>
        <Container maxWidth="xl">
          <Grid container spacing={8} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Grafico3 />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Grafico4 /> {/* <-- AQUI! Adicionei o novo gráfico */}
            </Grid>
          </Grid>
        </Container>
      </Box>

      <DynamicChartSection
        areaDistribution={areaDistribution}
        monthlyProjects={monthlyProjects}
        highlightData={highlightData}
        loading={loading}
        error={error}
        handleRefresh={handleRefresh}
      />
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