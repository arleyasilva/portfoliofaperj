import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import React from 'react';

const SearchSection = (): JSX.Element => {
  return (
    <Box id="busca" sx={{
      py: 4,
      px: 2,
      backgroundColor: 'background.paper',
      borderTop: '1px solid',
      borderColor: 'divider'
    }}>
      <Container maxWidth="lg" justifyContent="center">
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Busca
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Investigador / Nome"
              variant="outlined"
              placeholder="Arro"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Palavra-chave"
              variant="outlined"
              placeholder="Pels/ra-chave"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Universidade / Centro de Pesquisa"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Título"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 4,
          gap: 2
        }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 'bold',
              flexGrow: 1
            }}
          >
            BUSCAR
          </Button>
          
          <Button
            variant="outlined"
            color="primary"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 'bold',
              flexGrow: 1
            }}
          >
            Ver outros
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default SearchSection;