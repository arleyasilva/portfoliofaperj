import { Box, Container, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { styled, keyframes } from '@mui/material/styles';
import type { BoxProps } from '@mui/material';

// Definindo os tipos para a animação
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Criando uma interface para tipar a prop 'delay' do componente animado
interface AnimatedBoxProps extends BoxProps {
  delay?: string;
}

// Usando a interface para tipar o componente estilizado
const AnimatedBox = styled(Box)<AnimatedBoxProps>(({ theme, delay }) => ({
  animation: `${fadeIn} 1s ease-in-out ${delay || '0s'} forwards`,
  opacity: 0,
}));

// O componente Banner agora tem um tipo de retorno explícito
const Banner = (): JSX.Element => {
  const theme = useTheme();

  const backgroundImageUrl = '/images/fundo.png';
  const logoUrl = '/images/logo-puro.png';

  return (
    <Box
      sx={{
        width: '100%',
        height: '50vh',
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
        {/* Dizer 1: "ciência, tecnologia e inovação" */}
        <AnimatedBox delay="0.2s" sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: { xs: '0.8rem', sm: '1rem' }, // <<<<< Altere aqui
            }}
          >
            ciência, tecnologia e inovação
          </Typography>
        </AnimatedBox>

        {/* Logo central */}
        <AnimatedBox delay="0.8s" sx={{ mb: 2 }}>
          <Image
            src={logoUrl}
            alt="Logo FAPERJ Portfólio em Rede"
            width={600} // <<<<< Altere aqui
            height={250} // <<<<< E aqui
            style={{ objectFit: 'contain' }}
          />
        </AnimatedBox>

        {/* Dizer 2: "transparência, excelência e cooperação" */}
        <AnimatedBox delay="1.4s">
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.2rem' }, // <<<<< Altere aqui
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