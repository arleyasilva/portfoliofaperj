import { Box, Typography, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Image from "next/image";
import type { StaticImageData } from 'next/image';
import React from 'react';

interface Logo {
  src: string | StaticImageData;
  alt: string;
  width?: { xs: string; sm: string; md: string; lg: string };
  height?: { xs: string; sm: string; md: string; lg: string };
  large?: boolean;
  small?: boolean;
  medium?: boolean;
  extraLarge?: boolean;
}

const Footer: React.FC = () => {
  const logos: Logo[] = [
    { src: '/images/secretariadesenvolvimento.png', alt: 'Secretaria de Desenvolvimento', extraLarge: true },
    { src: '/images/logo_faperj_branco_completo.png', alt: 'FAPERJ' },
    { src: '/images/rederio.png', alt: 'Rede Rio' },
    { src: '/images/ouverj.png', alt: 'OUVERJ' },
    { src: '/images/logo_acesso_informacao_peq.png', alt: 'Acesso à Informação' },
    { src: '/images/sei.png', alt: 'Sei RJ', medium: true },
    { src: '/images/disquerio.png', alt: 'Disque Rio', small: true },
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
        width: '100vw',
        maxWidth: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
      }}
    >
      {/* Texto de contato */}
      <Box sx={{ mb: 4, px: { xs: 2, md: 4 } }}>
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
        spacing={{ xs: 2, md: 3 }}
        sx={{ width: '100%', px: { xs: 2, md: 4 } }}
      >
        {logos.map((logo, index) => (
          <Grid key={index} xs={6} sm={4} md={3} lg={logo.extraLarge ? 3 : logo.large ? 2.5 : 1.2}>
            <Box 
              sx={{ 
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: logo.extraLarge ? { xs: '100%', sm: '250px', md: '300px', lg: '350px' }
                    : logo.large ? { xs: '100%', sm: '220px', md: '260px', lg: '300px' }
                    : logo.medium ? { xs: '100%', sm: '130px', md: '140px', lg: '140px' }
                    : logo.small ? { xs: '100%', sm: '100px', md: '120px', lg: '120px' }
                    : { xs: '100%', sm: '160px', md: '160px', lg: '160px' },
                  height: logo.extraLarge ? { xs: '90px', sm: '140px', md: '170px', lg: '200px' }
                    : logo.large ? { xs: '80px', sm: '120px', md: '150px', lg: '180px' }
                    : logo.medium ? { xs: '60px', sm: '85px', md: '90px', lg: '90px' }
                    : logo.small ? { xs: '60px', sm: '70px', md: '80px', lg: '80px' }
                    : { xs: '60px', sm: '100px', md: '100px', lg: '100px' },
                  maxWidth: '100%'
                }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  role="img"
                  data-testid="footer-logo"
                  style={{
                    objectFit: "contain",
                    maxWidth: '100%'
                  }}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Footer;
