// src/pages/indicadores.tsx
import Head from 'next/head';
import { Container, Grid, Typography } from '@mui/material';
import Layout from '../components/Layout';

// Importe os gráficos que já temos e os placeholders futuros
import Grafico6 from '../components/dashboard/charts/grafico6';
// A partir daqui, são placeholders para os próximos gráficos
import Grafico7 from '../components/dashboard/charts/grafico7';
import Grafico8 from '../components/dashboard/charts/grafico8';
import Grafico9 from '../components/dashboard/charts/grafico9';

const IndicadoresPage = () => {
    // Dados de exemplo para a página de indicadores
    const dataIndicadoresExemplo = [
        { name: 'A', value: 100 },
        { name: 'B', value: 200 },
    ];
    
    return (
        <Layout>
            <Head>
                <title>Indicadores FAPERJ</title>
                <meta name="description" content="Página com os gráficos de indicadores." />
            </Head>

            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Indicadores
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={6} md={6}>
                        <Grafico6
                            title="Gráfico 6 — Valor investido por área e quantidade"
                            data={dataIndicadoresExemplo}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <Grafico7
                            title="Gráfico 7 — Placeholder"
                            data={dataIndicadoresExemplo}
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={6}>
                        <Grafico8
                            title="Gráfico 8 — Placeholder"
                            data={dataIndicadoresExemplo}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <Grafico9
                            title="Gráfico 9 — Placeholder"
                            data={dataIndicadoresExemplo}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default IndicadoresPage;