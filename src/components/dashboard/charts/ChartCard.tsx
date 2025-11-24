// src/components/dashboard/charts/ChartCard.tsx
import React from "react";
import {
  Card,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  borderColor?: string;
  sourceText?: string;
  loading?: boolean;
  error?: Error | null;
  onRefresh?: () => void;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  children,
  borderColor = "#2989b5",
  sourceText,
  loading = false,
  error = null,
  onRefresh,
}) => {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        boxShadow: 3,
        height: 430, // altura padrão A
        display: "flex",
        flexDirection: "column",
        borderLeft: `4px solid ${borderColor}`,
        backgroundColor: "#ffffff",
      }}
    >
      {/* Cabeçalho */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          color="#124b6c"
          sx={{ fontSize: 16 }}
        >
          {title}
        </Typography>

        {onRefresh && (
          <IconButton
            onClick={onRefresh}
            size="small"
            aria-label="Recarregar dados"
          >
            <RefreshIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Divider />

      {/* Área do gráfico */}
      <Box sx={{ flex: 1, mt: 1, minHeight: 300 }}>
        {error ? (
          <Alert severity="error" sx={{ mt: 2 }}>
            Falha ao carregar dados: {error.message}
          </Alert>
        ) : loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          children
        )}
      </Box>

      {/* Fonte dos dados */}
      {sourceText && (
        <Box sx={{ mt: 1 }}>
          <Typography
            variant="caption"
            sx={{
              fontFamily: "Roboto, sans-serif",
              color: "rgba(0, 0, 0, 0.6)",
              fontStyle: "italic",
            }}
          >
            {sourceText}
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default ChartCard;
