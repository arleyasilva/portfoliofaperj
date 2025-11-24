// src/components/Layout.tsx
import React, { ReactNode } from "react";
import { Box, Container } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",

        // 🔹 FUNDO GLOBAL (padronizado com o restante da plataforma)
        "&::before": {
          content: '""',
          position: "fixed",
          inset: 0,
          backgroundImage: "url(/images/fundo-branco.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          zIndex: -2,
        },

        // 🔹 Camada de opacidade suave (pode ajustar se quiser)
        "&::after": {
          content: '""',
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(255,255,255,0.85)",
          zIndex: -1,
        },
      }}
    >
      {/* 🔹 HEADER FIXO NO TOPO */}
      <Header />

      {/* 🔹 CONTEÚDO CENTRAL PADRONIZADO */}
      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          py: { xs: 4, md: 6 },
          mt: { xs: 10, md: 12 }, // distância para não ficar atrás do Header
        }}
      >
        {children}
      </Container>

      {/* 🔹 FOOTER */}
      <Footer />
    </Box>
  );
};

export default Layout;
