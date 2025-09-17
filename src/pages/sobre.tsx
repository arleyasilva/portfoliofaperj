import Head from 'next/head';
import { Container, Typography, Box, Divider } from '@mui/material';
import React from 'react';
import Layout from '../components/Layout';

const Sobre = () => {
  return (
    <Layout>
      <Head>
        <title>Sobre o Portfólio FAPERJ</title>
        <meta name="description" content="Sobre a plataforma Portfólio FAPERJ em Rede" />
      </Head>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            p: { xs: 2, md: 4 },
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <Typography variant="h4" component="h1" fontWeight="bold" color="primary" gutterBottom>
            Sobre o Portfólio FAPERJ em Rede
          </Typography>
          <Divider sx={{ mb: 4 }} />

          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              O **Portfólio FAPERJ em Rede** é uma plataforma digital desenvolvida pela FAPERJ para dar visibilidade aos projetos financiados pela Fundação e valorizar o investimento público em ciência, tecnologia e inovação no Estado do Rio de Janeiro.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              A plataforma reúne dados atualizados sobre bolsas, auxílios e investimentos do Sistema de Bolsas e Auxílios (SBA), organizados de forma interativa e acessível.
            </Typography>
            <Typography variant="body1">
              É possível explorar indicadores por ano, instituição, área do conhecimento e tipo de fomento, além de visualizar os resultados alcançados pelas iniciativas apoiadas.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              O Portfólio é um canal de inteligência científica e institucional, que apoia pesquisadores, gestores e a sociedade na compreensão do impacto das ações da FAPERJ.
            </Typography>
            <Typography variant="body1" component="p" fontWeight="bold" sx={{ mb: 1 }}>
              <span role="img" aria-label="Calendário">📅</span> Os dados são atualizados anualmente, conforme o exercício financeiro da Fundação.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Sobre;