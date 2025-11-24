import { Box, Typography, Container, Grid } from '@mui/material';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import React from 'react';

interface Logo {
  src: string | StaticImageData;
  alt: string;
}

const Footer = (): JSX.Element => {
  const logos: Logo[] = [
    { src: '/images/logo_RJ_SECTI_branco.png', alt: 'Secretaria de Ciência, Tecnologia e Inovação' },
    { src: '/images/logo_faperj_branco_completo.png', alt: 'FAPERJ' },
    { src: '/images/logo_Rede_Rio_peq.png', alt: 'Rede Rio' },
    { src: '/images/logo-OUVERJ-branco.png', alt: 'OUVERJ' },
    { src: '/images/logo_acesso_informacao_peq.png', alt: 'Acesso à Informação' },
    { src: '/images/logo_Sei_RJ_peq.png', alt: 'Sei RJ' },
    { src: '/images/logo_disque_Rio_peq.png', alt: 'Disque Rio' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#8B1A3F',
        color: 'white',
        py: { xs: 4, md: 6 },
        textAlign: 'center',
        borderTop: '5px solid #6E0E2B',
        mt: 4,
      }}
    >
      <Container maxWidth="lg">

        {/* Texto de contato */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', md: '0.85rem' }, mb: 0.5 }}>
            FAPERJ - Fundação Carlos Chagas Filho de Amparo à Pesquisa do Estado do Rio de Janeiro
          </Typography>
          <Typography variant="caption" sx={{ fontSize: { xs: '0.65rem', md: '0.75rem' } }}>
            Av. Erasmo Braga, 118 - 6º andar - Centro - Rio de Janeiro, RJ - Cep 20.020-000 - (21) 2333-2800
          </Typography>
        </Box>

        {/* Logos */}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ maxWidth: 900, margin: '0 auto' }}
        >
          {logos.map((logo, index) => (
            <Grid item key={index} xs={4} sm={3} md={2} lg={1.7}>
              <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={60}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
};

export default Footer;
