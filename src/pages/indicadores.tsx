import Head from 'next/head';
import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Layout from '../components/Layout';
import SEO from '@/components/SEO';

// Importe os gráficos que já temos e os placeholders futuros
import Grafico5 from '../components/dashboard/charts/grafico5'; // Importação adicionada
import Grafico6 from '../components/dashboard/charts/grafico6';
// A partir daqui, são placeholders para os próximos gráficos
import Grafico7 from '../components/dashboard/charts/grafico7';
import Grafico8 from '../components/dashboard/charts/grafico8';
import Grafico9 from '../components/dashboard/charts/grafico9';
// Novo Gráfico 9_1 adicionado aqui
import Grafico9_1 from '../components/dashboard/charts/grafico9_1';

const IndicadoresPage = () => {
    return (
        <Layout>
            <SEO
                title="Indicadores Gerais – FAPERJ Portfolio em Rede"
                description="Visualização de indicadores gerais da FAPERJ, incluindo investimentos, bolsas, auxílios e análise por área de conhecimento."
                url="https://portfolio-faperj.vercel.app/indicadores"
                image="/images/seo-indicadores.png"
            />
            <Head>
                <title>Indicadores</title>
                <meta name="description" content="Página com os gráficos de indicadores." />
            </Head>

            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Indicadores
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {/* Adição do Grafico5 */}
                    <Grid xs={12} sm={6} md={6}>
                        <Grafico5 />
                    </Grid>

                    <Grid xs={12} sm={6} md={6}>
                        <Grafico6 />
                    </Grid>

                    <Grid xs={12} sm={6} md={6}>
                        <Grafico7 />
                    </Grid>
                    
                    <Grid xs={12} sm={6} md={6}>
                        <Grafico8 />
                    </Grid>

                    <Grid xs={12} sm={6} md={6}>
                        <Grafico9 />
                    </Grid>

                    {/* Inclusão do novo Grafico 9_1 */}
                    <Grid xs={12} sm={6} md={6}>
                        <Grafico9_1 />
                    </Grid>
                    {/* Fim da inclusão do Grafico 9_1 */}

                </Grid>
            </Container>
        </Layout>
    );
};

export default IndicadoresPage;