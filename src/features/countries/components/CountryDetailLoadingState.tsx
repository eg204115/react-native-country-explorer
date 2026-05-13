import React, { memo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from 'react-native-paper';

import { countryDetailLoadingStateStyles as styles } from './CountryDetailLoadingState.styles';

export interface CountryDetailLoadingStateProps {
  readonly primaryColor: string;
}

function CountryDetailLoadingStateComponent({
  primaryColor,
}: CountryDetailLoadingStateProps): React.JSX.Element {
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
