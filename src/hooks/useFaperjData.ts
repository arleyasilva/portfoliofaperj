import { useEffect, useState } from "react";

export interface UseFaperjDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Este hook GARANTE tipagem correta para T, inclusive arrays.
 * O segredo é NÃO forçar o retorno como UseFaperjDataResult<T>,
 * deixando o TS inferir corretamente quando T é array.
 */
export default function useFaperjData<T>(fileName: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);

        const jsonPath = `/data/${fileName.replace(".json", "")}.json`;
        const response = await fetch(jsonPath, { signal: controller.signal });

        if (!response.ok) throw new Error(`Falha ao carregar ${jsonPath}`);

        const json = await response.json();
        setData(json as T);
        setError(null);

      } catch (err: unknown) {
        if (controller.signal.aborted) return;

        setError(err instanceof Error ? err.message : "Erro desconhecido ao carregar dados");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [fileName]);

  return { data, loading, error };
}
