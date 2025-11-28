import Head from 'next/head';
import { Box, Grid, Container } from '@mui/material';
import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';

import Grafico1 from '../components/dashboard/charts/grafico1';
import Grafico2 from '../components/dashboard/charts/grafico2';
import Grafico3 from '../components/dashboard/charts/grafico3';
import Grafico4 from '../components/dashboard/charts/grafico4';

import StatisticalCards from '../components/StatisticalCards';

import useFaperjData from '../hooks/useFaperjData';
import IconNav from '../components/IconNav';
import TripleColumnNav from '../components/TripleColumnNav';
import SearchSection from '../components/SearchSection';
import LattesSearch from '../components/LattesSearch';

import { StatsData } from '@/types/faperj';  // ✅ IMPORTANTE

export default function Dashboard() {

  // 🔥 TIPAGEM CORRETA DO RETORNO
  const { data: statsData } = useFaperjData<StatsData>("faperj-stats");

  return (
    <>
      <Head>
        <title>Portfolio FAPERJ em rede</title>
      </Head>

      <Box
        sx={{
          minHeight: "100%",
          overflowX: "hidden",
        }}
      >
        <Header />
        <Banner />
        <IconNav />

        {/* 🔥 StatisticalCards NÃO recebe props */}
        {statsData && <StatisticalCards />}

        <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>

          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <Grafico2 />
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <Grafico3 />
            </Grid>
            <Grid item xs={12} md={6}>
              <Grafico4 />
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Grafico1 />
            </Grid>
          </Grid>

        </Container>

        <TripleColumnNav />
        <SearchSection />
        <LattesSearch />

        <Footer />
      </Box>
    </>
  );
}
