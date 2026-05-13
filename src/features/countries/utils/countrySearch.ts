import type { Country } from '../../../types/country';

export function buildCountrySearchHaystack(country: Country): string {
  return [
    country.name,
    country.capital ?? '',
    country.region,
    country.subregion ?? '',
  ]
    .join(' ')
    .toLowerCase();
}


export function countryMatchesSearchQuery(
  country: Country,
  rawQuery: string,
): boolean {
  const query = rawQuery.trim().toLowerCase();
  if (query.length === 0) {
    return true;
  }
  return buildCountrySearchHaystack(country).includes(query);
}


export function filterCountriesBySearchQuery(
  countries: readonly Country[],
  rawQuery: string,
): Country[] {
  if (rawQuery.trim().length === 0) {
    return [...countries];
  }
  return countries.filter((country) =>
    countryMatchesSearchQuery(country, rawQuery),
  );
}
