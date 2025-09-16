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
const areas = [
  'Ciências Agrárias', 'Ciências Biológicas', 'Ciências da Saúde', 'Ciências Exatas e da Terra',
  'Ciências Humanas', 'Ciências Sociais Aplicadas', 'Engenharias', 'Linguística, Letras e Artes', 'Não Definido'
];
const valorPorArea = [
  90277163, 421101543, 182994777, 216823286, 96839834, 55435059, 220490639, 13042147, 88018897
];
const qtdPorArea = [
  502, 1625, 768, 1218, 1184, 620, 825, 266, 454
];

const data = areas.map((area, i) => ({
  name: area,
  valor: valorPorArea[i],
  quantidade: qtdPorArea[i],
}));

const Grafico6 = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const handleRefresh = () => { console.log('Dados do Gráfico 6 sendo recarregados...'); };

  return (
    <ChartCard
      title="Gráfico 6 — Valor investido por área e quantidade"
      borderColor="#0e8aa7"
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
    >
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              interval={0}
              angle={-25}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              yAxisId="left"
              label={{ value: 'Valor (R$)', angle: -90, position: 'insideLeft' }}
              tickFormatter={v => moneyAbbrevBR(v)}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: 'Quantidade', angle: 90, position: 'insideRight' }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === 'Valor (R$)') {
                  return moneyAbbrevBR(value);
                }
                return value;
              }}
              labelFormatter={(label) => `Área: ${label}`}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 20 }} />
            <Bar yAxisId="left" dataKey="valor" fill="#0e8aa7" name="Valor (R$)" barSize={20} />
            <Line yAxisId="right" type="monotone" dataKey="quantidade" stroke="#ef8636" name="Quantidade" />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};

export default Grafico6;