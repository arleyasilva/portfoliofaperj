import { Grid, Container } from '@mui/material';
import { 
  totalResourcesByArea, 
  resourcesByFundingType, 
  monthlyData, 
  correlationData 
} from '../data/charts';

import BarChart from '../components/dashboard/charts/graph1';
import PieChart from '../components/dashboard/charts/graph2';
import LineChart from '../components/dashboard/charts/graph3';
import MyScatterChart from '../components/dashboard/charts/graph4';

const DashboardPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <BarChart
            title="Recursos Totais por Área de Conhecimento"
            data={totalResourcesByArea}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PieChart
            title="Distribuição de Recursos por Tipo de Fomento"
            data={resourcesByFundingType}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LineChart
            title="Dados Mensais (Exemplo)"
            data={monthlyData}
          />
        </Grid>
        {
        <Grid item xs={12} md={6}>
          <MyScatterChart
            title="Recursos vs. Fomentos por Área"
            data={correlationData}
          />
        </Grid>
        }
      </Grid>
    </Container>
  );
};

export default DashboardPage;