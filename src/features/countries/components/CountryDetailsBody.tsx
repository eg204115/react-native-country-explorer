import React, { memo, useMemo } from 'react';
import { ScrollView } from 'react-native';

import type { CountryDetail } from '../../../types/countryDetail';
import { formatArea } from '../utils/formatArea';
import { formatPopulation } from '../utils/formatPopulation';
import { getCountryDetailDisplayStrings } from '../utils/countryDetailDisplay';

import { CountryDetailHero } from './CountryDetailHero';
import { CountryDetailMapsLinks } from './CountryDetailMapsLinks';
import { CountryDetailRow } from './CountryDetailRow';
import { CountryDetailSectionCard } from './CountryDetailSectionCard';
import { countryDetailsBodyStyles as styles } from './CountryDetailsBody.styles';

export interface CountryDetailsBodyProps {
  readonly country: CountryDetail;
  readonly paddingBottom: number;
  readonly onOpenUrl: (url: string) => void;
}

function CountryDetailsBodyComponent({
  country,
  paddingBottom,
  onOpenUrl,
}: CountryDetailsBodyProps): React.JSX.Element {
  const display = useMemo(
    () => getCountryDetailDisplayStrings(country),
    [country],
  );

  const showMaps =
    Boolean(country.googleMapsUrl) || Boolean(country.openStreetMapsUrl);

  return (
    <ScrollView
      style={styles.scrollRoot}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingBottom },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <CountryDetailHero country={country} />

      <CountryDetailSectionCard title="Overview">
        <CountryDetailRow
          label="Population"
          value={formatPopulation(country.population)}
        />
        <CountryDetailRow label="Area" value={formatArea(country.areaKm2)} />
        <CountryDetailRow label="Capital" value={display.capitalsText} />
        <CountryDetailRow label="Region" value={country.region} />
        {country.subregion ? (
          <CountryDetailRow label="Subregion" value={country.subregion} />
        ) : null}
      </CountryDetailSectionCard>

      <CountryDetailSectionCard title="People & economy">
        <CountryDetailRow label="Languages" value={display.languagesText} />
        <CountryDetailRow label="Currencies" value={display.currenciesText} />
        <CountryDetailRow
          label="Calling code"
          value={country.callingCode ?? '—'}
        />
        <CountryDetailRow label="Top-level domains" value={display.tldText} />
      </CountryDetailSectionCard>

      <CountryDetailSectionCard title="Geography">
        <CountryDetailRow label="Coordinates" value={display.coordsText} />
        <CountryDetailRow label="Time zones" value={display.timezonesText} />
        <CountryDetailRow
          label="Border countries (codes)"
          value={display.bordersText}
        />
      </CountryDetailSectionCard>

      {showMaps ? (
        <CountryDetailSectionCard title="Maps">
          <CountryDetailMapsLinks
            googleMapsUrl={country.googleMapsUrl}
            openStreetMapsUrl={country.openStreetMapsUrl}
            onOpenUrl={onOpenUrl}
          />
        </CountryDetailSectionCard>
      ) : null}
    </ScrollView>
  );
}

export const CountryDetailsBody = memo(CountryDetailsBodyComponent);
