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
  sourceText: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, borderColor, children, loading, error, onRefresh, sourceText }) => (
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
    height: 400, // Altura padronizada
    width: 550, // Largura padronizada
  }}>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography
            sx={{
              fontWeight: 600,
              color: '#124b6c', // Cor do título padronizada
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px', // Tamanho de fonte padronizado
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
            color: 'white',
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
    {/* Fonte dos dados */}
    <Box sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      p: 2,
      pt: 0,
    }}>
      <Typography
        variant="caption"
        sx={{
          fontFamily: 'Roboto, sans-serif',
          color: 'rgba(0, 0, 0, 0.6)',
          fontStyle: 'italic',
        }}
      >
        {sourceText}
      </Typography>
    </Box>
  </Card>
);

// Dados para o Gráfico 8
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

// Combine os dados para o Recharts
const data = anos.map((ano, index) => {
  const row = { ano: ano };
  tiposAuxilio.forEach((tipo, tipoIndex) => {
    row[tipo] = auxiliosTiposPorAno[tipoIndex][index] / 1_000_000;
  });
  return row;
});

// Paleta de cores para os tipos de auxílio
const COLORS = ['#2E7D32', '#9b7bd4', '#f6b343', '#ef8636', '#5eb3e6', '#2aa5c9'];

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

const Grafico8 = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRefresh = () => {
    console.log('Dados do Gráfico 8 sendo recarregados...');
  };

  const chartTitle = "Gráfico 8 - Valor total investido em auxílios pela FAPERJ por tipo de auxílio – 2019 a 2024 (em milhões de reais)";
  const sourceText = "Fonte: Sistema de Bolsas e Auxílios - SBA / Faperj [2019 - 2024]";

  return (
    <ChartCard
      title={chartTitle}
      borderColor="#124b6c" // Borda padronizada
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
      sourceText={sourceText}
    >
      <Box sx={{ height: 300, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="ano" tick={{ fontSize: 12, fontFamily: 'Roboto' }} />
            <YAxis
              tickFormatter={(value) => `R$ ${value} mi`}
              tick={{ fontSize: 12, fontFamily: 'Roboto' }}
            />
            <Tooltip
              formatter={(value: number, name: string) => [moneyAbbrevBR(value * 1_000_000), name]}
              labelFormatter={(label) => `Ano: ${label}`}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingTop: 20 }} />
            {tiposAuxilio.map((tipo, index) => (
              <Bar
                key={tipo}
                dataKey={tipo}
                stackId="a"
                fill={COLORS[index % COLORS.length]}
                name={tipo}
                barSize={20}
                radius={[5, 5, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};

export default Grafico8;