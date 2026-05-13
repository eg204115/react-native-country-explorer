import axios, { AxiosError } from 'axios';

import axiosClient from '../client/axiosClient';

import { ENDPOINTS } from '../../constants/endpoints';

import { CountryResponse } from '../models/countryResponse';

import { Country } from '../../types/country';

const mapCountryResponse = (
  country: CountryResponse,
): Country => {
  return {
    name: country.name.common,

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