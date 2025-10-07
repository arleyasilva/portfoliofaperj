import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

// Estilo para o cartão grande do topo
const TopCard = styled(Paper)(({ theme }) => ({
  backgroundColor: '#2989b5',
  color: 'white',
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
}));

// Estilos dos cartões menores
const StatCard = styled(Paper)(({ theme }) => ({
  backgroundColor: '#2989b5',
  color: 'white',
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

// Função auxiliar para formatar os valores
const formatValue = (value: number, isCurrency: boolean = false) => {
  // Se o valor for uma moeda e maior que 1 bilhão, formata com "Bi"
  if (isCurrency && value >= 1000000000) {
    const formattedValue = (value / 1000000000).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `R$ ${formattedValue} Bi`;
  }
  // Formata valores de moeda com separador de milhar
  if (isCurrency) {
    return `R$ ${value.toLocaleString('pt-BR')}`;
  }
  // Formata números simples com separador de milhar
  return value.toLocaleString('pt-BR');
};

const StatisticalCards: React.FC = () => {
  // Use os valores numéricos puros aqui
  const valorTotal = 2507282140;
  
  const cardData = [
    { value: 1380000000, label: 'Projetos Contemplados', isCurrency: true },
    { value: 1120000000, label: 'Total em Bolsas', isCurrency: true },
    { value: 62922, label: 'Bolsas' },
    { value: 8392, label: 'Projetos' },
    { value: 886, label: 'Editais Lançados' },
  ];

  return (
    <Box sx={{ py: 6, backgroundColor: 'transparent' }}>
      <Container
        maxWidth="lg"
        sx={{
          border: '3px solid #8B1A3F',
          borderRadius: 2,
          position: 'relative',
          height: 'auto',
          pt: 4,
          pb: 8,
          px: { xs: 4, sm: 8, md: 10 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0, 
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            px: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 750,
              color: '#124b6c',
              whiteSpace: 'nowrap',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
            }}
          >
            FAPERJ em números
          </Typography>
        </Box>

        <Grid container spacing={2} justifyContent="center" sx={{ mt: 0, mx: { xs: -4, sm: -8, md: -10 } }}>
          <Grid item xs={12}>
            <TopCard sx={{ width: 980 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '3rem' } }}>
                {/* Chama a função para formatar o valor de moeda */}
                {formatValue(valorTotal, true)}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                Investimento do Governo do Estado do Rio de Janeiro em Ciência, Tecnologia e Inovação
              </Typography>
            </TopCard>
          </Grid>
          
          <Grid
            container
            item
            xs={12}
            justifyContent="center"
            alignItems="stretch"
            spacing={2}
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '16px',
              mt: 0,
            }}
          >
            {cardData.map((card, index) => (
              <Box key={index} sx={{ gridColumn: 'span 1' }}>
                <StatCard>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {/* Usa a função para formatar os valores, passando `true` se for moeda */}
                    {formatValue(card.value, card.isCurrency)}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ mt: 1 }}>
                    {card.label}
                  </Typography>
                </StatCard>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default StatisticalCards;