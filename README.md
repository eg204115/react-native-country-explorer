# React Native Country Explorer

A clean, typed Expo app to browse countries, search quickly, and view rich details with persistent light/dark theme support.

## Tech Stack

- Expo + React Native
- TypeScript
- React Navigation (native stack)
- React Native Paper (MD3)
- Axios
- AsyncStorage (theme preference persistence)

## Features

- Country list with pull-to-refresh
- Sticky search bar (name, capital, region, subregion)
- Country details screen (overview, people & economy, geography, maps)
- Google Maps and OpenStreetMap deep links
- Graceful loading/error/empty states
- Persistent theme toggle (light/dark) from screen headers

## Project Structure

```txt
src/
  api/                 # Axios client, API models, services
  constants/           # Endpoint constants
  context/             # Theme preference context/provider
  features/
    countries/
      components/      # Reusable UI pieces for list/detail
      hooks/           # useCountries, useCountrySearch, useCountryDetail
      utils/           # formatting + display mapping helpers
  navigation/          # App navigator + stack config
  screens/             # CountryListScreen, CountryDetailsScreen
  theme/               # palette + paper/navigation theme builders
  types/               # App/domain types
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run the app

```bash
npm run start
```

Then choose one:

```bash
npm run android
npm run ios
npm run web
```

## API

Data is fetched from REST Countries using field-filtered endpoints:

- `GET /all?fields=name,cca3,flags,capital,population,region,subregion`
- `GET /alpha/{cca3}?fields=name,cca3,flags,capital,population,region,subregion,area,borders,tld,languages,currencies,idd,timezones,latlng,maps`

See `src/constants/endpoints.ts` and `src/api/services/countryService.ts`.

## Theme Handling

- Theme state lives in `ThemePreferenceContext`
- Palette is converted into:
  - React Native Paper theme (`buildPaperTheme`)
  - React Navigation theme (`buildNavigationTheme`)
- User choice is persisted with AsyncStorage under `@country-explorer/theme-mode`

## Notes for Contributors

- Keep business logic in feature hooks/utils; screens should compose behavior.
- Prefer typed API mappers in `src/api/services` over ad-hoc transformation in UI.
- Reuse feature components and barrel exports (`src/features/countries/index.ts`).

