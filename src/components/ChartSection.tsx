import {
  Box,
  Container,
  Grid,
  Card,
  Typography,
  Divider,
  CircularProgress,
  IconButton,
  Alert,
  useTheme,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  PieChart, Pie, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';
import React, { useMemo } from 'react';
import type { TooltipProps } from 'recharts';

import {
  AreaDistributionData,
  MonthlyProjectsData,
  HighlightData,
} from '../data/mockData';
import {
  LoadingState,
  ErrorState,
} from '../hooks/useDashboardData';

// Interface para tipar as props do componente ChartCard
interface ChartCardProps {
  title: string;
  borderColor: string;
  children: React.ReactNode;
  loading: boolean;
  error: Error | null;
  onRefresh: () => void;
}

// Interface para tipar o tooltip do gráfico de pizza
interface CustomPieTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: any[];
}

// Interface para tipar as props que o ChartSection recebe
interface ChartSectionProps {
  areaDistribution: AreaDistributionData[] | null;
  monthlyProjects: MonthlyProjectsData[] | null;
  highlightData: HighlightData | null;
  loading: LoadingState;
  error: ErrorState;
  handleRefresh: (chartType: string) => void;
}

// Componente ChartCard (agora tipado)
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
    <Box sx={{ flex: 1 }} height={400}>
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

// Componente ChartSection
const ChartSection: React.FC<ChartSectionProps> = ({
  areaDistribution,
  monthlyProjects,
  highlightData,
  loading,
  error,
  handleRefresh,
}) => {
  const theme = useTheme();
  const COLORS = useMemo(() => ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'], []);

  const CustomPieTooltip: React.FC<CustomPieTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
          <p className="label">{`${data.name}`}</p>
          <p className="desc">{`${data.value} Projetos`}</p>
          <p className="invested">R$ 1.000.000 investidos</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Box sx={{ py: 8, backgroundColor: 'transparent', position: 'relative' }}>
      <Container maxWidth="xl" sx={{ backgroundColor: 'transparent' }}>
        <Grid container spacing={2}
          justifyContent="center"
          alignItems="stretch"
          sx={{ backgroundColor: 'transparent',
            flexWrap: 'wrap' }}>

          <Grid item xs={12} md={6} sx={{ backgroundColor: 'transparent', width: '33.333%'}}>
            <ChartCard
              title="Distribuição por Área"
              borderColor={theme.palette.primary.main}
              loading={loading.area}
              error={error.area}
              onRefresh={() => handleRefresh('area')}
            >
              <Box sx={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={areaDistribution || []}
                      cx="50%"
                      cy="50%"
                      outerRadius={130}
                      innerRadius={90}
                      dataKey="value"
                      isAnimationActive={false}
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={1}
                    >
                      {areaDistribution?.map((entry, index) => (
                        <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>

                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      fill="#333"
                      fontWeight="bold"
                    >
                      <tspan
                        x="35%"
                        dy="-4"
                        fontSize={24}
                        fill="#4169E1"
                      >
                        {areaDistribution?.reduce((sum, item) => sum + item.value, 0) || 0}
                      </tspan>
                      <tspan
                        x="35%"
                        dy="1.5em"
                        fontSize={12}
                      >
                        PROJETOS
                      </tspan>
                    </text>

                    <Tooltip content={<CustomPieTooltip />} />
                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </ChartCard>
          </Grid>

          <Grid item xs={12} md={6} sx={{ backgroundColor: 'transparent'}}>
            <ChartCard
              title={`${highlightData?.area || 'Área'} - Destaque`}
              borderColor={theme.palette.warning.main}
              loading={loading.highlight}
              error={error.highlight}
              onRefresh={() => handleRefresh('highlight')}
            >
              <Box sx={{ mb: 2, textAlign: 'center' }}>
                <Typography variant="h6" color="black">
                  {highlightData?.description || 'Carregando...'}
                </Typography>
              </Box>
              <Box sx={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                  <BarChart
                    data={monthlyProjects || []}
                    margin={{ top: 20, right: 10, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      tick={{ fontSize: 12, fill: 'white' }}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: 'white' }}
                      label={{ value: 'Projetos Ativos', angle: -90, position: 'insideLeft', fill: 'white' }}
                    />
                    <Tooltip
                      formatter={(value, name) => [`${name}: ${value} projetos`]}
                      contentStyle={{
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        border: 'none',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="projetosAtivos"
                      fill="#00C49F"
                      radius={[4, 4, 0, 0]}
                      name="Projetos Ativos"
                    />
                    <Bar
                      dataKey="projetosInativos"
                      fill="#004d80"
                      radius={[4, 4, 0, 0]}
                      name="Projetos Inativos"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </ChartCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ChartSection;