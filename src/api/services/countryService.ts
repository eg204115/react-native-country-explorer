import axios, { AxiosError } from 'axios';

import axiosClient from '../client/axiosClient';

import { ENDPOINTS } from '../../constants/endpoints';

import { CountryResponse } from '../models/countryResponse';

import { CountryDetailResponse } from '../models/countryDetailResponse';

import { Country } from '../../types/country';

import { CountryDetail } from '../../types/countryDetail';

const mapCountryDetailResponse = (
  country: CountryDetailResponse,
): CountryDetail => {
  const currencyLabels = country.currencies
    ? Object.values(country.currencies).map((c) =>
        c.symbol ? `${c.name} (${c.symbol})` : c.name,
      )
    : [];

  const languageNames = country.languages
    ? Object.values(country.languages)
    : [];

  const root = country.idd?.root ?? '';
  const suffixPart = country.idd?.suffixes?.join('') ?? '';
  const callingCode =
    root || suffixPart ? `${root}${suffixPart}` : null;

  const [latRaw, lngRaw] = country.latlng ?? [];
  const latitude =
    typeof latRaw === 'number' && !Number.isNaN(latRaw)
      ? latRaw
      : null;
  const longitude =
    typeof lngRaw === 'number' && !Number.isNaN(lngRaw)
      ? lngRaw
      : null;

  return {
    commonName: country.name.common,

    officialName: country.name.official,

    cca3: country.cca3,

    flagPng: country.flags.png,

    flagAlt: country.flags.alt ?? null,

    capitals: country.capital ?? [],

    population: country.population,

    region: country.region,

    subregion: country.subregion ?? null,

    areaKm2: country.area,

    borderCodes: country.borders ?? [],

    topLevelDomains: country.tld ?? [],

    languageNames,

    currencyLabels,

    callingCode,

    timezones: country.timezones ?? [],

    latitude,

    longitude,

    googleMapsUrl: country.maps?.googleMaps ?? null,

    openStreetMapsUrl: country.maps?.openStreetMaps ?? null,
  };
};

const mapCountryResponse = (
  country: CountryResponse,
): Country => {
  return {
    name: country.name.common,

    cca3: country.cca3,

    flag: country.flags.png,

    capital: country.capital?.[0] ?? null,

    population: country.population,

    region: country.region,

    subregion: country.subregion ?? null,
  };
};

export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response =
      await axiosClient.get<CountryResponse[]>(
        ENDPOINTS.ALL_COUNTRIES,
      );

    return response.data.map(mapCountryResponse);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      throw new Error(
        axiosError.message ||
          'Failed to fetch countries.',
      );
    }

    throw new Error(
      'An unexpected error occurred.',
    );
  }
};

export const fetchCountryDetail = async (
  cca3: string,
): Promise<CountryDetail> => {
  try {
    const response =
      await axiosClient.get<CountryDetailResponse>(
        ENDPOINTS.countryByCca3(cca3),
      );

    return mapCountryDetailResponse(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 404) {
        throw new Error('Country not found.');
      }

      throw new Error(
        axiosError.message || 'Failed to load country details.',
      );
    }

    throw new Error('An unexpected error occurred.');
  }
};