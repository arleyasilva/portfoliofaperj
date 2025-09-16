// src/components/dashboard/charts/grafico5.tsx
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
  ResponsiveContainer,
  Treemap,
  Tooltip,
} from 'recharts';
import React, { useState } from 'react';

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

const microAreas = [
  'Ciências Agrárias', 'Ciências Biológicas', 'Ciências da Saúde', 'Ciências Exatas e da Terra',
  'Ciências Humanas', 'Ciências Sociais Aplicadas', 'Engenharias', 'Linguística, Letras e Artes', 'Não Definido'
];
const investMicro = [
  90277163, 421101543, 182994777, 216823286, 96839834, 55435059, 220490639, 13042147, 88018897
];

const data = microAreas.map((area, i) => ({
  name: area,
  value: investMicro[i],
}));

const CustomizedTreemapContent: React.FC<any> = (props) => {
  const { x, y, width, height, name, value, colors, index } = props;
  const fontSize = 12;

  if (width < 30 || height < 30) {
    return null;
  }

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: colors[index % colors.length],
          stroke: '#fff',
          strokeWidth: 2,
        }}
      />
      <foreignObject x={x} y={y} width={width} height={height}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          color: '#fff',
          textAlign: 'center',
          padding: '5px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          <span style={{ fontSize: `${fontSize}px`, fontWeight: 'bold', lineHeight: '1.2' }}>
            {name}
          </span>
          <span style={{ fontSize: `${fontSize * 0.9}px`, lineHeight: '1.2' }}>
            {moneyAbbrevBR(value)}
          </span>
        </div>
      </foreignObject>
    </g>
  );
};

const Grafico5 = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const handleRefresh = () => { console.log('Dados do Gráfico 5 sendo recarregados...'); };

  const COLORS = [
    '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4',
    '#ea7ccc', '#58d9f9', '#05c091', '#ff8a45', '#8d48e3', '#dd79ff', '#ffc53a', '#c34e7f'
  ];

  return (
    <ChartCard
      title="Gráfico 5 — Investimento Global por micro-áreas (Treemap)"
      borderColor="#5EB3E6"
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
    >
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer>
          <Treemap
            data={data}
            dataKey="value"
            nameKey="name"
            isAnimationActive={false}
            content={<CustomizedTreemapContent colors={COLORS} />}
          >
            <Tooltip
              formatter={(value, name) => [moneyAbbrevBR(value as number), name]}
              wrapperStyle={{ border: '1px solid #ccc' }}
            />
          </Treemap>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};

export default Grafico5;