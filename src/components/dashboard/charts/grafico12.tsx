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

// Interfaces (não precisam ser alteradas)
interface ChartCardProps {
  title: string;
  borderColor: string;
  children: React.ReactNode;
  loading: boolean;
  error: Error | null;
  onRefresh: () => void;
}

// Componente ChartCard (embutido)
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

// Dados de exemplo, baseados em indicadores-sexo.html
const anos = ['2019', '2020', '2021', '2022', '2023', '2024'];
const totalAnoF_R$ = [88851967, 155172288, 234362535, 233311175, 190993128, 217621174];
const totalAnoM_R$ = [123201471, 170285175, 365381106, 255632149, 191024349, 212558661];

const PAIR_C = { F: '#FBC02D', M: '#5F93CF' };

// Reestruturando os dados para o formato esperado pelo Recharts
const data = anos.map((ano, i) => ({
  name: ano,
  Feminino: totalAnoF_R$[i],
  Masculino: totalAnoM_R$[i],
}));

const Grafico12 = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const handleRefresh = () => { console.log('Dados do Gráfico 12 sendo recarregados...'); };

  return (
    <ChartCard
      title="Gráfico 12 — Total (R$) por ano"
      borderColor={PAIR_C.F}
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
    >
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              tickFormatter={v => moneyAbbrevBR(v)}
              label={{ value: 'R$', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={v => moneyAbbrevBR(v as number)}
              labelFormatter={label => `Ano: ${label}`}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 20 }} />
            <Line
              type="monotone"
              dataKey="Feminino"
              stroke={PAIR_C.F}
              strokeWidth={3}
              name="Feminino (R$)"
              dot={{ stroke: PAIR_C.F, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="Masculino"
              stroke={PAIR_C.M}
              strokeWidth={3}
              name="Masculino (R$)"
              dot={{ stroke: PAIR_C.M, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};

export default Grafico12;