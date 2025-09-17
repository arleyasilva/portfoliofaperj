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
              fontSize: '12px'
            }}
          >
            Gráfico 4 - Quantidade de bolsas e auxílios concedidos pela FAPERJ por Centros
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              color: '#4169E1',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '12px'
            }}
          >
             de pesquisa e outras instituções
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
    <Box sx={{ flex: 1, height: 300, width: 560 }}>
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

// Dados para o Gráfico 4
const centrosPesquisaTop = [
  'FIOCRUZ', 'FAPERJ', 'IECPN', 'CBPF', 'FAETEC', 'IMPA', 'INCA', 'PESAGRO', 'INMETRO', 'EMBRAPA'
];
const instBolsasCentrosTop = [
  69440987, 52409595, 378475, 13048823, 19138017, 9370930, 4802850, 17045700, 5026640, 5898660
];
const instAuxiliosCentrosTop = [
  80176690, 677769, 27190613, 23998716, 11245348, 9959292, 12785088, 137322, 11646782, 8819543
];

// Combine os dados para o Recharts
const data4 = centrosPesquisaTop.map((centro, index) => ({
  centro: centro,
  'Bolsas': instBolsasCentrosTop[index] / 1_000_000,
  'Auxílios': instAuxiliosCentrosTop[index] / 1_000_000,
}));

const Grafico4 = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRefresh = () => {
    console.log('Dados do Gráfico 4 sendo recarregados...');
  };

  const chartTitle = "Gráfico 4 - Quantidade de bolsas e auxílios concedidos pela FAPERJ por Centros de pesquisa e outras instituções – 2019 a 2024 (em número de concessões)";

  return (
    <ChartCard
      title={chartTitle}
      borderColor="#0c6d83"
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
    >
      <Box sx={{ height: 300, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data4} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="centro"
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
              labelFormatter={(label) => `Centro: ${label}`}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 20 }} />
            <Bar
              dataKey="Bolsas"
              fill="#0e8aa7"
              name="Bolsas (R$)"
              barSize={15}
              radius={[5, 5, 0, 0]}
            />
            <Bar
              dataKey="Auxílios"
              fill="#0c6d83"
              name="Auxílios (R$)"
              barSize={15}
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};

export default Grafico4;