import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  mockAreaDistribution,
  mockMonthlyProjects,
  mockHighlightData,
  AreaDistributionData,
  MonthlyProjectsData,
  HighlightData,
} from '../data/mockData';

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutos

// 1. Interfaces para os estados do hook
interface StatsData {
  projetos: number;
  editais: number;
  poderes: number;
  bolsas: number;
  fomentos: number;
}

interface LoadingState {
  area: boolean;
  projects: boolean;
  highlight: boolean;
}

interface ErrorState {
  area: Error | null;
  projects: Error | null;
  highlight: Error | null;
}

// 2. Interface para o objeto que o hook retorna
interface DashboardData {
  statsData: StatsData;
  areaDistribution: AreaDistributionData[] | null;
  monthlyProjects: MonthlyProjectsData[] | null;
  highlightData: HighlightData | null;
  loading: LoadingState;
  error: ErrorState;
  handleRefresh: (chartType: string) => void;
}

const useDashboardData = (): DashboardData => {
  // Estados para os dados estatísticos
  const [statsData, setStatsData] = useState<StatsData>({
    projetos: 0,
    editais: 0,
    poderes: 0,
    bolsas: 0,
    fomentos: 0,
  });

  // Estados para os gráficos
  const [areaDistribution, setAreaDistribution] = useState<AreaDistributionData[] | null>(null);
  const [monthlyProjects, setMonthlyProjects] = useState<MonthlyProjectsData[] | null>(null);
  const [highlightData, setHighlightData] = useState<HighlightData | null>(null);

  const [loading, setLoading] = useState<LoadingState>({
    area: true,
    projects: true,
    highlight: true,
  });
  
  const [error, setError] = useState<ErrorState>({
    area: null,
    projects: null,
    highlight: null,
  });

  /*
    // --- CÓDIGO DA API DESATIVADO ---
    
    // Função para buscar dados estatísticos
    const fetchStatsData = useCallback(async (): Promise<void> => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats`);
        const data: StatsData = await response.json();
        setStatsData(data);
      } catch (error: any) {
        console.error('Erro ao buscar dados estatísticos:', error);
      }
    }, []);

    // Função com retentativa para gráficos
    const fetchWithRetry = useCallback(async <T>(
      endpoint: string,
      setData: (data: T) => void,
      setLoadingKey: (value: boolean) => void,
      setErrorKey: (err: Error | null) => void
    ): Promise<void> => {
      let retries = 3;
      while (retries > 0) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data: T = await res.json();
          setData(data);
          setErrorKey(null);
          setLoadingKey(false);
          return;
        } catch (err: any) {
          retries--;
          if (retries === 0) {
            setErrorKey(err);
            setLoadingKey(false);
          } else {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }
    }, []);

    // Função para carregar todos os dados
    const fetchAllData = useCallback((): void => {
      fetchStatsData();
      setLoading({ area: true, projects: true, highlight: true });

      fetchWithRetry(
        '/stats/areas',
        setAreaDistribution,
        (value) => setLoading(prev => ({ ...prev, area: value })),
        (err) => setError(prev => ({ ...prev, area: err }))
      );

      fetchWithRetry(
        '/stats/monthly-projects',
        setMonthlyProjects,
        (value) => setLoading(prev => ({ ...prev, projects: value })),
        (err) => setError(prev => ({ ...prev, projects: err }))
      );

      fetchWithRetry(
        '/stats/highlight',
        setHighlightData,
        (value) => setLoading(prev => ({ ...prev, highlight: value })),
        (err) => setError(prev => ({ ...prev, highlight: err }))
      );
    }, [fetchStatsData, fetchWithRetry]);

    // Efeitos para carregamento inicial
    useEffect(() => {
      fetchAllData();
      const intervalId = setInterval(fetchAllData, REFRESH_INTERVAL);
      return () => clearInterval(intervalId);
    }, [fetchAllData]);

    // Função para refresh manual
    const handleRefresh = useCallback((chartType: string): void => {
      switch (chartType) {
        case 'area':
          setLoading(prev => ({ ...prev, area: true }));
          fetchWithRetry(
            '/stats/areas',
            setAreaDistribution,
            (value) => setLoading(prev => ({ ...prev, area: value })),
            (err) => setError(prev => ({ ...prev, area: err }))
          );
          break;
        case 'projects':
          setLoading(prev => ({ ...prev, projects: true }));
          fetchWithRetry(
            '/stats/monthly-projects',
            setMonthlyProjects,
            (value) => setLoading(prev => ({ ...prev, projects: value })),
            (err) => setError(prev => ({ ...prev, projects: err }))
          );
          break;
        case 'highlight':
          setLoading(prev => ({ ...prev, highlight: true }));
          fetchWithRetry(
            '/stats/highlight',
            setHighlightData,
            (value) => setLoading(prev => ({ ...prev, highlight: value })),
            (err) => setError(prev => ({ ...prev, highlight: err }))
          );
          break;
        default:
          fetchAllData();
      }
    }, [fetchWithRetry, fetchAllData]);
  */
  
  // Função temporária para o refresh manual que apenas loga no console
  const handleRefresh = useCallback((chartType: string): void => {
    console.log(`Dados para o gráfico "${chartType}" não podem ser atualizados. API desativada.`);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setStatsData({
        projetos: 1200,
        editais: 35,
        pesquisasContempladas: 800,
        bolsas: 450,
        fomentos: 2500000,
      });
      setAreaDistribution(mockAreaDistribution);
      setMonthlyProjects(mockMonthlyProjects);
      setHighlightData(mockHighlightData);
      setLoading({
        area: false,
        projects: false,
        highlight: false,
      });
      setError({
        area: null,
        projects: null,
        highlight: null,
      });
    }, 1000);
  }, []);

  return useMemo(() => ({
    statsData,
    areaDistribution,
    monthlyProjects,
    highlightData,
    loading,
    error,
    handleRefresh: (chartType: string) => {},
  }), [
    statsData,
    areaDistribution,
    monthlyProjects,
    highlightData,
    loading,
    error,
  ]);
};

export default useDashboardData;