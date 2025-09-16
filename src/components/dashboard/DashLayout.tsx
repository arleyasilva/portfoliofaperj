import React, { ReactNode } from 'react';
import { Box, Container, CssBaseline, Grid } from '@mui/material';

interface DashlayoutProps {
  children: ReactNode;
}

const Dashlayout = ({ children }: DashlayoutProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          backgroundColor: 'primary.light',
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {children}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashlayout;