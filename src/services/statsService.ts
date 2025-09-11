import { StatsData } from '../hooks/useDashboardData';

const API_URL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

// Função para buscar dados estatísticos principais
export const fetchStatsData = async (): Promise<StatsData | null> => {
  if (!API_URL) {
    console.error('API_URL não está definida.');
    return null;
  }
  try {
    const response = await fetch(`${API_URL}/stats`);
    const data: StatsData = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados estatísticos:', error);
    return null;
  }
};

// Função para buscar dados de gráficos com retentativa
export const fetchWithRetry = async <T>(endpoint: string): Promise<T> => {
  let retries = 3;
  while (retries > 0) {
    try {
      const res = await fetch(`${API_URL}${endpoint}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return await res.json() as T;
    } catch (err) {
      retries--;
      if (retries === 0) {
        throw err;
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  throw new Error("Failed to fetch data after multiple retries");
};