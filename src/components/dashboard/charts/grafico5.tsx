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
        {/* Título dividido em duas linhas */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography
            sx={{
              fontWeight: 600,
              color: '#4169E1',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '10px'
            }}
          >
            Gráfico 5 - Quantidade de projetos contemplados pela FAPERJ por ano – 2019 a 2024 em (número
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              color: '#4169E1',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '10px'
            }}
          >
             de projetos)
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
    <Box sx={{ flex: 1, height: 300, width: 500 }}>
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

// Dados para o Gráfico 5
const anos = ['2019', '2020', '2021', '2022', '2023', '2024'];
const projetosPorAno = [717, 711, 2565, 1763, 1093, 1543];

// Combine os dados para o Recharts
const data5 = anos.map((ano, index) => ({
  ano: ano,
  projetos: projetosPorAno[index],
}));

const Grafico5 = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRefresh = () => {
    console.log('Dados do Gráfico 5 sendo recarregados...');
  };

  const chartTitle = "Gráfico 5 - Quantidade de projetos contemplados pela FAPERJ por ano – 2019 a 2024 (em número de projetos)";

  return (
    <ChartCard
      title={chartTitle}
      borderColor="#f6b343"
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
    >
      <Box sx={{ height: 300, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data5} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="ano" tick={{ fontSize: 10, fontFamily: 'Roboto' }} />
            <YAxis
              label={{ value: 'Projetos', angle: -90, position: 'insideLeft', fill: '#000' }}
              tick={{ fontSize: 10, fontFamily: 'Roboto' }}
            />
            <Tooltip
              formatter={(value: number) => [value, 'Projetos']}
              labelFormatter={(label) => `Ano: ${label}`}
            />
            <Bar
              dataKey="projetos"
              fill="#f6b343"
              barSize={28}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};

export default Grafico5;