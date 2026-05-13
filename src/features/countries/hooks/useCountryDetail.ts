import { useCallback, useEffect, useState } from 'react';

import { fetchCountryDetail } from '../../../api/services/countryService';
import type { CountryDetail } from '../../../types/countryDetail';
import { mapUnknownToErrorMessage } from '../utils/mapUnknownToErrorMessage';

export interface UseCountryDetailResult {
  readonly country: CountryDetail | null;
  readonly loading: boolean;
  readonly error: string | null;
  readonly reload: () => Promise<void>;
}

export function useCountryDetail(cca3: string): UseCountryDetailResult {
  const [country, setCountry] = useState<CountryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCountryDetail(cca3);
      setCountry(data);
    } catch (caught: unknown) {
      setCountry(null);
      setError(mapUnknownToErrorMessage(caught));
    } finally {
      setLoading(false);
    }
  }, [cca3]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return {
    country,
    loading,
    error,
    reload,
  };
}
