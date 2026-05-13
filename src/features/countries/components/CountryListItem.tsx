import React, { memo, useCallback, useMemo } from 'react';
import { Image, Pressable, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';

import { useThemePreference } from '../../../context/ThemePreferenceContext';
import type { Country } from '../../../types/country';
import { formatPopulation } from '../utils/formatPopulation';

import { createCountryListItemStyles } from './CountryListItem.styles';

export interface CountryListItemProps {
  readonly country: Country;
  readonly onPress: (country: Country) => void;
}

function CountryListItemComponent({
  country,
  onPress,
}: CountryListItemProps): React.JSX.Element {
  const { palette } = useThemePreference();
  const styles = useMemo(
    () => createCountryListItemStyles(palette),
    [palette],
  );

  const handlePress = useCallback(() => {
    onPress(country);
  }, [country, onPress]);

  const metaLine = [country.capital, country.region]
    .filter(Boolean)
    .join(' · ');

  const rippleColor = `${palette.primary}14`;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${country.name}, view details`}
      onPress={handlePress}
      android_ripple={{ color: rippleColor }}
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
        color={palette.textMuted}
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
