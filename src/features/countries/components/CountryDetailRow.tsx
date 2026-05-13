import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { useThemePreference } from '../../../context/ThemePreferenceContext';

import { createCountryDetailRowStyles } from './CountryDetailRow.styles';

export interface CountryDetailRowProps {
  readonly label: string;
  readonly value: string;
}

function CountryDetailRowComponent({
  label,
  value,
}: CountryDetailRowProps): React.JSX.Element {
  const { palette } = useThemePreference();
  const styles = useMemo(
    () => createCountryDetailRowStyles(palette),
    [palette],
  );

  return (
    <View style={styles.detailBlock}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text variant="bodyLarge" style={styles.detailValue}>
        {value}
      </Text>
    </View>
  );
}

export const CountryDetailRow = memo(CountryDetailRowComponent);
