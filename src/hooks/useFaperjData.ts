import { useEffect, useState } from "react";

export default function useFaperjData<T>(fileName: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const response = await fetch(`/data/${fileName}.json`);

        if (!response.ok) {
          throw new Error(`Erro ao carregar ${fileName}.json`);
        }

        const json = (await response.json()) as T;

        if (isMounted) {
          setData(json);
          setError(null);
          setLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Erro desconhecido");
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fileName]);

  return { data, loading, error };
}
