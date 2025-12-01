import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from "@mui/material/styles";
import React from "react";
import { STATS_DATA } from "../data/faperj-data";

// 🔵 Estilo do card grande
const TopCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#2989b5",
  color: "white",
  padding: theme.spacing(4),
  textAlign: "center",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  width: "100%",         // ← Ajustado para 100%
  maxWidth: 1410,    // ← Limite elegante
  margin: "0 auto",      // ← Centralizado
}));

// 🔵 Estilo dos cards menores
const StatCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#2989b5",
  color: "white",
  padding: theme.spacing(3),
  textAlign: "center",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

// 🔵 Formatador de números
const formatValue = (value: number, isCurrency: boolean = false) => {
  if (isCurrency && value >= 1000000000) {
    const formattedValue = (value / 1000000000).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `R$ ${formattedValue} Bi`;
  }
  if (isCurrency) {
    return `R$ ${value.toLocaleString("pt-BR")}`;
  }
  return value.toLocaleString("pt-BR");
};

const StatisticalCards: React.FC = () => {
  const { valorTotal, cardData, sourceText } = STATS_DATA;

  return (
    <Box sx={{ py: 6, backgroundColor: "transparent" }}>
      <Container
        maxWidth="xl"
        sx={{
          border: "3px solid #8B1A3F",
          borderRadius: 2,
          pt: 6,
          pb: 4,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {/* 🔻 Título superior */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            px: 2,
            zIndex: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 750,
              color: "#124b6c",
              fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" },
              whiteSpace: "nowrap",
            }}
          >
            FAPERJ em números
          </Typography>
        </Box>

        {/* 🔵 Card grande */}
        <TopCard>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, fontSize: { xs: "2rem", md: "3rem" } }}
          >
            {formatValue(valorTotal, true)}
          </Typography>

          <Typography
            variant="h6"
            sx={{ mt: 1, fontSize: { xs: "1rem", md: "1.25rem" } }}
          >
            Investimento do Governo do Estado do Rio de Janeiro em Ciência,
            Tecnologia e Inovação
          </Typography>
        </TopCard>

        {/* 🔵 Cards menores */}
        <Grid container spacing={3} justifyContent="center">
          {cardData.map((card, i) => (
            <Grid xs={12} sm={6} md={2.4} key={i}>
              <StatCard>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {formatValue(card.value, card.isCurrency)}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  {card.label}
                </Typography>
              </StatCard>
            </Grid>
          ))}
        </Grid>

        {/* 🔻 Divisor e fonte */}
        <Divider sx={{ width: "100%", mt: 2, mb: 1 }} />

        <Typography
          variant="caption"
          sx={{
            color: "#555",
            fontStyle: "italic",
            textAlign: "left",
          }}
        >
          {sourceText}
        </Typography>
      </Container>
    </Box>
  );
};

export default StatisticalCards;
