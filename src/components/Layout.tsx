// src/components/Layout.tsx
import React, { ReactNode } from "react";
import { Box, Container } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";

// 🔹 Skip Link acessível — invisível até receber foco
const SkipToContent = () => (
  <a href="#main-content" className="skip-link" aria-label="Pular para o conteúdo principal">
    Pular para o conteúdo principal
  </a>
);

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",

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

          "&::after": {
            content: '""',
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.85)",
            zIndex: -1,
          },
        }}
      >
        <Header />

      {/* <SkipToContent /> */}

        <Container
          id="main-content"
          maxWidth="lg"
          sx={{
            flexGrow: 1,
            py: { xs: 4, md: 6 },
            mt: { xs: 2, md: 4 }, // reduz margem superior já que Skip/ Header ocupam espaço
          }}
          tabIndex={-1} // garante foco programático por link
        >
          {children}
        </Container>

        <Footer />
      </Box>
    </>
  );
};

export default Layout;
