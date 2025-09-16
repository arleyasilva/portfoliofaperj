import { Box, Grid, Typography, IconButton, Link as MuiLink } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import React from 'react';

// Criamos uma interface para tipar cada item da navegação
interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const IconNav = (): JSX.Element => {
<<<<<<< HEAD
  // O array 'navItems' foi editado para remover os itens solicitados
  const navItems: NavItem[] = [
    { label: 'PESQUISADORES', icon: <PersonOutlineIcon />, href: '#busca' },
    { label: 'INDICADORES', icon: <BarChartIcon />, href: '/dashboard' },
=======
  // Tipamos o array 'navItems' para garantir que cada objeto siga a interface
  const navItems: NavItem[] = [
    { label: 'PESQUISADORES', icon: <PersonOutlineIcon />, href: '/pesquisadores' },
    { label: 'PAINEL EM REDE', icon: <BarChartIcon />, href: '#painel-em-rede' },
    { label: 'EDITAIS DA FAPERJ', icon: <CalendarTodayIcon />, href: '/editais' },
    { label: 'PAINEIS UTILIZADOS', icon: <TrendingUpIcon />, href: '/dashboard' },
>>>>>>> 93c902d49c1c71fc308d3c2a3dd7817106cd0e40
    { label: 'BUSCA', icon: <SearchIcon />, href: '#busca' },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#861539',
        color: 'white',
        py: 2,
        boxShadow: 3,
      }}
    >
      <Grid container justifyContent="center" spacing={{ xs: 1, sm: 2 }}>
        {navItems.map((item, index) => (
          <Grid item key={index} xs={12} sm={2}>
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
                padding: (theme) => theme.spacing(2),
                transition: 'background-color 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <IconButton sx={{ color: 'white', mb: 1 }}>
                {item.icon}
              </IconButton>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
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