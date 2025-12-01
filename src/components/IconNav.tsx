import { Box, Typography, IconButton, Link as MuiLink } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

interface NavItem {
  label: string;
  iconPath: string;
  href: string;
}

const IconNav: React.FC = () => {
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
          <Grid key={index} xs={12} sm={2}>
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
                <Image src={item.iconPath} alt={item.label} width={50} height={50} />
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
