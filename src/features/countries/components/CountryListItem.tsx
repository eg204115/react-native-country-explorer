import React, { memo, useCallback } from 'react';
import { Image, Pressable, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';

import { screen } from '../../../theme/screen';
import type { Country } from '../../../types/country';
import { formatPopulation } from '../utils/formatPopulation';

import { countryListItemStyles as styles } from './CountryListItem.styles';

export interface CountryListItemProps {
  readonly country: Country;
  readonly onPress: (country: Country) => void;
}

function CountryListItemComponent({
  country,
  onPress,
}: CountryListItemProps): React.JSX.Element {
  const handlePress = useCallback(() => {
    onPress(country);
  }, [country, onPress]);

  const metaLine = [country.capital, country.region]
    .filter(Boolean)
    .join(' · ');

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${country.name}, view details`}
      onPress={handlePress}
      android_ripple={{ color: '#2563EB14' }}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <Image
        source={{ uri: country.flag }}
        style={styles.flag}
        accessibilityLabel={`Flag of ${country.name}`}
      />
      <View style={styles.rowText}>
        <Text variant="titleMedium" style={styles.rowTitle} numberOfLines={1}>
          {country.name}
        </Text>
        <Text variant="bodySmall" style={styles.meta} numberOfLines={1}>
          {metaLine}
        </Text>
        <Text variant="bodySmall" style={styles.population}>
          Pop. {formatPopulation(country.population)}
        </Text>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={22}
        color={screen.textMuted}
        style={styles.chevron}
        importantForAccessibility="no"
      />
    </Pressable>
  );
}

function areCountryListItemPropsEqual(
  prev: CountryListItemProps,
  next: CountryListItemProps,
): boolean {
  return (
    prev.country.cca3 === next.country.cca3 &&
    prev.country.name === next.country.name &&
    prev.country.flag === next.country.flag &&
    prev.country.capital === next.country.capital &&
    prev.country.region === next.country.region &&
    prev.country.subregion === next.country.subregion &&
    prev.country.population === next.country.population &&
    prev.onPress === next.onPress
  );
}

export const CountryListItem = memo(
  CountryListItemComponent,
  areCountryListItemPropsEqual,
);
