import Head from 'next/head';
import { Container, Typography, Box, Divider, Link as MuiLink } from '@mui/material';
import React from 'react';
import Layout from '../components/Layout';

const PoliticaDeDados = () => {
  return (
    <Layout>
      <Head>
        <title>Política de Proteção de Dados</title>
        <meta name="description" content="Política de Proteção de Dados da FAPERJ" />
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
            Política de Proteção de Dados
          </Typography>
          <Divider sx={{ mb: 4 }} />

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h2" fontWeight="bold" sx={{ mb: 1 }}>
              1. Finalidade da Plataforma
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Esta plataforma tem como objetivo disponibilizar de forma transparente e acessível os dados referentes a bolsas, auxílios e investimentos realizados pela FAPERJ no âmbito da ciência, tecnologia e inovação no Estado do Rio de Janeiro.
            </Typography>
            <Typography variant="body1">
              As informações exibidas são provenientes do Sistema de Bolsas e Auxílios (SBA), de uso interno da Fundação, e são apresentadas exclusivamente para fins de interesse público, estatístico e institucional, não sendo utilizados para fins comerciais ou de perfilamento individual.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h2" fontWeight="bold" sx={{ mb: 1 }}>
              2. Base Legal e Conformidade com a LGPD
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              A plataforma observa os princípios e dispositivos da **Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais (LGPD)**.
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              O tratamento dos dados é fundamentado no interesse público e na execução de políticas públicas, conforme disposto no art. 7º, inciso III, da **LGPD**.
            </Typography>
            <Typography variant="body1">
              Todos os dados pessoais eventualmente tratados são anonimizados ou agregados, de forma a impedir a identificação direta ou indireta de titulares.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h2" fontWeight="bold" sx={{ mb: 1 }}>
              3. Dados Exibidos
            </Typography>
            <Typography variant="body1">
              A plataforma apresenta exclusivamente dados agregados e anonimizados relativos a:
            </Typography>
            <Box component="ul" sx={{ mt: 1, ml: 2, '& li': { mb: 0.5 } }}>
              <Typography component="li" variant="body1">Quantidade de projetos, bolsas e auxílios concedidos;</Typography>
              <Typography component="li" variant="body1">Valores investidos por ano, por área do conhecimento, por tipo de auxílio e por sexo (declarado);</Typography>
              <Typography component="li" variant="body1">Indicadores estatísticos e financeiros derivados do Sistema de Bolsas e Auxílios (SBA).</Typography>
            </Box>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Não são exibidos dados pessoais identificáveis de pesquisadores, bolsistas, servidores ou quaisquer outros titulares.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h2" fontWeight="bold" sx={{ mb: 1 }}>
              4. Segurança e Governança de Dados
            </Typography>
            <Typography variant="body1">
              A FAPERJ adota medidas técnicas e administrativas adequadas para proteger os dados contra acessos não autorizados, alterações, perdas ou vazamentos, incluindo:
            </Typography>
            <Box component="ul" sx={{ mt: 1, ml: 2, '& li': { mb: 0.5 } }}>
              <Typography component="li" variant="body1">Controle de acesso e autenticação de usuários internos;</Typography>
              <Typography component="li" variant="body1">Registro e monitoramento de atividades na plataforma;</Typography>
              <Typography component="li" variant="body1">Criptografia e backups regulares;</Typography>
              <Typography component="li" variant="body1">Procedimentos internos de governança e boas práticas de segurança da informação.</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h2" fontWeight="bold" sx={{ mb: 1 }}>
              5. Direitos dos Titulares
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Apesar de a plataforma não exibir dados pessoais identificáveis, os titulares de dados eventualmente tratados no Sistema de Bolsas e Auxílios (SBA) podem exercer seus direitos garantidos pela **LGPD**, incluindo:
            </Typography>
            <Box component="ul" sx={{ mt: 1, ml: 2, '& li': { mb: 0.5 } }}>
              <Typography component="li" variant="body1">Confirmação da existência de tratamento;</Typography>
              <Typography component="li" variant="body1">Acesso, correção, anonimização ou eliminação de dados pessoais;</Typography>
              <Typography component="li" variant="body1">Informação sobre o compartilhamento de dados.</Typography>
            </Box>
            <Typography variant="body1" sx={{ mt: 1 }}>
              As solicitações podem ser realizadas junto ao Encarregado de Proteção de Dados (**DPO**) da FAPERJ, por meio do canal oficial de atendimento disponível no portal institucional.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h2" fontWeight="bold" sx={{ mb: 1 }}>
              6. Atualizações da Política
            </Typography>
            <Typography variant="body1">
              Esta Política de Proteção de Dados poderá ser atualizada periodicamente para refletir alterações legais, regulatórias ou operacionais.
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              A versão atualizada estará sempre disponível nesta aba e conterá a data de sua última atualização.
            </Typography>
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
            📌 Última atualização: [inserir data]
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
};

export default PoliticaDeDados;