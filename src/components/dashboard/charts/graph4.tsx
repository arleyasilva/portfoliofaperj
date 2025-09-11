import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Box, Card, CardContent, Typography } from '@mui/material';

interface DataPoint {
  area: string;
  recursos: number;
  fomentos: number;
}

interface ScatterChartProps {
  title: string;
  data: DataPoint[];
}

const MyScatterChart = ({ title, data }: ScatterChartProps) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ height: 350, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="number" dataKey="fomentos" name="Qtd de Fomentos" unit=" Fomentos" />
              <YAxis type="number" dataKey="recursos" name="Total de Recursos" unit=" R$" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Áreas de Conhecimento" data={data} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MyScatterChart;