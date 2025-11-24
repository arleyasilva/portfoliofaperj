import { Box, Grid, Typography, IconButton, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image'; // Importação do componente Image

// Criamos uma interface para tipar cada item da navegação
interface NavItem {
  label: string;
  iconPath: string; // 'icon' foi alterado para 'iconPath' para maior clareza
  href: string;
}

const IconNav = (): JSX.Element => {
  // Use os caminhos para seus ícones na pasta public
  const navItems: NavItem[] = [
    { label: 'PESQUISADORES', iconPath: '/images/Pesquisadores.png', href: '#busca' },
    { label: 'INDICADORES', iconPath: '/images/Dados.png', href: '/dashboard' },
    { label: 'BUSCA', iconPath: '/images/Busca.png', href: '#busca' },
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
                {/* Usamos o componente Image do Next.js */}
                <Image
                  src={item.iconPath}
                  alt={item.label}
                  width={50} // Ajuste o tamanho conforme a necessidade
                  height={50} // Ajuste o tamanho conforme a necessidade
                />
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