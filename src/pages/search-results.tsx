import Head from 'next/head';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout'; // <-- CORRIGIDO

const API_BASE_URL = '/api/v1/search/researchers';

// ESTRUTURA DO RESULTADO
interface SearchResultItem {
  id: string;
  researcher: string;
  projectTitle: string;
  institution: string;
  summary: string;
  fundingType: string;
}

const SearchResultsPage = () => {
  const router = useRouter();
  const { query } = router;

  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const queryString = new URLSearchParams(
    query as Record<string, string>
  ).toString();

  useEffect(() => {
    if (!router.isReady) return;

    if (!queryString) {
      setError("Nenhum filtro de busca fornecido.");
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      const apiUrl = `${API_BASE_URL}?${queryString}`;

      try {
        // MOCK – substituir pela API real
        const mockData: SearchResultItem[] = [
          {
            id: '1',
            researcher: 'João Arroio da Silva',
            projectTitle: 'Estudos Avançados em IA',
            institution: 'UFRJ',
            summary:
              'Pesquisa sobre algoritmos de redes neurais financiada pela FAPERJ.',
            fundingType: 'APQ1',
          },
        ];

        setTimeout(() => {
          setResults(mockData);
          setLoading(false);
        }, 1500);
      } catch (err) {
        console.error('Erro ao buscar resultados:', err);
        setError('Falha ao conectar-se à API de busca de projetos FAPERJ.');
        setLoading(false);
      }
    };

    fetchResults();
  }, [router.isReady, queryString]);

  return (
    <Layout>
      <Head>
        <title>Resultados da Busca FAPERJ</title>
      </Head>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight: '60vh' }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Resultados da Busca
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          Filtros aplicados: {queryString.replaceAll('&', ', ')}
        </Typography>

        {/* LOADING */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* ERRO */}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {/* RESULTADOS */}
        {!loading && !error && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {results.length} resultados encontrados
            </Typography>

            {results.length > 0 ? (
              results.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    p: 2,
                    mb: 2,
                    border: '1px solid #ddd',
                    borderRadius: 1,
                    backgroundColor: 'white',
                  }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    {item.researcher} ({item.institution})
                  </Typography>

                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ mb: 1, fontWeight: 500 }}
                  >
                    {item.projectTitle}
                  </Typography>

                  <Typography
                    variant="caption"
                    display="block"
                    sx={{ mb: 1 }}
                  >
                    Tipo de Fomento: {item.fundingType}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {item.summary}
                  </Typography>
                </Box>
              ))
            ) : (
              <Alert severity="info">
                Nenhum resultado encontrado para os filtros aplicados.
              </Alert>
            )}
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default SearchResultsPage;
