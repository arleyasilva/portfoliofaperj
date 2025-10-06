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

// Dados para o Gráfico 7
const anos = ['2019', '2020', '2021', '2022', '2023', '2024'];
const auxiliosPorAnoValor = [87912777, 156992731, 477829365, 275908869, 171084308, 215295293];

// Combine os dados para o Recharts
const data = anos.map((ano, index) => ({
  ano: ano,
  'Valor (R$)': auxiliosPorAnoValor[index] / 1_000_000,
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

const Grafico7 = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRefresh = () => {
    console.log('Dados do Gráfico 7 sendo recarregados...');
  };

  const chartTitle = "Gráfico 7 - Evolução do valor total investido em auxílios pela FAPERJ por ano – 2019 a 2024 (em milhões de reais)";
  const sourceText = "Fonte: Sistema de Bolsas e Auxílios - SBA / Faperj [2019 - 2024]";

  return (
    <ChartCard
      title={chartTitle}
      borderColor="#124b6c" // Borda padronizada para azul escuro
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
              tickFormatter={(value) => `R$ ${value} mi`}
              tick={{ fontSize: 12, fontFamily: 'Roboto' }}
            />
            <Tooltip
              formatter={(value: number) => [
                moneyAbbrevBR(value * 1_000_000),
                'Valor (R$)'
              ]}
              labelFormatter={(label) => `Ano: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="Valor (R$)"
              stroke="#C86E43" // Cor original da linha mantida
              strokeWidth={3}
              dot={{ stroke: '#C86E43', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};

export default Grafico7;