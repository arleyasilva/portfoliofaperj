// src/pages/indicadores-sexo.tsx
import Head from 'next/head';
import { Container, Grid, Typography } from '@mui/material';
import Layout from '../components/Layout';

// Importe aqui os gráficos 10 a 17 quando estiverem prontos
import Grafico10 from '../components/dashboard/charts/grafico10';
import Grafico11 from '../components/dashboard/charts/grafico11';
import Grafico12 from '../components/dashboard/charts/grafico12';
import Grafico13 from '../components/dashboard/charts/grafico13';
import Grafico14 from '../components/dashboard/charts/grafico14';
import Grafico15 from '../components/dashboard/charts/grafico15';
import Grafico16 from '../components/dashboard/charts/grafico16';
import Grafico17 from '../components/dashboard/charts/grafico17';

const IndicadoresSexoPage = () => {
    // Dados de exemplo para a página de indicadores por sexo
    const dataSexoExemplo = [
        { name: 'A', value: 100 },
        { name: 'B', value: 200 },
    ];
    
    return (
        <Layout>
            <Head>
                <title>Indicadores 2 </title>
                <meta name="description" content="Página com gráficos de comparação por sexo." />
            </Head>

            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Indicadores 2
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={6} md={6}>
                        <Grafico10
                            title="Gráfico 10 — Placeholder"
                            data={dataSexoExemplo}
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={6}>
                        <Grafico11
                            title="Gráfico 11 — Placeholder"
                            data={dataSexoExemplo}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <Grafico12
                            title="Gráfico 12 — Placeholder"
                            data={dataSexoExemplo}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <Grafico13
                            title="Gráfico 13 — Placeholder"
                            data={dataSexoExemplo}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <Grafico14
                            title="Gráfico 14 — Placeholder"
                            data={dataSexoExemplo}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <Grafico15
                            title="Gráfico 15 — Placeholder"
                            data={dataSexoExemplo}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <Grafico16
                            title="Gráfico 16 — Placeholder"
                            data={dataSexoExemplo}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <Grafico17
                            title="Gráfico 17 — Placeholder"
                            data={dataSexoExemplo}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default IndicadoresSexoPage;