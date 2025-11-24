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
import GraficoLineRace from '../components/dashboard/charts/GraficoLineRace'; 
import Grafico9_1 from '../components/dashboard/charts/grafico9_1'; 
import Grafico16_1 from '../components/dashboard/charts/grafico16_1'; 

// NOVAS IMPORTAÇÕES PARA INTERNACIONALIZAÇÃO (Ajustar nomes conforme seus arquivos)
import GraficoInt1 from '../components/dashboard/charts/GraficoIntPaises'; // Instituições por País
import GraficoInt2 from '../components/dashboard/charts/GraficoIntCidades'; // Distribuição por Grande Área
import GraficoInt3 from '../components/dashboard/charts/GraficoIntAnos'; // Série Temporal por Ano
import GraficoInt4 from '../components/dashboard/charts/GraficoIntAreas'; // Top Cidades
import GraficoInt5 from '../components/dashboard/charts/GraficoIntSankey'; // Sankey

// Componentes de Layout e Navegação
import Header from '../components/Header';
import Footer from '../components/Footer';

// Mapeamento das categorias para os gráficos
const chartCategories = {
  // Incluindo 9_1 e 16_1
  'Bolsas': [Grafico3, Grafico4, Grafico9, Grafico9_1, Grafico16, Grafico17],
  'Auxílios': [Grafico3, Grafico4, Grafico5, Grafico6, Grafico7, Grafico8, Grafico14, Grafico15],
  'Área de Conhecimento': [Grafico2, Grafico6],
  'Sexo': [Grafico10, Grafico11, Grafico12, Grafico13, Grafico14, Grafico15, Grafico16, Grafico16_1, Grafico17],
  'Regionalização': [GraficoLineRace],
  
  // CORRIGIDO: Adicionados os 5 gráficos internacionais
  'Internacionalização': [GraficoInt1, GraficoInt2, GraficoInt3, GraficoInt4, GraficoInt5], 
};

const Dashboard = (): JSX.Element => {
  const [activeCategory, setActiveCategory] = useState<keyof typeof chartCategories>('Bolsas');

  const renderCharts = () => {
    const chartsToRender = chartCategories[activeCategory];
    if (chartsToRender.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Nenhum gráfico disponível para esta categoria ainda.
          </Typography>
        </Box>
      );
    }
    
    // O Sankey chart costuma ser wide (xs=12), enquanto os demais podem ser lado a lado (xs=6)
    return (
      <Grid container spacing={4} justifyContent="center">
        {chartsToRender.map((ChartComponent, index) => {
          // Exceção para o Sankey Chart (GraficoInt5) ocupar a largura total
          const isWide = ChartComponent === GraficoInt5; 
          
          return (
            <Grid item xs={12} sm={isWide ? 12 : 6} md={isWide ? 12 : 6} key={index}>
              <ChartComponent />
            </Grid>
          );
        })}
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
            backgroundColor: '#124b6c', // Cor azul escura padronizada
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
                borderColor: '#861539', // Cor avermelhada
                color: activeCategory === category ? 'white' : '#861539', // Cor avermelhada
                backgroundColor: activeCategory === category ? '#861539' : 'transparent', // Cor avermelhada
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