import {
  Box,
  Card,
  Typography,
  Divider,
  CircularProgress,
  IconButton,
  Alert,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import React from 'react';

interface ChartCardProps {
  title: string;
  borderColor: string;
  children: React.ReactNode;
  loading: boolean;
  error: Error | null;
  onRefresh: () => void;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  borderColor,
  children,
  loading,
  error,
  onRefresh,
}) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      p: 1,
      minWidth: 0,
      boxShadow: 3,
      borderLeft: `4px solid ${borderColor}`,
      backgroundColor: 'transparent',
      position: 'relative',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      height: '100%',
    }}
  >
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0 }}>
        <Typography
          sx={{
            fontWeight: 600,
            color: '#124b6c',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '16px',
          }}
        >
          {title}
        </Typography>
        <IconButton
          onClick={onRefresh}
          size="small"
          sx={{
            visibility: loading ? 'hidden' : 'visible',
            color: 'white',
          }}
          aria-label="Recarregar dados"
        >
          <RefreshIcon fontSize="small" />
        </IconButton>
      </Box>
      <Divider sx={{ my: 1, backgroundColor: 'rgba(255,255,255,0.2)' }} />
    </Box>
    <Box sx={{ flex: 1, height: '100%', width: '100%' }}>
      {error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          Falha ao carregar dados: {error.message}
        </Alert>
      ) : loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress sx={{ color: 'white' }} />
        </Box>
      ) : (
        children
      )}
    </Box>
  </Card>
);

export default ChartCard;