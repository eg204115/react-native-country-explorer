import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { useThemePreference } from '../../../context/ThemePreferenceContext';

import { createCountryDetailSectionCardStyles } from './CountryDetailSectionCard.styles';

export interface CountryDetailSectionCardProps {
  readonly title: string;
  readonly children: React.ReactNode;
}

function CountryDetailSectionCardComponent({
  title,
  children,
}: CountryDetailSectionCardProps): React.JSX.Element {
  const { palette } = useThemePreference();
  const styles = useMemo(
    () => createCountryDetailSectionCardStyles(palette),
    [palette],
  );

  return (
    <View style={styles.sectionCard}>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        {title}
      </Text>
      {children}
    </View>
  );
}

export const CountryDetailSectionCard = memo(
  CountryDetailSectionCardComponent,
);
