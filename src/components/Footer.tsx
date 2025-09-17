import { Box, Typography, Container, Grid, Link as MuiLink } from '@mui/material';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import React from 'react';

// Criamos uma interface para definir o formato de cada objeto 'logo'
interface Logo {
  src: string | StaticImageData;
  alt: string;
}

const Footer = (): JSX.Element => {
  const logos: Logo[] = [
    { src: '/images/logo-1.png', alt: 'Secretaria de Ciência, Tecnologia e Inovação' },
    { src: '/images/logo-2.png', alt: 'Governo RJ' },
    { src: '/images/logo-3.png', alt: 'Rede Rio' },
    { src: '/images/logo-4.png', alt: 'OUVERJ' },
    { src: '/images/logo-5.png', alt: 'Acesso à Informação' },
    { src: '/images/logo-6.png', alt: 'Selo RJ' },
    { src: '/images/logo-7.png', alt: 'Rio de Janeiro' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#8B1A3F',
        color: 'white',
        py: { xs: 4, md: 6 },
        textAlign: 'center',
        borderTop: '5px solid #6E0E2B'
      }}
    >
      <Container maxWidth="lg">
        {/* Seção de links no topo */}
        <Typography variant="body2" sx={{ mb: 2, fontSize: '0.8rem' }}>
          <MuiLink href="/" color="inherit" underline="hover" sx={{ mx: 1 }}>
            Página Inicial
          </MuiLink>
          |
          <MuiLink href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
            Mapa do Site
          </MuiLink>
          |
          <MuiLink href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
            Central de Atendimento
          </MuiLink>
          |
          <MuiLink href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
            Créditos
          </MuiLink>
          |
          <MuiLink href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
            Dúvidas Frequentes
          </MuiLink>
        </Typography>

        {/* Seção de texto de contato */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="body2" sx={{ fontSize: '0.8rem', mb: 0.5 }}>
            FAPERJ - Fundação Carlos Chagas Filho de Amparo à Pesquisa do Estado do Rio de Janeiro
          </Typography>
          <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
            Av. Erasmo Braga, 118 - 6º andar - Centro - Rio de Janeiro, RJ - Cep 20.020-000 - (21) 2333-2800
          </Typography>
        </Box>

        {/* Seção de logos */}
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          {logos.map((logo, index) => (
            <Grid item key={index} sx={{ width: { xs: 60, sm: 80, md: 100 } }}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={100}
                height={50}
                layout="responsive"
                objectFit="contain"
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;