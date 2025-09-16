import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

// Interfaces (não precisam ser alteradas)
interface StatsData {
  projetos: number;
  editais: number;
  pesquisasContempladas: number;
  bolsas: number;
  fomentos: number;
}
interface StatisticalCardsProps {
  statsData: StatsData;
}
interface CardData {
  value: number | undefined;
  label: string;
}

// Estilos dos cards (não precisam ser alterados)
const StatCard = styled(Paper)(({ theme }) => ({
  backgroundColor: '#52839b',
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

const StatisticalCards: React.FC<StatisticalCardsProps> = ({ statsData }) => {
  const cardData: CardData[] = [
    { value: statsData?.projetos, label: 'Projetos' },
    { value: statsData?.editais, label: 'Editais lançados' },
    { value: statsData?.pesquisasContempladas, label: 'Pesquisas contempladas' },
    { value: statsData?.bolsas, label: 'Bolsas' },
    { value: statsData?.fomentos, label: 'Em fomentos' },
  ];

  return (
    <Box sx={{ py: 6, backgroundColor: 'transparent' }}>
      <Container
           maxWidth="lg"
           sx={{
           // ...
           border: '2px solid #8B1A3F',
           borderRadius: 2,
           position: 'relative',
           height: 'auto', // Garanta que a altura seja flexível
           pt: 4,
           pb: 8,
           px: { xs: 4, sm: 8, md: 10 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center', // <<< Adicione esta linha
          }}
        >
        {/*
          Container do Título:
          Posicionado para "quebrar" a borda superior.
        */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute', // Posicionamento absoluto dentro do Container
            top: 0, 
            left: '50%', // Centraliza horizontalmente
            transform: 'translate(-50%, -50%)', // Ajusta a centralização, levando em conta a altura do box
            backgroundColor: 'white', // O fundo branco faz o texto "cobrir" a linha da borda
            px: 2, // Espaçamento para o texto não encostar nas linhas
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#4169E1', // Cor azul
              whiteSpace: 'nowrap',
            }}
          >
            FAPERJ em números
          </Typography>
        </Box>

        {/* Cards de estatística */}
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 0, px: 0 }}>
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
              <StatCard>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {
                    card.label === 'Em fomentos'
                      ? `R$ ${(card.value || 0).toLocaleString()}`
                      : (card.value || 0).toLocaleString()
                  }
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  {card.label}
                </Typography>
              </StatCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StatisticalCards;