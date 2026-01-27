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
  // Apontamentos alinhados com o menu hambúrguer (Header.tsx -> /dashboard?categoria=...)
  const navItems: NavItem[] = [
    { label: 'Bolsas', href: '/dashboard?categoria=bolsas', Icon: SchoolIcon },
    { label: 'Auxílios', href: '/dashboard?categoria=auxilios', Icon: VolunteerActivismIcon },
    { label: 'Área de Conhecimento', href: '/dashboard?categoria=area-de-conhecimento', Icon: CategoryIcon },
    { label: 'Gênero', href: '/dashboard?categoria=sexo', Icon: WcIcon },
    { label: 'Regionalização', href: '/dashboard?categoria=regionalizacao', Icon: MapIcon },
    { label: 'Internacionalização', href: '/dashboard?categoria=internacionalizacao', Icon: PublicIcon },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#861539',
        color: 'white',
        py: { xs: 1.5, sm: 1 },
        boxShadow: 3,
        overflow: 'hidden',
      }}
    >
      {/* Título acadêmico/profissional para a seção de indicadores */}
      <Box sx={{ textAlign: 'center', mb: { xs: 0.75, sm: 0.5 } }}>
        <Typography
          sx={{
            fontWeight: 800,
            letterSpacing: 0.6,
            textTransform: 'uppercase',
            fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2rem' },
          }}
        >
          Indicadores
        </Typography>
        <Box sx={{ width: 64, height: 2, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 2, mx: 'auto', my: 0.25 }} />
      </Box>

      <Grid
        container
        justifyContent="center"
        spacing={{ xs: 1, sm: 0 }}
        sx={{
          // afasta os itens de forma responsiva
          '& > .MuiGrid2-root': { 
            mx: { xs: 0, sm: 2, md: 2.5, lg: 3 },
            px: { xs: 0.25, sm: 0 },
          },
        }}
      >
        {navItems.map((item, index) => (
          <Grid key={index} xs={4} sm="auto" md="auto">
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
                padding: { xs: 0.25, sm: 1 },
                transition: 'background-color 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <IconButton sx={{ color: 'white', mb: 0, p: { xs: 0.25, sm: 1 } }}>
                <item.Icon sx={{ fontSize: { xs: 36, sm: 56, md: 68 } }} />
              </IconButton>

              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600, 
                  mt: { xs: 0.25, sm: 0 },
                  fontSize: { xs: '0.65rem', sm: '0.875rem' },
                  lineHeight: 1.1,
                  whiteSpace: { xs: 'nowrap', sm: 'normal' },
                  overflow: { xs: 'hidden', sm: 'visible' },
                  textOverflow: { xs: 'ellipsis', sm: 'clip' },
                }}
              >
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
