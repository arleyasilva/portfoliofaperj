import { Box, Typography, IconButton, Link as MuiLink } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Link from 'next/link';
import React from 'react';
import SchoolIcon from '@mui/icons-material/School';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CategoryIcon from '@mui/icons-material/Category';
import WcIcon from '@mui/icons-material/Wc';
import MapIcon from '@mui/icons-material/Map';
import PublicIcon from '@mui/icons-material/Public';

interface NavItem {
  label: string;
  href: string;
  Icon: React.ElementType;
}

const IconNav: React.FC = () => {
  // Novos ícones (sem imagens), inspirados nos 3 anteriores, agora com 6 categorias
  const navItems: NavItem[] = [
    { label: 'Bolsas', href: '/indicadores', Icon: SchoolIcon },
    { label: 'Auxílios', href: '/indicadores', Icon: VolunteerActivismIcon },
    { label: 'Área de Conhecimento', href: '/indicadores', Icon: CategoryIcon },
    { label: 'Sexo', href: '/indicadores-sexo', Icon: WcIcon },
    { label: 'Regionalização', href: '/indicadores', Icon: MapIcon },
    { label: 'Internacionalização', href: '/IndicadoresInternacionaisPage', Icon: PublicIcon },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#861539',
        color: 'white',
        py: 1,
        boxShadow: 3,
      }}
    >
      {/* Título acadêmico/profissional para a seção de indicadores */}
      <Box sx={{ textAlign: 'center', mb: 0.5 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            letterSpacing: 0.6,
            textTransform: 'uppercase',
          }}
        >
          Indicadores
        </Typography>
        <Box sx={{ width: 64, height: 2, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 2, mx: 'auto', my: 0.25 }} />
        <Typography
          variant="body2"
          sx={{ opacity: 0.9 }}
        >
          Navegue pelos principais eixos analíticos
        </Typography>
      </Box>

      <Grid
        container
        justifyContent="center"
        spacing={0}
        columnSpacing={0}
        rowSpacing={0}
        sx={{
          // afasta ainda mais os itens; responsivo para telas maiores
          '& > .MuiGrid2-root': { mx: { xs: 1.5, sm: 2, md: 2.5, lg: 3 } },
        }}
      >
        {navItems.map((item, index) => (
          <Grid key={index} xs="auto" sm="auto" md="auto">
            <MuiLink
              href={item.href}
              component={Link}
              color="inherit"
              underline="none"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: (theme) => theme.spacing(1),
                transition: 'background-color 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <IconButton sx={{ color: 'white', mb: 0 }}>
                <item.Icon sx={{ fontSize: 68 }} />
              </IconButton>

              <Typography variant="body2" sx={{ fontWeight: 600, mt: 0 }}>
                {item.label}
              </Typography>
            </MuiLink>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default IconNav;
