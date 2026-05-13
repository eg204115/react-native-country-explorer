import React, { memo, useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useThemePreference } from '../../../context/ThemePreferenceContext';

import { createCountryListLoadingStateStyles } from './CountryListLoadingState.styles';

export interface CountryListLoadingStateProps {
  readonly primaryColor: string;
}

function CountryListLoadingStateComponent({
  primaryColor,
}: CountryListLoadingStateProps): React.JSX.Element {
  const { palette } = useThemePreference();
  const styles = useMemo(
    () => createCountryListLoadingStateStyles(palette),
    [palette],
  );

  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={primaryColor} />
      <Text variant="bodyLarge" style={styles.hint}>
        Loading countries…
      </Text>
    </View>
  );
}

export const CountryListLoadingState = memo(CountryListLoadingStateComponent);
