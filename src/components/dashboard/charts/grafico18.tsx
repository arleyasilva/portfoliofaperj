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
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
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
            {title}
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
    <Box sx={{ flex: 1, height: 300, width: '100%', position: 'relative' }}>
      {error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          Falha ao carregar dados: {error.message}
        </Alert>
      ) : loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress sx={{ color: 'white' }} />
        </Box>
      ) : children}
      <Typography
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          fontSize: '10px',
          fontStyle: 'italic',
          color: '#6c7c82'
        }}
      >
        Fonte: Sistema de Bolsas e Auxílios - SBA / Faperj [2019 - 2024]
      </Typography>
    </Box>
  </Card>
);

// Dados fictícios para o Gráfico 18, baseados na imagem
const data = [
  { name: 'BAIXADA LITORÂNEA', Qtd: 50, 'Valor (R$)': 15000000, size: 500 },
  { name: 'CENTRO-SUL', Qtd: 20, 'Valor (R$)': 2000000, size: 300 },
  { name: 'NOROESTE', Qtd: 80, 'Valor (R$)': 10000000, size: 600 },
  { name: 'MÉDIO PARAÍBA', Qtd: 120, 'Valor (R$)': 20000000, size: 700 },
  { name: 'METRO 2', Qtd: 800, 'Valor (R$)': 120000000, size: 1000 },
  { name: 'NORTE', Qtd: 600, 'Valor (R$)': 80000000, size: 800 },
  { name: 'SERRANA', Qtd: 90, 'Valor (R$)': 12000000, size: 550 },
  { name: 'METRO 1', Qtd: 5000, 'Valor (R$)': 1000000000, size: 1500 },
];

const renderCustomizedLabel = ({ x, y, name }) => (
  <text x={x} y={y - 10} textAnchor="middle" fill="black" fontSize={10}>
    {name}
  </text>
);

const Grafico18 = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRefresh = () => {
    console.log('Dados do Gráfico 18 sendo recarregados...');
  };

  const chartTitle = "Gráfico 18 - Dispersão/Bolsas (QTD x Valor, eixos em log)";

  const formatYAxisTick = (value) => {
    if (value >= 1_000_000_000) {
      return `R$ ${value / 1_000_000_000} bi`;
    }
    if (value >= 1_000_000) {
      return `R$ ${value / 1_000_000} mi`;
    }
    return `R$ ${value}`;
  };

  return (
    <ChartCard
      title={chartTitle}
      borderColor="#FF6347"
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
    >
      <Box sx={{ height: 300, width: 1150, position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="Qtd"
              name="Quantidade"
              scale="log"
              domain={[10, 10000]}
              allowDataOverflow={true}
              tick={{ fontSize: 12, fontFamily: 'Roboto' }}
              label={{ value: '', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              type="number"
              dataKey="Valor (R$)"
              name="Valor (R$)"
              scale="log"
              tickFormatter={formatYAxisTick}
              domain={[1000000, 10000000000]}
              allowDataOverflow={true}
              tick={{ fontSize: 12, fontFamily: 'Roboto' }}
              label={{ value: 'Valor (R$)', angle: -90, position: 'insideLeft', offset: -15 }}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value, name) => [value, name]}
            />
            <Scatter
              name="Bolsas"
              data={data}
              fill="#FF6347"
            >
              <LabelList dataKey="name" content={renderCustomizedLabel} />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};

export default Grafico18;