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
  Line,
} from 'recharts';
import React, { useState } from 'react';

// Componente ChartCard corrigido, declarado fora de Grafico1.
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
        <Typography
          sx={{
            fontWeight: 600,
            color: '#4169E1',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '10px'
          }}
        >
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
    </Box>
    <Box sx={{ flex: 1, height: 400, width: '100%' }}>
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

// Definindo a estrutura dos dados do gráfico com tipagem (TypeScript)
interface ChartData {
  ano: string;
  total: number;
  totalLine: number;
}

// Novos dados para o gráfico
const rawData = [
  { ano: '2019', total: 212.8 },
  { ano: '2020', total: 285.2 },
  { ano: '2021', total: 614.3 },
  { ano: '2022', total: 495.2 },
  { ano: '2023', total: 422 },
  { ano: '2024', total: 477.8 },
];

// Ajustando a linha para ficar acima das barras
const data = rawData.map(item => ({
  ...item,
  totalLine: item.total + (item.total * 0.1),
}));

const Grafico1 = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const handleRefresh = () => {
    console.log('Dados do Gráfico 1 sendo recarregados...');
  };

  const chartTitle = "Gráfico 1 - Valor total investido pela FAPERJ por ano – 2019 a 2024 (em milhões de reais)";

  return (
    <ChartCard
      title={chartTitle}
      borderColor="#1e88e5"
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
    >
      <Box sx={{ height: 300, width: 500 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="ano" tick={{ fontSize: 10, fontFamily: 'Roboto' }} />
            <YAxis
              tickFormatter={(value) => `R$ ${value} mi`}
              domain={[0, 800]}
              tick={{ fontSize: 10, fontFamily: 'Roboto' }}
            />
            <Tooltip
              formatter={(value: number, name: string) => [`R$ ${value.toLocaleString('pt-BR')} mi`, name]}
              labelFormatter={(label) => `Ano: ${label}`}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 20 }} />
            <Bar
              dataKey="total"
              fill="#1e88e5"
              name="Total Investido"
              barSize={30}
              label={false}
              radius={[5, 5, 0, 0]}
            />
            
            <Line
              type="monotone"
              dataKey="totalLine"
              stroke="#861539"
              strokeWidth={3}
              dot={{ stroke: '#861539', strokeWidth: 2 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};

export default Grafico1;