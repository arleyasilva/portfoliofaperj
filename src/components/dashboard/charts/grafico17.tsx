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
            Gráfico 17 - Quantidade de bolsas concedidas pela FAPERJ por sexo e ano – 2019 a 2024
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              color: '#4169E1',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '12px'
            }}
          >
             (em número de bolsas)
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

// Dados para o Gráfico 17
const anos = ['2019', '2020', '2021', '2022', '2023', '2024'];
const qtdBolF = [4473, 4100, 4581, 7165, 7656, 8007];
const qtdBolM = [3709, 3309, 3705, 5025, 5181, 5846];

// Combine os dados para o Recharts
const data = anos.map((ano, index) => ({
  ano: ano,
  'Feminino': qtdBolF[index],
  'Masculino': qtdBolM[index],
}));

// Paleta de cores do Gráfico 17
const PAIR_B = { F: '#F28E2B', M: '#2E7D32' };

const Grafico17 = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRefresh = () => {
    console.log('Dados do Gráfico 17 sendo recarregados...');
  };

  const chartTitle = "Gráfico 17 - Quantidade de bolsas concedidas pela FAPERJ por sexo e ano – 2019 a 2024 (em número de bolsas)";

  return (
    <ChartCard
      title={chartTitle}
      borderColor={PAIR_B.F}
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
              tick={{ fontSize: 12, fontFamily: 'Roboto' }}
              label={{ value: 'Quantidade', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={(value: number) => [value, 'Quantidade']}
              labelFormatter={(label) => `Ano: ${label}`}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingTop: 20 }} />
            <Line
              type="monotone"
              dataKey="Feminino"
              stroke={PAIR_B.F}
              strokeWidth={3}
              dot={{ stroke: PAIR_B.F, strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="Masculino"
              stroke={PAIR_B.M}
              strokeWidth={3}
              dot={{ stroke: PAIR_B.M, strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};

export default Grafico17;