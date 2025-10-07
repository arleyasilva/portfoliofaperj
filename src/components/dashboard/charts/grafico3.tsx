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
    height: 400, // Altura padronizada
    width: 550, // Largura padronizada
  }}>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography
            sx={{
              fontWeight: 600,
              color: '#124b6c',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px'
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
      justifyContent: 'flex-start', // Alinhamento à esquerda
      p: 2, // Padding para afastar da borda
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
        Fonte: Sistema de Bolsas e Auxílios - SBA / Faperj [2019 - 2024]
      </Typography>
    </Box>
  </Card>
);

// Dados para o Gráfico 3
const universidades = [
  'UFRJ', 'UERJ', 'UFF', 'PUC-RIO', 'UENF', 'UFRRJ', 'UNIRIO', 'IFF', 'IFRJ', 'FGV'
];
const instBolsasUni = [
  349824168, 190464863, 116551414, 53487449, 56432021, 27774147, 17010884, 6297125, 4716614, 5390870
];
const instAuxiliosUni = [
  529726854, 187581821, 141884461, 66855056, 45214120, 35356084, 22157177, 6805941, 4338132, 1805154
];

// Combine os dados para o Recharts
const data3 = universidades.map((uni, index) => ({
  universidade: uni,
  'Bolsas': instBolsasUni[index] / 1_000_000,
  'Auxílios': instAuxiliosUni[index] / 1_000_000,
}));

const Grafico3 = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRefresh = () => {
    console.log('Dados do Gráfico 3 sendo recarregados...');
  };

  const chartTitle = "Quantidade de bolsas e auxílios concedidos pela FAPERJ por Universidades – 2019 a 2024 (em número de concessões)";

  return (
    <ChartCard
      title={chartTitle}
      borderColor="#124b6c" // Borda padronizada
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data3} margin={{ top: 12, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="universidade"
            tick={{ fontSize: 10, fontFamily: 'Roboto' }}
            angle={-25}
            textAnchor="end"
            height={50}
            interval={0}
          />
          <YAxis
            tickFormatter={(value) => `${value.toLocaleString('pt-BR')} mi`}
            tick={{ fontSize: 12, fontFamily: 'Roboto' }}
          />
          <Tooltip
            formatter={(value: number, name: string) => [`R$ ${value.toLocaleString('pt-BR')} mi`, name]}
            labelFormatter={(label) => `Universidade: ${label}`}
          />
          <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 20 }} />
          <Bar
            dataKey="Bolsas"
            fill="#2AA5C9" // Cor padronizada
            name="Bolsas (R$)"
            barSize={15}
            radius={[5, 5, 0, 0]}
          />
          <Bar
            dataKey="Auxílios"
            fill="#124b6c" // Cor padronizada
            name="Auxílios (R$)"
            barSize={15}
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default Grafico3;