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
import React, { useState } from "react";
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
  const isMenuOpen = Boolean(anchorEl);
  const [isIndicatorsOpen, setIsIndicatorsOpen] = useState(false);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsIndicatorsOpen(false);
  };

  const handleIndicatorsToggle = () => {
    setIsIndicatorsOpen(!isIndicatorsOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") handleMenuClose();
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
      {/* SOCIAL BAR */}
      <Box sx={{ bgcolor: "#6E0E2B", color: "white", py: 0.6 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, alignItems: "center" }}>
            <IconButton size="small" color="inherit" aria-label="Facebook">
              <FacebookIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="inherit" aria-label="Twitter">
              <TwitterIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="inherit" aria-label="Instagram">
              <InstagramIcon fontSize="small" />
            </IconButton>
          </Box>
        </Container>
      </Box>

      {/* LOGO + MENU */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1 }}>
            <Link href="/" passHref legacyBehavior>
              <MuiLink sx={{ display: "flex", alignItems: "center" }}>
                <Image
                  src="/images/logo-novo.png"
                  alt="Logo FAPERJ"
                  width={300}
                  height={75}
                  style={{ objectFit: "contain" }}
                />
              </MuiLink>
            </Link>

            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              onKeyDown={handleKeyDown}
              aria-label="Abrir menu"
              aria-haspopup="true"
              aria-controls="menu-principal"
              aria-expanded={isMenuOpen}
            >
              <MenuIcon sx={{ fontSize: 32, color: "#6E0E2B" }} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* POPUP MENU */}
      <Menu
        id="menu-principal"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        onKeyDown={handleKeyDown}
        MenuListProps={{ role: "menu", "aria-label": "Opções do menu" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{
          sx: {
            width: 260,
            borderRadius: 2,
            mt: 1,
            bgcolor: "#fafafa",
            boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
            p: 1,
          },
        }}
      >
        {menuItems.map((item) => (
          <Box key={item.text}>
            {item.subItems ? (
              <>
                <MenuItem
                  onClick={handleIndicatorsToggle}
                  sx={{ fontWeight: 700, justifyContent: "center", color: "#000" }}
                >
                  {item.text}
                </MenuItem>

                {isIndicatorsOpen && (
                  <Box sx={{ p: 1 }}>
                    {item.subItems.map((subItem) => (
                      <Link key={subItem.text} href={subItem.href} passHref legacyBehavior>
                        <MuiLink underline="none">
                          <MenuItem
                            onClick={handleMenuClose}
                            sx={{
                              justifyContent: "center",
                              fontSize: "0.95rem",
                              borderRadius: 1,
                              color: "#333",
                              "&:hover": { backgroundColor: "#f0f0f0", color: "#6E0E2B" },
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
              <Link href={item.href} passHref legacyBehavior>
                <MuiLink underline="none">
                  <MenuItem sx={{ justifyContent: "center", fontWeight: 600, color: "#000" }}>
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
