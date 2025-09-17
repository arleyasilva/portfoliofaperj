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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import React, { useState } from 'react';

// Componente ChartCard
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
    p: 1,
    minWidth: 0,
    boxShadow: 3,
    borderLeft: `4px solid ${borderColor}`,
    backgroundColor: 'transparent',
    position: 'relative',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    height: 350,
  }}>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography
            sx={{
              fontWeight: 600,
              color: '#4169E1',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '12px'
            }}
          >
            Gráfico 12 - Valor total de fomentos da FAPERJ por sexo e ano – 2019 a 2024
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              color: '#4169E1',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '12px'
            }}
          >
             (em milhões de reais)
          </Typography>
        </Box>
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
      <Divider sx={{ my: 0, backgroundColor: 'rgba(255,255,255,0.2)' }} />
    </Box>
    <Box sx={{ flex: 1, height: 300, width: '100%' }}>
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

// Dados para o Gráfico 12
const anos = ['2019', '2020', '2021', '2022', '2023', '2024'];
const totalAnoF_R$ = [88852026, 112820717, 234362535, 233311175, 190993128, 217592174];
const totalAnoM_R$ = [123201471, 170285175, 365381106, 255622149, 217245749, 251198895];

const data = anos.map((ano, index) => ({
  ano: ano,
  'Feminino (R$)': totalAnoF_R$[index] / 1_000_000,
  'Masculino (R$)': totalAnoM_R$[index] / 1_000_000,
}));

// Paleta de cores do Gráfico 12
const PAIR_C = { F: '#FBC02D', M: '#5F93CF' };

// Função para formatar os valores para milhões
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

const Grafico12 = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRefresh = () => {
    console.log('Dados do Gráfico 12 sendo recarregados...');
  };

  const chartTitle = "Gráfico 12 - Valor total de fomentos da FAPERJ por sexo e ano – 2019 a 2024 (em milhões de reais)";

  return (
    <ChartCard
      title={chartTitle}
      borderColor={PAIR_C.F}
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
    >
      <Box sx={{ height: 300, width: 550 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="ano" tick={{ fontSize: 12, fontFamily: 'Roboto' }} />
            <YAxis
              tickFormatter={(value) => `R$ ${value} mi`}
              tick={{ fontSize: 12, fontFamily: 'Roboto' }}
            />
            <Tooltip
              formatter={(value: number) => [moneyAbbrevBR(value * 1_000_000), 'Valor (R$)']}
              labelFormatter={(label) => `Ano: ${label}`}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingTop: 20 }} />
            <Line
              type="monotone"
              dataKey="Feminino (R$)"
              stroke={PAIR_C.F}
              strokeWidth={3}
              dot={{ stroke: PAIR_C.F, strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="Masculino (R$)"
              stroke={PAIR_C.M}
              strokeWidth={3}
              dot={{ stroke: PAIR_C.M, strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};

export default Grafico12;