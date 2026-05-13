import type { CountryDetail } from '../../../types/countryDetail';

export interface CountryDetailDisplayStrings {
  readonly capitalsText: string;
  readonly languagesText: string;
  readonly currenciesText: string;
  readonly tldText: string;
  readonly bordersText: string;
  readonly coordsText: string;
  readonly timezonesText: string;
}

/**
 * Derives locale-ready display strings from a loaded country detail record.
 */
export function getCountryDetailDisplayStrings(
  country: CountryDetail,
): CountryDetailDisplayStrings {
  const capitalsText =
    country.capitals.length > 0 ? country.capitals.join(', ') : '—';

  const languagesText =
    country.languageNames.length > 0
      ? country.languageNames.join(', ')
      : '—';

  const currenciesText =
    country.currencyLabels.length > 0
      ? country.currencyLabels.join(', ')
      : '—';

  const tldText =
    country.topLevelDomains.length > 0
      ? country.topLevelDomains.join(', ')
      : '—';

  const bordersText =
    country.borderCodes.length > 0 ? country.borderCodes.join(', ') : 'None';

  const coordsText =
    country.latitude != null && country.longitude != null
      ? `${country.latitude.toFixed(2)}, ${country.longitude.toFixed(2)}`
      : '—';

  const timezonesText =
    country.timezones.length > 0 ? country.timezones.join('\n') : '—';

  return {
    capitalsText,
    languagesText,
    currenciesText,
    tldText,
    bordersText,
    coordsText,
    timezonesText,
  };
}
