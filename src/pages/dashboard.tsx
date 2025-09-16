import Head from 'next/head';
import { Box, useTheme, Grid, Container, Typography, Link as MuiLink } from '@mui/material';
import dynamic from 'next/dynamic';
import React from 'react';
import { useRouter } from 'next/router';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import Layout from '../components/Layout'; // <-- AQUI! A linha que estava faltando

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

const DynamicChartSection = dynamic(
  () => import('../components/ChartSection'),
  { ssr: false }
);

const DashboardPage = () => {
  const theme = useTheme();
  const router = useRouter();

  const {
    statsData,
    areaDistribution,
    monthlyProjects,
    highlightData,
    loading,
    error,
    handleRefresh,
  } = useDashboardData();

  const dataExemplo = [
    { name: 'Jan', value: 1200 },
    { name: 'Fev', value: 1500 },
    { name: 'Mar', value: 1800 },
  ];
  
  const grafico3Data = [
    { name: 'UFRJ', bolsas: 350484568, auxilios: 529726853 },
    { name: 'UERJ', bolsas: 183334009, auxilios: 181426942 },
  ];

  const grafico4Data = [
    { name: 'A', value: 100 },
    { name: 'B', value: 200 },
    { name: 'C', value: 150 },
  ];

  return (
    <Layout>
      <Head>
        <title>Portfolio FAPERJ em rede</title>
        <meta name="description" content="Dashboard principal" />
      </Head>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Seção com os ícones de navegação */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box
                component={MuiLink}
                href="/indicadores"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: 6,
                  px: 4,
                  bgcolor: '#f5f5f5',
                  borderRadius: 2,
                  boxShadow: 3,
                  textDecoration: 'none',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: '#e0e0e0',
                  },
                }}
              >
                <BarChartIcon sx={{ fontSize: 60, mr: 2 }} />
                <Typography variant="h5" fontWeight="bold">
                  Indicadores
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component={MuiLink}
                href="/indicadores-sexo"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: 6,
                  px: 4,
                  bgcolor: '#f5f5f5',
                  borderRadius: 2,
                  boxShadow: 3,
                  textDecoration: 'none',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: '#e0e0e0',
                  },
                }}
              >
                <PersonOutlineIcon sx={{ fontSize: 60, mr: 2 }} />
                <Typography variant="h5" fontWeight="bold">
                  Indicadores por Sexo
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Cards de estatística */}
        <Box sx={{ mb: 4 }}>
          <StatisticalCards statsData={statsData}  />
        </Box>

        {/* SEÇÃO DOS GRÁFICOS (TODOS AGORA EM UM SÓ BLOCO) */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={6}>
            <Grafico1 title="Gráfico 1 — Total investido por ano" data={dataExemplo} />
          </Grid>
          
          <Grid item xs={12} sm={6} md={6}>
            <Grafico2 title="Gráfico 2 — Total investido por micro-áreas" data={dataExemplo} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Grafico3 title="Gráfico 3 — Top 10 Universidades" data={grafico3Data} />
          </Grid>
          
          <Grid item xs={12} sm={6} md={6}>
            <Grafico4 title="Gráfico 4 — Investimento Global por micro-áreas (Treemap)" data={grafico4Data} />
          </Grid>
        </Grid>

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
      </Container>
    </Layout>
  );
};

export default DashboardPage;