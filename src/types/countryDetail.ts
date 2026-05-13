export interface CountryDetail {
  commonName: string;

  officialName: string;

  cca3: string;

  flagPng: string;

  flagAlt: string | null;

  capitals: string[];

  population: number;

  region: string;

  subregion: string | null;

  areaKm2: number;

  borderCodes: string[];

  topLevelDomains: string[];

  languageNames: string[];

  currencyLabels: string[];

  callingCode: string | null;

  timezones: string[];

  latitude: number | null;

  longitude: number | null;

  googleMapsUrl: string | null;

  openStreetMapsUrl: string | null;
}
