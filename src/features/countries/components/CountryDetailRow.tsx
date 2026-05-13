import React, { memo } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { countryDetailRowStyles as styles } from './CountryDetailRow.styles';

export interface CountryDetailRowProps {
  readonly label: string;
  readonly value: string;
}

function CountryDetailRowComponent({
  label,
  value,
}: CountryDetailRowProps): React.JSX.Element {
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
