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
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
  margin: "0 auto",
  overflow: "hidden",
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
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
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
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
    <Box sx={{ py: 6, backgroundColor: "transparent", px: { xs: 1, sm: 2, md: 3 }, position: "relative" }}>
      <Container
        maxWidth="xl"
        sx={{
          border: "3px solid #8B1A3F",
          borderRadius: 2,
          pt: 6,
          pb: 4,
          px: { xs: 2, sm: 4, md: 5 },
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2, sm: 2.5, md: 3 },
          boxSizing: "border-box",
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
            px: { xs: 2, sm: 3 },
            zIndex: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 750,
              color: "#124b6c",
              fontSize: { xs: "1.4rem", sm: "2rem", md: "2.5rem" },
              whiteSpace: "nowrap",
            }}
          >
            FAPERJ em números
          </Typography>
        </Box>

        {/* 🔵 Card grande */}
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <TopCard>
            <Typography
              variant="h3"
              sx={{ 
                fontWeight: 700, 
                fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" } 
              }}
            >
              {formatValue(valorTotal, true)}
            </Typography>

            <Typography
              variant="h6"
              sx={{ 
                mt: 1, 
                fontSize: { xs: "0.875rem", sm: "1rem", md: "1.25rem" },
                lineHeight: 1.4,
              }}
            >
              Investimento do Governo do Estado do Rio de Janeiro em Ciência,
              Tecnologia e Inovação
            </Typography>
          </TopCard>
        </Box>

        {/* 🔵 Cards menores */}
        <Grid
          container
          spacing={{ xs: 6, sm: 4, md: 6 }}
          justifyContent="center"
        >
          {cardData.map((card, i) => (
            <Grid xs={6} sm={6} md={2.4} key={i}>
              <StatCard>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" }
                  }}
                >
                  {formatValue(card.value, card.isCurrency)}
                </Typography>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    mt: 1,
                    fontSize: { xs: "0.75rem", sm: "0.875rem" }
                  }}
                >
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
