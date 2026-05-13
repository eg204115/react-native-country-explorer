import React, { memo, useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useThemePreference } from '../../../context/ThemePreferenceContext';

import { createCountryDetailLoadingStateStyles } from './CountryDetailLoadingState.styles';

export interface CountryDetailLoadingStateProps {
  readonly primaryColor: string;
}

function CountryDetailLoadingStateComponent({
  primaryColor,
}: CountryDetailLoadingStateProps): React.JSX.Element {
  const { palette } = useThemePreference();
  const styles = useMemo(
    () => createCountryDetailLoadingStateStyles(palette),
    [palette],
  );

  return (
    <View style={styles.screenFill}>
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={primaryColor} />
        <Text variant="bodyLarge" style={styles.hint}>
          Loading details…
        </Text>
      </View>
    </View>
  );
}

export const CountryDetailLoadingState = memo(
  CountryDetailLoadingStateComponent,
);
