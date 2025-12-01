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
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

interface SubmenuItemType {
  text: string;
  href: string;
}

interface MenuItemType {
  text: string;
  href: string;
  subItems?: SubmenuItemType[];
}

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isIndicatorsOpen, setIsIndicatorsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsIndicatorsOpen(false);

    // Retorna o foco para o botão ao fechar o menu - Acessibilidade
    buttonRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Fecha menu com ESC
    if (event.key === "Escape") {
      event.preventDefault();
      handleMenuClose();
    }
  };

  const handleIndicatorsToggle = () => {
    setIsIndicatorsOpen((prev) => !prev);
  };

  const menuItems: MenuItemType[] = [
    { text: "Página Inicial", href: "/" },
    {
      text: "Indicadores",
      href: "/dashboard",
      subItems: [
        { text: "Bolsas", href: "/dashboard#bolsas" },
        { text: "Auxílios", href: "/dashboard#auxilios" },
        { text: "Área de Conhecimento", href: "/dashboard#area-de-conhecimento" },
        { text: "Sexo", href: "/dashboard#sexo" },
        { text: "Regionalização", href: "/dashboard#regionalizacao" },
        { text: "Internacionalização", href: "/dashboard#internacionalizacao" },
      ],
    },
    { text: "Política de dados", href: "/politica-de-dados" },
    { text: "Sobre", href: "/sobre" },
  ];

  return (
    <Box sx={{ flexGrow: 1 }} component="header" role="banner">
      {/* 🔹 BAR SUPERIOR SOCIAL */}
      <Box
        sx={{
          bgcolor: "#6E0E2B",
          color: "white",
          py: 0.6,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              alignItems: "center",
            }}
          >
            <IconButton
              size="small"
              color="inherit"
              aria-label="Facebook da FAPERJ"
              component="a"
              href="https://www.facebook.com/faperj"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              color="inherit"
              aria-label="Twitter da FAPERJ"
              component="a"
              href="https://x.com/faperj"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ p: 0 }}
            >
              <Image
                src="/images/x-logo.png"
                alt="X (Twitter)"
                width={20}
                height={20}
                role="img"
                style={{ 
                  objectFit: "contain", 
                  filter: "none",
                  display: "block"
                }}
              />
            </IconButton>

            <IconButton
              size="small"
              color="inherit"
              aria-label="Instagram da FAPERJ"
              component="a"
              href="https://www.instagram.com/faperjoficial/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              color="inherit"
              aria-label="Site da FAPERJ"
              component="a"
              href="https://www.faperj.br"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ p: 0 }} // Remove padding interno
            >
              <Image
                src="/images/faperj-logo.png"
                alt="FAPERJ"
                width={70}
                height={28}
                role="img"
                style={{
                  objectFit: "contain",
                  filter: "none",
                  display: "block", // Remove espaço extra
                }}
              />
            </IconButton>
          </Box>
        </Container>
      </Box>

      {/* 🔹 MENU PRINCIPAL */}
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        role="navigation"
        aria-label="Menu principal"
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1,
            }}
          >
            {/* LOGO */}
            <Link href="/" passHref legacyBehavior>
              <MuiLink sx={{ display: "flex", alignItems: "center" }}>
                <Image
                  src="/images/logo-novo.png"
                  alt="Logotipo da FAPERJ"
                  width={300}
                  height={75}
                  style={{ objectFit: "contain" }}
                />
              </MuiLink>
            </Link>

            {/* BOTÃO DO MENU - ACESSÍVEL */}
            <IconButton
              ref={buttonRef}
              color="inherit"
              onClick={handleMenuOpen}
              onKeyDown={handleKeyDown}
              aria-label="Abrir menu de navegação"
              aria-haspopup="true"
              aria-controls="menu-principal"
              aria-expanded={isMenuOpen}
              sx={{ display: "block" }}
            >
              <MenuIcon sx={{ fontSize: 32, color: "#6E0E2B" }} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* 🔹 POPUP DO MENU */}
      <Menu
        id="menu-principal"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        onKeyDown={handleKeyDown}
        MenuListProps={{
          role: "menu",
          "aria-label": "Opções do menu principal",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          sx: {
            width: 260,
            borderRadius: 2,
            mt: 1,
            bgcolor: "#fafafa",
            boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
            p: 1,
          },
          role: "dialog",
          "aria-modal": true,
        }}
      >
        {menuItems.map((item) => (
          <Box key={item.text}>
            {item.subItems ? (
              <>
                {/* ITEM COM SUBMENU */}
                <MenuItem
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={isIndicatorsOpen}
                  onClick={handleIndicatorsToggle}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleIndicatorsToggle();
                    }
                  }}
                  sx={{
                    fontWeight: 700,
                    justifyContent: "center",
                    color: "#000",
                    borderRadius: 1,
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}
                >
                  {item.text}
                </MenuItem>

                {isIndicatorsOpen && (
                  <Box sx={{ p: 1 }} role="group" aria-label="Submenu Indicadores">
                    {item.subItems.map((subItem) => (
                      <Link key={subItem.text} href={subItem.href} passHref legacyBehavior>
                        <MuiLink underline="none">
                          <MenuItem
                            role="menuitem"
                            onClick={handleMenuClose}
                            sx={{
                              justifyContent: "center",
                              fontSize: "0.95rem",
                              borderRadius: 1,
                              color: "#333",
                              "&:hover": {
                                backgroundColor: "#f0f0f0",
                                color: "#6E0E2B",
                                transition: "0.2s ease",
                              },
                            }}
                          >
                            {subItem.text}
                          </MenuItem>
                        </MuiLink>
                      </Link>
                    ))}
                  </Box>
                )}

                <Divider />
              </>
            ) : (
              // ITEM NORMAL
              <Link href={item.href} passHref legacyBehavior>
                <MuiLink underline="none">
                  <MenuItem
                    role="menuitem"
                    onClick={handleMenuClose}
                    sx={{
                      justifyContent: "center",
                      fontWeight: 600,
                      borderRadius: 1,
                      color: "#000",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
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
