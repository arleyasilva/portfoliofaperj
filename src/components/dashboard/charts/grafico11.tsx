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

const m = (n: number) => new Intl.NumberFormat('pt-BR').format(Math.abs(n));

// Dados de exemplo, baseados em indicadores-sexo.html
const anos = ['2019', '2020', '2021', '2022', '2023', '2024'];
const totalAnoF_Qtd = [266, 271, 1166, 857, 453, 732];
const totalAnoM_Qtd = [447, 419, 1368, 866, 552, 758];

// Reestruturando os dados para o formato esperado pelo Recharts
const data = anos.map((ano, i) => ({
  name: ano,
  Feminino: -totalAnoF_Qtd[i], // Valores negativos para o lado esquerdo
  Masculino: totalAnoM_Qtd[i],
}));

const PAIR_B = { F: '#F28E2B', M: '#2E7D32' };

const Grafico11 = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const handleRefresh = () => { console.log('Dados do Gráfico 11 sendo recarregados...'); };

  return (
    <ChartCard
      title="Gráfico 11 — Quantidade fomentos por ano"
      borderColor={PAIR_B.M}
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
    >
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            layout="vertical" // <-- Torna o gráfico um tornado
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              tickFormatter={v => m(v as number)} // <-- Formata para valor absoluto
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={v => m(v as number)} // <-- Formata para valor absoluto no tooltip
            />
            <Legend verticalAlign="top" />
            <Bar dataKey="Masculino" fill={PAIR_B.M} stack="q" barSize={18} />
            <Bar dataKey="Feminino" fill={PAIR_B.F} stack="q" barSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};

export default Grafico11;