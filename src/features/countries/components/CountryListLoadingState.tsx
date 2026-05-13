import React, { memo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from 'react-native-paper';

import { countryListLoadingStateStyles as styles } from './CountryListLoadingState.styles';

export interface CountryListLoadingStateProps {
  readonly primaryColor: string;
}

function CountryListLoadingStateComponent({
  primaryColor,
}: CountryListLoadingStateProps): React.JSX.Element {
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
