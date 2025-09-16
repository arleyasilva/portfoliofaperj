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

// Dados de exemplo, baseados em indicadores-data.js
const anos = ['2019', '2020', '2021', '2022', '2023', '2024'];
const tiposAuxilio = [
  'ADT1', 'APQ1', 'APQ2', 'APQ3', 'APQ4', 'INST'
];
const auxiliosTiposPorAno = [
  [11359591, 10104778, 40282991, 35089728, 42274226, 25488398],
  [70873193, 142151020, 424182183, 226756505, 113900562, 182512710],
  [4610114, 2701605, 4942019, 3818953, 13980417, 3492649],
  [52482, 0, 2426904, 3474682, 686211, 3801536],
  [0, 0, 760610, 6349807, 163000, 0],
  [1017396, 2035329, 5234657, 419194, 79893, 3801536]
];
const COLORS = ['#2E7D32', '#9b7bd4', '#f6b343', '#ef8636', '#5eb3e6', '#2aa5c9'];

// Reestruturando os dados para o formato esperado pelo Recharts
const data = anos.map((ano, i) => {
  const obj: { [key: string]: string | number } = { name: ano };
  tiposAuxilio.forEach((tipo, j) => {
    obj[tipo] = auxiliosTiposPorAno[j][i];
  });
  return obj;
});

const Grafico8 = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const handleRefresh = () => { console.log('Dados do Gráfico 8 sendo recarregados...'); };

  return (
    <ChartCard
      title="Gráfico 8 — Valor investido por tipo de auxílio (6 tipos)"
      borderColor="#2E7D32"
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
    >
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={v => moneyAbbrevBR(v)} />
            <Tooltip formatter={v => moneyAbbrevBR(v)} />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 20 }} />
            {tiposAuxilio.map((tipo, index) => (
              <Bar
                key={tipo}
                dataKey={tipo}
                stack="total" // <-- AQUI! Empilha as barras
                fill={COLORS[index % COLORS.length]}
                name={tipo}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};

export default Grafico8;