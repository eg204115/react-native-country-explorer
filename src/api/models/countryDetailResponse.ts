export interface CountryDetailName {
  common: string;

  official: string;
}

export interface CountryDetailFlags {
  png: string;

  svg: string;

  alt?: string;
}

export interface CountryDetailCurrency {
  name: string;

  symbol: string;
}

export interface CountryDetailIdd {
  root?: string;

  suffixes?: string[];
}

export interface CountryDetailMaps {
  googleMaps?: string;

  openStreetMaps?: string;
}

export interface CountryDetailResponse {
  name: CountryDetailName;

  cca3: string;

  flags: CountryDetailFlags;

  capital?: string[];

  population: number;

  region: string;

  subregion?: string;

  area: number;

  borders?: string[];

  tld?: string[];

  languages?: Record<string, string>;

  currencies?: Record<string, CountryDetailCurrency>;

  idd?: CountryDetailIdd;

  timezones: string[];

  latlng: number[];

  maps?: CountryDetailMaps;
}
