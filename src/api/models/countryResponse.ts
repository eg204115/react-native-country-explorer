export interface CountryName {
  common: string;
}

export interface CountryFlags {
  png: string;
  svg: string;
}

export interface CountryResponse {
  name: CountryName;

  cca3: string;

  flags: CountryFlags;

  capital?: string[];

  population: number;

  region: string;

  subregion?: string;
}