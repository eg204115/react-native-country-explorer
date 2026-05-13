import React, { memo } from 'react';
import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';

import type { CountryDetail } from '../../../types/countryDetail';

import { countryDetailHeroStyles as styles } from './CountryDetailHero.styles';

export interface CountryDetailHeroProps {
  readonly country: CountryDetail;
}

function CountryDetailHeroComponent({
  country,
}: CountryDetailHeroProps): React.JSX.Element {
  return (
    <View style={styles.heroCard}>
      <Image
        source={{ uri: country.flagPng }}
        style={styles.flag}
        accessibilityLabel={
          country.flagAlt ?? `Flag of ${country.commonName}`
        }
        resizeMode="contain"
      />
      <Text variant="headlineSmall" style={styles.commonTitle}>
        {country.commonName}
      </Text>
      <Text variant="bodyLarge" style={styles.officialName}>
        {country.officialName}
      </Text>
      <View style={styles.codeChip}>
        <Text variant="labelMedium" style={styles.codeChipText}>
          {country.cca3}
        </Text>
      </View>
    </View>
  );
}

export const CountryDetailHero = memo(CountryDetailHeroComponent);
