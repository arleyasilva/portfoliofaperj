// src/components/Layout.tsx
import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/images/fundo-branco.png)',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -2,
        },
        '&::after': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          zIndex: -1,
        },
      }}
    >
      <Header />
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;