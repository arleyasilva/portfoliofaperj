import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Box, Card, CardContent, Typography } from '@mui/material';

interface DataPoint {
  name: string;
  value: number;
}

interface LineChartProps {
  title: string;
  data: DataPoint[];
}

const LineChart = ({ title, data }: LineChartProps) => {
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
            <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </RechartsLineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LineChart;