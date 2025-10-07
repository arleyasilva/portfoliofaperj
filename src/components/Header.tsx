import {
  AppBar,
  Toolbar,
  Container,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Link as MuiLink,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useState } from 'react';
import React from 'react';

interface SubmenuItemType {
  text: string;
  href: string;
}

interface MenuItemType {
  text: string;
  href: string;
  subItems?: SubmenuItemType[];
}

const Header = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  // Estado para controlar a expansão do submenu "Indicadores"
  const [isIndicatorsOpen, setIsIndicatorsOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsIndicatorsOpen(false); // Fecha o submenu ao fechar o menu principal
  };

  const handleIndicatorsToggle = () => {
    setIsIndicatorsOpen(!isIndicatorsOpen);
  };

  const menuItems: MenuItemType[] = [
    { text: 'Página Inicial', href: '/' },
    {
      text: 'Indicadores',
      href: '/dashboard',
      subItems: [
        { text: 'Bolsas', href: '/dashboard#bolsas' },
        { text: 'Auxílios', href: '/dashboard#auxilios' },
        { text: 'Área de Conhecimento', href: '/dashboard#area-de-conhecimento' },
        { text: 'Sexo', href: '/dashboard#sexo' },
        { text: 'Regionalização', href: '/dashboard#regionalizacao' },
        { text: 'Internacionalização', href: '/dashboard#internacionalizacao' },
      ],
    },
    { text: 'Politica de dados', href: '/politica-de-dados' },
    { text: 'Sobre', href: '/sobre' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{
        bgcolor: '#6E0E2B',
        color: 'white',
        px: { xs: 1, md: 0 },
        py: { xs: 0.5, md: 0 },
        display: { xs: 'none', md: 'block' },
      }}>
        <Container maxWidth="xl">
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
        sx={{
          boxShadow: 'none',
          paddingY: 0,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingX: { xs: 2, sm: 3, md: 4 },
              paddingY: 0,
              minHeight: 'auto',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link href="/" passHref legacyBehavior>
                <MuiLink
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    src="/images/logo-novo.png"
                    alt="Logo FAPERJ"
                    width={300}
                    height={75}
                    style={{ objectFit: 'contain' }}
                  />
                </MuiLink>
              </Link>
            </Box>

            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ ml: 'auto' }}
              onClick={handleMenuOpen}
            >
              <MenuIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

<Menu
  anchorEl={anchorEl}
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  open={isMenuOpen}
  onClose={handleMenuClose}
  sx={{ mt: 5 }}
  PaperProps={{
    sx: {
      width: 260,
      borderRadius: 2,
      boxShadow: '0px 6px 18px rgba(0,0,0,0.1)',
      bgcolor: '#fff',
      overflow: 'visible',
      p: 1,
    },
  }}
>
  {menuItems.map((item) => (
    <Box key={item.text}>
      {item.subItems ? (
        <>
          {/* Item principal: Indicadores */}
          <MenuItem
            onClick={handleIndicatorsToggle}
            sx={{
              justifyContent: 'center',
              fontWeight: 700,
              color: '#333',
              fontSize: '1rem',
              borderRadius: 1,
              transition: 'background-color 0.2s ease, color 0.2s ease',
              '&:hover': {
                backgroundColor: '#fbe8ee',
                color: '#8A1538',
              },
            }}
          >
            {item.text}
          </MenuItem>

          {/* Submenu dropdown */}
          {isIndicatorsOpen && (
            <Box
              sx={{
                bgcolor: '#f9f9f9',
                borderRadius: 2,
                mt: 1,
                mx: 2,
                mb: 1,
                p: 1,
                boxShadow: 'inset 0 0 5px rgba(0,0,0,0.05)',
              }}
            >
              {item.subItems.map((subItem) => (
                <Link href={subItem.href} key={subItem.text} passHref legacyBehavior>
                  <MuiLink
                    underline="none"
                    sx={{
                      textDecoration: 'none',
                      color: '#333',
                      display: 'block',
                      '&:hover': { color: '#8A1538' },
                    }}
                  >
                    <MenuItem
                      onClick={handleMenuClose}
                      sx={{
                        justifyContent: 'center',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        borderRadius: 1,
                        transition: 'all 0.2s ease',
                        '&:hover': { backgroundColor: '#fbe8ee' },
                      }}
                    >
                      {subItem.text}
                    </MenuItem>
                  </MuiLink>
                </Link>
              ))}
            </Box>
          )}
        </>
      ) : (
        <Link href={item.href} passHref legacyBehavior>
          <MuiLink
            underline="none"
            sx={{
              textDecoration: 'none',
              color: '#333',
              display: 'block',
              '&:hover': { color: '#8A1538' },
            }}
          >
            <MenuItem
              onClick={handleMenuClose}
              sx={{
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '1rem',
                borderRadius: 1,
                transition: 'background-color 0.2s ease, color 0.2s ease',
                '&:hover': { backgroundColor: '#fbe8ee' },
              }}
            >
              {item.text}
            </MenuItem>
          </MuiLink>
        </Link>
      )}
    </Box>
  ))}
</Menu>


    </Box>
  );
};

export default Header;