import Head from 'next/head';
import { Container, Typography, Box, Divider } from '@mui/material';
import React from 'react';
import Layout from '../components/Layout';
import SEO from '@/components/SEO';

const Sobre = () => {
  return (
    <Layout>
      <SEO
        title="Sobre a Plataforma – FAPERJ Portfolio em Rede"
        description="Conheça a finalidade, missão e aspectos institucionais da plataforma Portfolio FAPERJ em Rede."
        url="https://portfolio-faperj.vercel.app/sobre"
        image="/images/seo-sobre.png"
      />
      <Head>
        <title>Sobre o Portfólio FAPERJ</title>
        <meta
          name="description"
          content="Sobre a plataforma Portfólio FAPERJ em Rede"
        />
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
          {/* TÍTULO */}
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Sobre o Portfólio FAPERJ em Rede
          </Typography>

          <Divider sx={{ mb: 4 }} />

          {/* SEÇÃO 1 */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              O <strong>Portfólio FAPERJ em Rede</strong> é uma plataforma digital
              desenvolvida pela FAPERJ para dar visibilidade e transparência aos recursos públicos destinados a projetos
              financiados pela Fundação e valorizar o investimento em
              ciência, tecnologia e inovação no Estado do Rio de Janeiro.
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
              A plataforma centraliza dados atualizados sobre bolsas, auxílios e
              investimentos provenientes do Sistema de Bolsas e Auxílios (SBA) e
              informações sobre internacionalização da Assessoria Internacional (ASSINT),
              apresentados de forma e acessível para facilitar consultas 
              e análises estratégicas.
            </Typography>

            <Typography variant="body1">
              É possível explorar indicadores por ano, instituição, área do
              conhecimento, gênero, região e tipo de fomento, além de visualizar  programas, editais e os resultados
              alcançados pelas iniciativas apoiadas.
            </Typography>
          </Box>

          {/* SEÇÃO 2 */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              O Portfólio é um canal de inteligência institucional,
              que apoia pesquisadores, gestores e a sociedade na compreensão do
              impacto das ações da FAPERJ.
            </Typography>

            <Typography
              variant="body1"
              component="p"
              fontWeight="bold"
              sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}
            >
              📅 Os dados são atualizados anualmente, conforme o exercício
              financeiro da Fundação.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Sobre;
