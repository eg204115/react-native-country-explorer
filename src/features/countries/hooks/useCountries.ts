import { useCallback, useEffect, useState } from 'react';

import { fetchCountries } from '../../../api/services/countryService';
import type { Country } from '../../../types/country';
import { mapUnknownToErrorMessage } from '../utils/mapUnknownToErrorMessage';

export type LoadCountriesMode = 'initial' | 'refresh' | 'retry';

export interface UseCountriesResult {
  readonly countries: ReadonlyArray<Country>;
  readonly loading: boolean;
  readonly refreshing: boolean;
  readonly error: string | null;
  readonly load: (mode: LoadCountriesMode) => Promise<void>;
}

export function useCountries(): UseCountriesResult {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (mode: LoadCountriesMode) => {
    const isRefresh = mode === 'refresh';
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const data = await fetchCountries();
      setCountries(data);
    } catch (caught: unknown) {
      setError(mapUnknownToErrorMessage(caught));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void load('initial');
  }, [load]);

  return {
    countries,
    loading,
    refreshing,
    error,
    load,
  };
}
