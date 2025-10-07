import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
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

// Componente ChartCard (o mesmo que já está no seu projeto)
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
    height: 600,
    width: 1200,
  }}>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography
            sx={{
              fontWeight: 600,
              color: '#124b6c',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px',
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
    <Box sx={{ flex: 1, height: 500, width: '100%' }}>
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

// Dados do Gráfico 18: Regionalização por ano e valor
const rawData = {
  years: ['2019', '2020', '2021', '2022', '2023', '2024'],
  regions: [
    { name: 'Metropolitana 1', values: [62131089, 62068028, 65599530, 100616212, 114743520, 118349722] },
    { name: 'Metropolitana 2', values: [125550212, 170285175, 365381106, 255622149, 217245749, 251198895] },
    { name: 'Norte', values: [88725838, 108217147, 299781576, 155015937, 102502629, 132749173] },
    { name: 'Serrana', values: [20117366, 2701605, 4942019, 3818953, 13980417, 3492649] },
    { name: 'Médio Paraíba', values: [22896502, 3474682, 686211, 3801536, 1017396, 2035329] },
    { name: 'Baixada Litorânea', values: [24707663, 163000, 760610, 6349807, 4610114, 2701605] },
    { name: 'Centro-Sul', values: [15303649, 11359591, 10104778, 40282991, 35089728, 42274226] },
  ],
};

const getOption = (data: typeof rawData) => {
  const years = data.years;
  const regions = data.regions.map(r => r.name);

  const seriesData = regions.map(regionName => {
    const region = data.regions.find(r => r.name === regionName);
    return {
      name: regionName,
      type: 'line',
      symbolSize: 10,
      data: region.values,
      tooltip: {
        valueFormatter: (value: number) => `R$ ${value.toLocaleString('pt-BR')} mi`
      },
    };
  });

  return {
    baseOption: {
      timeline: {
        axisType: 'category',
        autoPlay: true,
        playInterval: 2000,
        data: years,
        label: {
          formatter: '{value}',
        },
        bottom: 10,
      },
      legend: {
        data: regions,
        top: 'top',
        orient: 'horizontal',
        textStyle: {
          color: 'black'
        }
      },
      grid: {
        top: '20%',
        bottom: '20%',
        left: '10%',
        right: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: years,
        axisLabel: {
          color: 'black'
        }
      },
      yAxis: {
        type: 'value',
        name: 'Valor (em R$ milhões)',
        axisLabel: {
          formatter: (value: number) => `R$ ${value} mi`,
          color: 'black'
        },
        nameTextStyle: {
          color: 'black'
        },
      },
      series: seriesData,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: any) => {
          let tooltipHtml = '';
          if (params.length > 0) {
              tooltipHtml = `<b>${params[0].name}</b><br/>`; // Correção: usa params[0].name
              params.forEach((item: any) => {
                  tooltipHtml += `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${item.color};"></span>
                  ${item.seriesName}: R$ ${item.value} mi<br/>`;
              });
          }
          return tooltipHtml;
        }
      }
    },
    options: years.map(year => ({
      series: seriesData.map(series => ({
        data: series.data.slice(0, years.indexOf(year) + 1).map((val, i) => ({
          value: val,
          symbolSize: i === years.indexOf(year) ? 15 : 5,
          label: {
            show: false,
            position: 'right',
            formatter: params => params.seriesName,
            color: 'black',
            fontWeight: 'bold',
          }
        }))
      }))
    })),
  };
};

const GraficoLineRace = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRefresh = () => {
    console.log('Dados do gráfico de Regionalização sendo recarregados...');
  };

  const chartTitle = "Gráfico 18 - Evolução do Fomento por Região – 2019 a 2024 (em milhões de reais)";
  const sourceText = "Fonte: Sistema de Bolsas e Auxílios - SBA / Faperj [2019 - 2024]";

  const formattedData = {
    years: rawData.years,
    regions: rawData.regions.map(region => ({
      ...region,
      values: region.values.map(val => val / 1_000_000),
    })),
  };

  return (
    <ChartCard
      title={chartTitle}
      borderColor="#124b6c"
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
      sourceText={sourceText}
    >
      <Box sx={{ height: 500, width: '100%' }}>
        <ReactECharts
          option={getOption(formattedData)}
          style={{ height: '100%', width: '100%' }}
        />
      </Box>
    </ChartCard>
  );
};

export default GraficoLineRace;