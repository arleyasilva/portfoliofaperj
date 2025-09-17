import Head from 'next/head';
import { Box, useTheme, Grid, Container, Typography, IconButton } from '@mui/material';
import React, { useState } from 'react';

// Importe todos os seus componentes de gráficos aqui
import Grafico1 from '../components/dashboard/charts/grafico1';
import Grafico2 from '../components/dashboard/charts/grafico2';
import Grafico3 from '../components/dashboard/charts/grafico3';
import Grafico4 from '../components/dashboard/charts/grafico4';
import Grafico5 from '../components/dashboard/charts/grafico5';
import Grafico6 from '../components/dashboard/charts/grafico6';
import Grafico7 from '../components/dashboard/charts/grafico7';
import Grafico8 from '../components/dashboard/charts/grafico8';
import Grafico9 from '../components/dashboard/charts/grafico9';
import Grafico10 from '../components/dashboard/charts/grafico10';
import Grafico11 from '../components/dashboard/charts/grafico11';
import Grafico12 from '../components/dashboard/charts/grafico12';
import Grafico13 from '../components/dashboard/charts/grafico13';
import Grafico14 from '../components/dashboard/charts/grafico14';
import Grafico15 from '../components/dashboard/charts/grafico15';
import Grafico16 from '../components/dashboard/charts/grafico16';
import Grafico17 from '../components/dashboard/charts/grafico17';
import Grafico18 from '../components/dashboard/charts/grafico18';

// Componentes de Layout e Navegação
import {
  AppBar,
  Toolbar,
  Link as MuiLink,
  Menu,
  MenuItem,
} from '@mui/material';
import Image from 'next/image';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MenuIcon from '@mui/icons-material/Menu';
import type { StaticImageData } from 'next/image';

// HEADER COMPONENT
interface MenuItemType {
  text: string;
  href: string;
}

const Header = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems: MenuItemType[] = [
    { text: 'Página Inicial', href: '/' },
    { text: 'Indicadores', href: '/dashboard' },
    { text: 'Politica de dados', href: '/politica-de-dados' },
    { text: 'Sobre', href: '/sobre' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{
        bgcolor: '#6E0E2B',
        color: 'white',
        py: 0.5,
        display: { xs: 'none', md: 'block' },
      }}>
        <Container maxWidth="xl">
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1
          }}>
            <IconButton size="small" href="#" color="inherit" aria-label="facebook">
              <FacebookIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" href="#" color="inherit" aria-label="twitter">
              <TwitterIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" href="#" color="inherit" aria-label="instagram">
              <InstagramIcon fontSize="small" />
            </IconButton>
          </Box>
        </Container>
      </Box>

      <AppBar
        position="static"
        color="transparent"
        sx={{ boxShadow: 'none' }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: { xs: 2, sm: 3, md: 4 }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MuiLink
                href="https://faperj.br"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Image
                  src="/images/logo-novo.png"
                  alt="Logo FAPERJ"
                  width={200}
                  height={50}
                  style={{ objectFit: 'contain' }}
                />
              </MuiLink>
            </Box>

            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ ml: 'auto' }}
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        sx={{ mt: 5 }}
        PaperProps={{
          sx: {
            width: 150,
          },
        }}
        >
        {menuItems.map((item) => (
          <MuiLink href={item.href} key={item.text} color="inherit" underline="none">
            <MenuItem
              onClick={handleMenuClose}
              sx={{ justifyContent: 'center' }}
            >
              {item.text}
            </MenuItem>
          </MuiLink>
        ))}
      </Menu>
    </Box>
  );
};

// FOOTER COMPONENT
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

        <Box sx={{ mb: 4 }}>
          <Typography variant="body2" sx={{ fontSize: '0.8rem', mb: 0.5 }}>
            FAPERJ - Fundação Carlos Chagas Filho de Amparo à Pesquisa do Estado do Rio de Janeiro
          </Typography>
          <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
            Av. Erasmo Braga, 118 - 6º andar - Centro - Rio de Janeiro, RJ - Cep 20.020-000 - (21) 2333-2800
          </Typography>
        </Box>

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

// LAYOUT COMPONENT
const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

// DASHBOARD PAGE
const DashboardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Grafico1 />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grafico2 />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grafico3 />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grafico4 />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Grafico5 />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grafico6 />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grafico7 />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grafico8 />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grafico9 />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Grafico10 />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grafico11 />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grafico12 />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grafico13 />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grafico14 />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grafico15 />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grafico16 />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grafico17 />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grafico18 />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  const renderPaginationControls = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
      <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
        {'<'}
      </IconButton>
      {[...Array(totalPages)].map((_, index) => (
        <Typography
          key={index}
          variant="body1"
          sx={{
            mx: 1,
            cursor: 'pointer',
            fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
          }}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </Typography>
      ))}
      <IconButton onClick={handleNextPage} disabled={currentPage === totalPages}>
        {'>'}
      </IconButton>
    </Box>
  );

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
        <Head>
          <title>Portfolio FAPERJ</title>
          <meta name="description" content="Dashboard principal com navegação por páginas" />
        </Head>

        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
            INDICADORES
          </Typography>
          {renderPaginationControls()}
        </Box>

        {renderPageContent()}

        {renderPaginationControls()}
      </Container>
    </Layout>
  );
};

export default DashboardPage;