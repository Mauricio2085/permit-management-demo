import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig } from "axios";

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

export function useFetch<T>(
  url: string,
  dependencies: unknown[] = [],
  config?: AxiosRequestConfig
): UseFetchState<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true, error: null }));
    try {
      const response = await axios.get<T>(url, config);
      setState({ data: response.data, loading: false, error: null });
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        // Verificar si es un error de Axios
        setState({ data: null, loading: false, error: err }); // Guardar el error de Axios
      } else {
        // Manejar otros tipos de errores (menos comunes)
        setState({
          data: null,
          loading: false,
          error: new AxiosError(
            "An unknown error occurred",
            undefined,
            // config,
            undefined,
            {
              status: 500,
              statusText: "Unknown Error",
              headers: err?.response?.headers,
              config: err?.response?.config,
              data: err?.response?.data,
            }
          ),
        });
      }
    }
  }, [url, JSON.stringify(config), ...dependencies]);
  useEffect(() => {
    fetchData(); // Llama a la función fetchData
  }, [fetchData]); // Dependencia: fetchData (que a su vez depende de url y config)

  return state; // Retorna el estado actual del hook
}
