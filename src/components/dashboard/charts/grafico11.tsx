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

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  borderColor,
  children,
  loading,
  error,
  onRefresh,
}) => (
  <Card
    sx={{
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
    }}
  >
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 0,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography
            sx={{
              fontWeight: 600,
              color: '#4169E1',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '12px',
            }}
          >
            Gráfico 11 - Quantidade de fomentos concedidos pela FAPERJ por sexo e ano – 2019 a 2024
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              color: '#4169E1',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '12px',
            }}
          >
             (em número de concessões)
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <CircularProgress sx={{ color: 'white' }} />
        </Box>
      ) : (
        children
      )}
    </Box>
  </Card>
);

// Dados para o Gráfico 11
const anos = ['2019', '2020', '2021', '2022', '2023', '2024'];
const totalAnoF_Qtd = [4473, 4100, 4581, 7165, 7656, 8007];
const totalAnoM_Qtd = [3709, 3309, 3705, 5025, 5181, 5846];

// Combine os dados para o Recharts, com valores negativos para 'Feminino'
const data = anos.map((ano, index) => ({
  ano: ano,
  Feminino: -totalAnoF_Qtd[index],
  Masculino: totalAnoM_Qtd[index],
}));

// Paleta de cores do Gráfico 11
const PAIR_B = { F: '#F28E2B', M: '#2E7D32' };

const Grafico11 = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRefresh = () => {
    console.log('Dados do Gráfico 11 sendo recarregados...');
  };

  const chartTitle =
    'Gráfico 11 - Quantidade de fomentos concedidos pela FAPERJ por sexo e ano – 2019 a 2024 (em número de concessões)';

  return (
    <ChartCard
      title={chartTitle}
      borderColor={PAIR_B.F}
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
    >
      <Box sx={{ height: 300, width: 550 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ right: 30, left: 20 }}
          >
            {/* Grid vertical semelhante ao da FAPERJ */}
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />

            {/* Eixo X simétrico com valores absolutos */}
            <XAxis
              type="number"
              domain={['dataMin', 'dataMax']}
              tickFormatter={(value) => Math.abs(value).toLocaleString()}
              tick={{ fontSize: 12, fontFamily: 'Roboto' }}
            />

            {/* Ordem dos anos: 2019 em cima até 2024 embaixo */}
            <YAxis
              type="category"
              dataKey="ano"
              reversed
              tick={{ fontSize: 12, fontFamily: 'Roboto' }}
            />

            {/* Tooltip com valores absolutos */}
            <Tooltip
              formatter={(value: number, name: string) => [Math.abs(value), name]}
              labelFormatter={(label) => `Ano: ${label}`}
            />

            {/* Legenda no topo */}
            <Legend verticalAlign="top" wrapperStyle={{ paddingTop: 30 }} />

            {/* Feminino (esquerda, laranja) */}
            <Bar
              dataKey="Feminino"
              fill={PAIR_B.F}
              name="Feminino"
              barSize={30} // barra mais grossa
              radius={[0, 5, 5, 0]}
            />

            {/* Masculino (direita, verde) */}
            <Bar
              dataKey="Masculino"
              fill={PAIR_B.M}
              name="Masculino"
              barSize={30}
              radius={[0, 5, 5, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};

export default Grafico11;
