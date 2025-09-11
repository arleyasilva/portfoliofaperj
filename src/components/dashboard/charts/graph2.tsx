import { PieChart as RechartsPieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { Box, Card, CardContent, Typography } from '@mui/material';

const COLORS = ['#FFC0CB', '#87CEFA', '#90EE90'];

interface DataPoint {
  name: string;
  value: number;
}

interface PieChartProps {
  title: string;
  data: DataPoint[];
}

const PieChart = ({ title, data }: PieChartProps) => {
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
            <RechartsPieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PieChart;