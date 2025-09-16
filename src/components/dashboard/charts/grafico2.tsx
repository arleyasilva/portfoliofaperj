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
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import React, { useState } from 'react';

// Interfaces
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
  }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, color: '#4169E1' }}>
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
    <Box sx={{ flex: 1 }} height={400} width={600}>
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

// Definindo a estrutura dos dados
interface ChartData {
  name: string;
  value: number;
}

// Dados de exemplo, baseados na imagem
const data: ChartData[] = [
  { name: 'Ciências Agrárias', value: 90.3 },
  { name: 'Ciências Biológicas', value: 421.1 },
  { name: 'Ciências da Saúde', value: 183 },
  { name: 'Ciências Exatas e da Terra', value: 216.8 },
  { name: 'Ciências Humanas', value: 96.8 },
  { name: 'Ciências Sociais', value: 55.4 },
  { name: 'Engenharias', value: 220.5 },
  { name: 'Linguística, Letras e Artes', value: 13 },
  { name: 'Não Definido', value: 88 },
];

// Paleta de cores para cada fatia do gráfico
const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF197C', '#19B5FF', '#A93226', '#E74C3C',
];

// Função para renderizar os rótulos
const renderCustomizedLabel = ({ name, percent, outerRadius, x, y, cx, cy }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 20; // Posição do rótulo
  const midAngle = Math.atan2(y - cy, x - cx);
  const textX = cx + radius * Math.cos(midAngle);
  const textY = cy + radius * Math.sin(midAngle);

  return (
    <text
      x={textX}
      y={textY}
      fill="black"
      textAnchor={textX > cx ? 'start' : 'end'}
      dominantBaseline="middle"
      fontSize={12}
    >
      {`${name} ${Math.round(percent * 100)}%`}
    </text>
  );
};

const Grafico2 = (): JSX.Element => {
  // Dados de estado de exemplo para usar no ChartCard
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const handleRefresh = () => {
    // Lógica para recarregar os dados do gráfico
    console.log('Dados do Gráfico 2 sendo recarregados...');
  };
  
  return (
    <ChartCard
      title="Gráfico 2 — Total investido por micro-áreas"
      borderColor="#FFBB28"
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
    >
      <Box sx={{ height: 400, width: 620 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={90} // <-- AQUI! Aumentei o raio interno para 80px
              outerRadius={130} // <-- E AQUI! Aumentei o raio externo para 150px
              paddingAngle={1}
              labelLine={true} 
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [`R$ ${value.toLocaleString('pt-BR')} mi`, 'Total Investido']}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};

export default Grafico2;