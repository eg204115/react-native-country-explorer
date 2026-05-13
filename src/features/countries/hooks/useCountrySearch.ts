import { useMemo, useState } from 'react';

import type { Country } from '../../../types/country';
import { filterCountriesBySearchQuery } from '../utils/countrySearch';

export interface UseCountrySearchResult {
  readonly searchQuery: string;
  readonly setSearchQuery: (query: string) => void;
  readonly filteredCountries: Country[];
}

/**
 * Client-side search over an in-memory country list.
 */
export function useCountrySearch(
  countries: readonly Country[],
): UseCountrySearchResult {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = useMemo(
    () => filterCountriesBySearchQuery(countries, searchQuery),
    [countries, searchQuery],
  );

  return {
    searchQuery,
    setSearchQuery,
    filteredCountries,
  };
}
