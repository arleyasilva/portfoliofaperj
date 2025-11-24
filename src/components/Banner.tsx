import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { styled, keyframes } from '@mui/material/styles';
import type { BoxProps } from '@mui/material';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

interface AnimatedBoxProps extends BoxProps {
  delay?: string;
}

const AnimatedBox = styled(Box)<AnimatedBoxProps>(({ delay }) => ({
  animation: `${fadeIn} 1s ease-in-out ${delay || '0s'} forwards`,
  opacity: 0,
}));

const Banner = () => {
  const theme = useTheme();
  const backgroundImageUrl = '/images/fundo.png';
  const logoUrl = '/images/logo-puro.png';

  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: '40vh', sm: '45vh', md: '50vh' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxWidth="md">
        <AnimatedBox delay="0.2s" sx={{ mb: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontStyle: 'italic',
              fontFamily: 'Roboto, sans-serif',
              fontSize: { xs: '1.2rem', sm: '1.6rem', md: '1.5rem' },
            }}
          >
            ciência, tecnologia e inovação
          </Typography>
        </AnimatedBox>

        <AnimatedBox delay="0.8s" sx={{ mb: 2 }}>
          <Image
            src={logoUrl}
            alt="Logo FAPERJ Portfólio em Rede"
            width={600}
            height={250}
            priority
            style={{
              objectFit: 'contain',
              width: '100%',
              height: 'auto',
              maxHeight: '180px',
            }}
          />
        </AnimatedBox>

        <AnimatedBox delay="1.4s">
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              fontFamily: 'Poppins, sans-serif',
              fontSize: { xs: '1.4rem', sm: '2rem', md: '2rem' },
            }}
          >
            transparência, excelência e cooperação
          </Typography>
        </AnimatedBox>
      </Container>
    </Box>
  );
};

export default Banner;
