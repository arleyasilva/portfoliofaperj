import Head from 'next/head';
import { Box, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
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
         // opacity: 0.5,
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
      <StatisticalCards statsData={statsData}  />
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