export default function useFaperjData<T>(key: string) {
  return {
    data: [],
    loading: false,
    error: null,
  } as { data: T; loading: boolean; error: any };
}
