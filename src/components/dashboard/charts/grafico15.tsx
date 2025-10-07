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

// Dados para o Gráfico 15
const anos = ['2019', '2020', '2021', '2022', '2023', '2024'];
const projF = [266, 271, 1166, 857, 453, 732];
const projM = [447, 419, 1368, 866, 552, 758];

// Combine os dados para o Recharts
const data = anos.map((ano, index) => ({
  ano: ano,
  'Feminino (proj.)': projF[index],
  'Masculino (proj.)': projM[index],
}));

// Paleta de cores do Gráfico 15
const PAIR_A = { F: '#D81B60', M: '#1F78B4' };

const Grafico15 = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRefresh = () => {
    console.log('Dados do Gráfico 15 sendo recarregados...');
  };

  const chartTitle = "Quantidade de projetos contemplados pela FAPERJ por sexo e ano – 2019 a 2024 (em número de projetos)";
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
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="ano" tick={{ fontSize: 12, fontFamily: 'Roboto' }} />
            <YAxis
              tick={{ fontSize: 12, fontFamily: 'Roboto' }}
              label={{ value: 'Projetos', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={(value: number) => [value, 'Projetos']}
              labelFormatter={(label) => `Ano: ${label}`}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingTop: 20 }} />
            <Line
              type="monotone"
              dataKey="Feminino (proj.)"
              stroke={PAIR_A.F}
              strokeWidth={3}
              dot={{ stroke: PAIR_A.F, strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="Masculino (proj.)"
              stroke={PAIR_A.M}
              strokeWidth={3}
              dot={{ stroke: PAIR_A.M, strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};

export default Grafico15;