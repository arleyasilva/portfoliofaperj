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
  Treemap,
  ResponsiveContainer,
  Tooltip,
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

// Dados do Gráfico 10
const auxF = [26334118, 46955062, 163709195, 115074182, 55546766, 74570105];
const valBolF = [62517849, 65865655, 70653340, 118236993, 135446362, 143022069];
const auxM = [61070382, 108217147, 299781576, 155015937, 102502629, 132749173];
const valBolM = [62131089, 62068028, 65599530, 100616212, 114743520, 118349722];

// Cálculos dos totais
const totalF = auxF.reduce((a, b) => a + (b || 0), 0) + valBolF.reduce((a, b) => a + (b || 0), 0);
const totalM = auxM.reduce((a, b) => a + (b || 0), 0) + valBolM.reduce((a, b) => a + (b || 0), 0);

// Paleta de cores do Gráfico 10
const PAIR_A = { F: '#D81B60', M: '#1F78B4' };
const COLORS = [PAIR_A.F, PAIR_A.M];

// Estrutura de dados hierárquica para o Treemap
const data = [
  {
    name: 'Total Fomento',
    children: [
      { name: 'Feminino', value: totalF, fill: PAIR_A.F },
      { name: 'Masculino', value: totalM, fill: PAIR_A.M },
    ],
  },
];

// Rótulo personalizado para os retângulos
const CustomizedTreemapContent = (props) => {
  const { x, y, width, height, value, name, colors, index } = props;
  const fontSize = 12;

  if (width < 30 || height < 30) {
    return null;
  }

  const percentage = (value / (totalF + totalM) * 100).toFixed(1);

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
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#fff',
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

// Função para formatar os valores
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

const Grafico10 = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const handleRefresh = () => { console.log('Dados do Gráfico 10 sendo recarregados...'); };
  const chartTitle = "Gráfico 10 - Distribuição do valor total de fomento da FAPERJ por sexo – 2019 a 2024 (em milhões de reais)";
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
          <Treemap
            data={data}
            dataKey="value"
            nameKey="name"
            aspectRatio={4 / 3}
            stroke="#fff"
            fill="#8884d8"
            content={<CustomizedTreemapContent colors={COLORS} />}
            isAnimationActive={false}
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