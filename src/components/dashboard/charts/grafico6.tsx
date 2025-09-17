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
  ComposedChart,
  Bar,
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
            Gráfico 6 - Valor total investido e quantidade de projetos da FAPERJ por área do conhecimento – 2019 a 2024
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              color: '#4169E1',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '10px'
            }}
          >
           
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

// Dados para o Gráfico 6
const areas = [
  'Ciências Agrárias', 'Ciências Biológicas', 'Ciências da Saúde',
  'Ciências Exatas e da Terra', 'Ciências Humanas',
  'Ciências Sociais Aplicadas', 'Engenharias',
  'Linguística, Letras e Artes', 'Não Definido'
];
const valorPorArea = [
  90277163, 421101543, 182994777, 216823286, 96839834, 55435059,
  220490639, 13042147, 88018897
];
const qtdPorArea = [
  502, 1625, 768, 1218, 1184, 620, 825, 266, 454
];

// Combine os dados para o Recharts
const data6 = areas.map((area, index) => ({
  area: area,
  'Valor (R$)': valorPorArea[index] / 1_000_000,
  'Quantidade': qtdPorArea[index],
}));

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

const Grafico6 = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRefresh = () => {
    console.log('Dados do Gráfico 6 sendo recarregados...');
  };

  const chartTitle = "Gráfico 6 - Valor total investido e quantidade de projetos da FAPERJ por área do conhecimento – 2019 a 2024 (em milhões de reais e número de projetos)";

  return (
    <ChartCard
      title={chartTitle}
      borderColor="#ef8636"
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
    >
      <Box sx={{ height: 300, width: 600 }}>
        <ResponsiveContainer width="100%" height="110%">
          <ComposedChart data={data6} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="area"
              tick={{ fontSize: 12, fontFamily: 'Roboto' }}
              angle={-18}
              textAnchor="end"
              height={50}
              interval={0}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickFormatter={(value) => `R$ ${value} mi`}
              tick={{ fontSize: 12, fontFamily: 'Roboto' }}
              label={{ value: 'Valor (R$)', angle: -90, position: 'insideLeft' }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12, fontFamily: 'Roboto' }}
              label={{ value: 'Quantidade', angle: 90, position: 'insideRight' }}
            />
            <Tooltip
              formatter={(value, name) => {
                if (name === 'Valor (R$)') {
                  return moneyAbbrevBR(value * 1_000_000);
                }
                return value;
              }}
              labelFormatter={(label) => `Área: ${label}`}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 20 }} />
            <Bar
              yAxisId="left"
              dataKey="Valor (R$)"
              fill="#0e8aa7"
              barSize={20}
              radius={[5, 5, 0, 0]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Quantidade"
              stroke="#ef8636"
              strokeWidth={3}
              dot={{ stroke: '#ef8636', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};

export default Grafico6;