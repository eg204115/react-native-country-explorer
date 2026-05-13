const COUNTRY_DETAIL_FIELDS =
  'name,cca3,flags,capital,population,region,subregion,area,borders,tld,languages,currencies,idd,timezones,latlng,maps';

export const ENDPOINTS = {
  ALL_COUNTRIES:
    '/all?fields=name,cca3,flags,capital,population,region,subregion',

  countryByCca3: (cca3: string) =>
    `/alpha/${encodeURIComponent(cca3)}?fields=${COUNTRY_DETAIL_FIELDS}`,
};