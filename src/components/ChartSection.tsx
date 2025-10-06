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
import ChartSection from '../components/ChartSection'; // Importe ChartSection

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
      <StatisticalCards statsData={statsData} />

      {/* Os gráficos agora são filhos de ChartSection */}
      <ChartSection>
        {/* LINHA SEPARADA PARA O GRÁFICO 2 */}
        <Box>
          <Container maxWidth="xl">
            <Grid container spacing={0} justifyContent="center" sx={{ px: 1 }}>
              <Grid item xs={12} md={12} sx={{ width: 1200 }}>
                <Grafico2 />
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* LINHA PARA O GRÁFICO 3 E 4, LADO A LADO */}
        <Box>
          <Container maxWidth="xl">
            <Grid container spacing={0} justifyContent="center" sx={{ mt: 1 }}>
              <Grid item xs={12} md={6} sx={{ width: 550 }}>
                <Grafico3 />
              </Grid>
              
              <Grid item xs={12} md={6} sx={{ width: 550 }}>
                <Grafico4 />
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* LINHA SEPARADA PARA O GRÁFICO 1 */}
        <Box>
          <Container maxWidth="xl">
            <Grid container spacing={0} justifyContent="center" sx={{ mt: 1 }}>
              <Grid item xs={12} md={12} sx={{ width: 1200 }}>
                <Grafico1 />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ChartSection>
      
      {/* Outras seções */}
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