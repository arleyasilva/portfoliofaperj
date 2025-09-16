// src/components/dashboard/charts/grafico4.tsx
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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import React, { useState } from 'react';

interface ChartCardProps {
  title: string;
  borderColor: string;
  children: React.ReactNode;
  loading: boolean;
  error: Error | null;
  onRefresh: () => void;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, borderColor, children, loading, error, onRefresh }) => (
  <Card sx={{
    display: 'flex',
    flexDirection: 'column',
    p: 3,
    minWidth: 0,
    boxShadow: 3,
    borderLeft: `4px solid ${borderColor}`,
    backgroundColor: 'transparent',
    position: 'relative',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    height: 350,
  }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, color: '#4169E1' }}>
        {title}
      </Typography>
      <IconButton
        onClick={onRefresh}
        size="small"
        sx={{
          visibility: loading ? 'hidden' : 'visible',
          color: 'white'
        }}
        aria-label="Recarregar dados"
      >
        <RefreshIcon fontSize="small" />
      </IconButton>
    </Box>
    <Divider sx={{ my: 1, backgroundColor: 'rgba(255,255,255,0.2)' }} />
    <Box sx={{ flex: 1 }} height={300}>
      {error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          Falha ao carregar dados: {error.message}
        </Alert>
      ) : loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress sx={{ color: 'white' }} />
        </Box>
      ) : children}
    </Box>
  </Card>
);

const moneyAbbrevBR = (n: number) => {
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) {
    return 'R$ ' + (n / 1_000_000_000).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' bi';
  }
  if (abs >= 1_000_000) {
    return 'R$ ' + (n / 1_000_000).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' mi';
  }
  if (abs >= 1_000) {
    return 'R$ ' + (n / 1_000).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' mil';
  }
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n);
};

// Dados de exemplo, baseados em dashboard-data.js
const centrosPesquisaTop = [
  'FIOCRUZ', 'FAPERJ', 'IECPN', 'CBPF', 'IMPA', 'INCA', 'PESAGRO', 'INMETRO', 'EMBRAPA', 'CBPF'
];
const instBolsasCentrosTop = [
  69440987, 52655559, 378475, 6794075, 9370930, 4802850, 17045700, 5026640, 5906980, 6254748
];
const instAuxiliosCentrosTop = [
  80176690, 677769, 27190613, 17721912, 9959292, 12785087, 18792, 11646782, 8819543, 6276803
];

const data = centrosPesquisaTop.map((centro, i) => ({
  name: centro,
  bolsas: instBolsasCentrosTop[i],
  auxilios: instAuxiliosCentrosTop[i],
}));

const Grafico4 = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const handleRefresh = () => { console.log('Dados do Gráfico 4 sendo recarregados...'); };

  return (
    <ChartCard
      title="Gráfico 4 — Centros de Pesquisa — Bolsas × Auxílios"
      borderColor="#0c6d83"
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
    >
      <Box sx={{ height: 300, width: 500}}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 20, right: 10, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" interval={0} angle={-25} textAnchor="end" height={60} />
            <YAxis tickFormatter={v => moneyAbbrevBR(v)} />
            <Tooltip formatter={v => moneyAbbrevBR(v)} />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 20 }} />
            <Bar dataKey="bolsas" fill="#5eb3e6" name="Bolsas" />
            <Bar dataKey="auxilios" fill="#f6b343" name="Auxílios" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};

export default Grafico4;