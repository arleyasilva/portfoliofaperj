import {
  AppBar,
  Toolbar,
  Container,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Link as MuiLink,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import Link from 'next/link'; // Importe o componente Link do Next.js
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useState } from 'react';
import React from 'react';

// 1. Tipagem para os itens do menu
interface MenuItemType {
  text: string;
  href: string;
}

const Header = (): JSX.Element => {
  // 2. Tipagem para o estado do menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  // 3. Tipagem para o evento de abrir o menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // 4. Tipagem para o evento de fechar o menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // 5. Tipagem para o array de itens do menu
  const menuItems: MenuItemType[] = [
    { text: 'Página Inicial', href: '/' },
    { text: 'Indicadores', href: '/dashboard' },
    { text: 'Politica de dados', href: '/politica-de-dados' },
    { text: 'Sobre', href: '/sobre' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Barra superior de ícones sociais */}
      <Box sx={{
        bgcolor: '#6E0E2B',
        color: 'white',
        // px e py controlam o espaçamento horizontal e vertical
        px: { xs: 1, md: 0 },
        py: { xs: 0.5, md: 0 },
        display: { xs: 'none', md: 'block' },
      }}>
        <Container maxWidth="xl">
          {/* A Toolbar foi removida, usando apenas uma Box para controle mais direto */}
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

      {/* Barra principal com logo e menu hambúrguer */}
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
              {/* O link foi alterado para a rota principal do seu projeto */}
              <Link href="/" passHref>
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

            {/* Ícone de menu hambúrguer à direita (visível em todas as telas) */}
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

      {/* Componente Menu que desce ao clicar no ícone */}
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
          <Link href={item.href} key={item.text} passHref>
            <MuiLink color="inherit" underline="none">
              <MenuItem
                onClick={handleMenuClose}
                sx={{ justifyContent: 'center' }}
              >
                {item.text}
              </MenuItem>
            </MuiLink>
          </Link>
        ))}
      </Menu>
    </Box>
  );
};

export default Header;