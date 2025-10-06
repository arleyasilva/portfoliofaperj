import Head from 'next/head';
import { Box, useTheme, Grid, Container, Typography, Button } from '@mui/material';
import React, { useState } from 'react';

// Importe todos os seus componentes de gráficos aqui
import Grafico1 from '../components/dashboard/charts/grafico1';
import Grafico2 from '../components/dashboard/charts/grafico2';
import Grafico3 from '../components/dashboard/charts/grafico3';
import Grafico4 from '../components/dashboard/charts/grafico4';
import Grafico5 from '../components/dashboard/charts/grafico5';
import Grafico6 from '../components/dashboard/charts/grafico6';
import Grafico7 from '../components/dashboard/charts/grafico7';
import Grafico8 from '../components/dashboard/charts/grafico8';
import Grafico9 from '../components/dashboard/charts/grafico9';
import Grafico10 from '../components/dashboard/charts/grafico10';
import Grafico11 from '../components/dashboard/charts/grafico11';
import Grafico12 from '../components/dashboard/charts/grafico12';
import Grafico13 from '../components/dashboard/charts/grafico13';
import Grafico14 from '../components/dashboard/charts/grafico14';
import Grafico15 from '../components/dashboard/charts/grafico15';
import Grafico16 from '../components/dashboard/charts/grafico16';
import Grafico17 from '../components/dashboard/charts/grafico17';
import Grafico18 from '../components/dashboard/charts/grafico18';

// Componentes de Layout e Navegação
import Header from '../components/Header';
import Footer from '../components/Footer';

// Mapeamento das categorias para os gráficos
const chartCategories = {
  'Bolsas': [Grafico3, Grafico4, Grafico9, Grafico16, Grafico17],
  'Auxílios': [Grafico3, Grafico4, Grafico5, Grafico6, Grafico7, Grafico8, Grafico14, Grafico15],
  'Área de Conhecimento': [Grafico2, Grafico6],
  'Sexo': [Grafico10, Grafico11, Grafico12, Grafico13, Grafico14, Grafico15, Grafico16, Grafico17],
};

const Dashboard = (): JSX.Element => {
  const [activeCategory, setActiveCategory] = useState<keyof typeof chartCategories>('Bolsas');

  const renderCharts = () => {
    const chartsToRender = chartCategories[activeCategory];
    return (
      <Grid container spacing={4} justifyContent="center">
        {chartsToRender.map((ChartComponent, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <ChartComponent />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box>
      <Head>
        <title>Portfolio FAPERJ - Indicadores</title>
        <meta name="description" content="Dashboard com indicadores da FAPERJ." />
      </Head>
      
      <Header />
      
      <Container maxWidth="xl" sx={{ my: 4 }}>
        {/* Faixa de título estilizada */}
        <Box 
          sx={{
            textAlign: 'center',
            mb: 4,
            p: 2,
            backgroundColor: '#124b6c', // Cor azul escura
            borderRadius: '8px',
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            fontWeight="bold"
            color="white" // Cor do texto em branco para contraste
          >
            INDICADORES
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          {Object.keys(chartCategories).map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category as keyof typeof chartCategories)}
              variant={activeCategory === category ? 'contained' : 'outlined'}
              sx={{
                fontWeight: 'bold',
                borderColor: '#861539',
                color: activeCategory === category ? 'white' : '#861539',
                backgroundColor: activeCategory === category ? '#861539' : 'transparent',
                '&:hover': {
                  backgroundColor: '#861539',
                  color: 'white',
                },
              }}
            >
              {category}
            </Button>
          ))}
        </Box>
        
        {renderCharts()}
        
      </Container>
      
      <Footer />
      
    </Box>
  );
};

export default Dashboard;