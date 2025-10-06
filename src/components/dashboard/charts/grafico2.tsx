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
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  // Certifique-se de que 'Legend' NÃO esteja nesta lista de importações
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
    height: 490, // Altura padronizada
  }}>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0 }}>
        {/* O título está ajustado para o padrão do Gráfico 3 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography
            sx={{
              fontWeight: 600,
              color: '#124b6c',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px', // Tamanho de fonte aumentado
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
    <Box sx={{ flex: 1, height: 440, width: '100%' }}>
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

// Dados para o Gráfico 2
const microAreas = [
  'Ciências Agrárias', 'Ciências Biológicas', 'Ciências da Saúde',
  'Ciências Exatas e da Terra', 'Ciências Humanas',
  'Ciências Sociais Aplicadas', 'Engenharias',
  'Linguística, Letras e Artes', 'Não Definido'
];

const investMicro = [
  171065011, 695867342, 287295761, 387647302, 291647447, 127091748,
  336550269, 58884325, 151232936
];

// Paleta de cores para o gráfico de pizza
const COLORS = ['#f14b61', '#f6b343', '#2cb66d', '#5eb3e6', '#2aa5c9', '#9b7bd4', '#ef8636', '#5fb0a9', '#C86E43'];

// Combine os dados em um array de objetos para Recharts
const data = microAreas.map((area, index) => ({
  name: area,
  value: investMicro[index],
}));

// Função de formatação para os rótulos de cada fatia
const renderCustomizedLabel = ({ name, value }) => { // Removi 'percent' dos parâmetros pois não é usado aqui
  return `${name} R$ ${(value / 1_000_000).toFixed(1)} mi`;
};

const Grafico2 = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRefresh = () => {
    console.log('Dados do Gráfico 2 sendo recarregados...');
  };

  const chartTitle = "Gráfico 2 - Distribuição do valor total investido pela FAPERJ por microáreas do conhecimento – 2019 a 2024 (em milhões de reais)";

  return (
    <ChartCard
      title={chartTitle}
      borderColor="#ef8636"
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
    >
      <Box sx={{ height: 440, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              formatter={(value, name, props) => [
                moneyAbbrevBR(value),
                props.payload.name
              ]}
              labelFormatter={(label) => `Área: ${label}`}
            />
            {/* AQUI: O componente Legend foi removido para evitar a legenda inferior */}
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={150}
              paddingAngle={2}
              fill="#8884d8"
              label={renderCustomizedLabel}
              labelLine={true}
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};

export default Grafico2;