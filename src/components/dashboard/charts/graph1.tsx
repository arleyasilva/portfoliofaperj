import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Box, Card, CardContent, Typography } from '@mui/material';

interface ChartData {
  name: string;
  value: number;
}

interface BarChartProps {
  title: string;
  data: ChartData[];
}

const BarChart = ({ title, data }: BarChartProps) => {
  if (!data || data.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
        Nenhum dado disponível para o gráfico.
      </Typography>
    );
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ height: 350, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BarChart;