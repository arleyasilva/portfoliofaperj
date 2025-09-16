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

// Dados de exemplo, baseados em indicadores-sexo.html
// Valores totais calculados manualmente para este exemplo
const totalF = 26334118 + 46955062 + 163709195 + 115074182 + 55546766 + 74570105 + 62517849 + 65865655 + 70653340 + 118236993 + 135446362 + 143022069;
const totalM = 61070382 + 108217147 + 299781576 + 155015937 + 102502629 + 132749173 + 62131089 + 62068028 + 65599530 + 100616212 + 114743520 + 118349722;
const totalG = totalF + totalM;

const data = [
  { name: 'Feminino', value: totalF },
  { name: 'Masculino', value: totalM }
];

const PAIR_A = { F: '#D81B60', M: '#1F78B4' };
const COLORS = [PAIR_A.F, PAIR_A.M];

// Rótulos personalizados para os retângulos
const CustomizedTreemapContent: React.FC<any> = (props) => {
  const { x, y, width, height, name, value, colors, index } = props;
  const fontSize = 12;

  if (width < 30 || height < 30) {
    return null;
  }

  const percentage = (value / totalG * 100).toFixed(1);

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: colors[index],
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
          <span style={{ fontSize: `${fontSize * 0.9}px`, lineHeight: '1.2' }}>
            ({percentage}%)
          </span>
        </div>
      </foreignObject>
    </g>
  );
};

const Grafico10 = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const handleRefresh = () => { console.log('Dados do Gráfico 10 sendo recarregados...'); };

  return (
    <ChartCard
      title="Gráfico 10 — Total R$ fomentos por sexo"
      borderColor={COLORS[0]}
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

export default Grafico10;