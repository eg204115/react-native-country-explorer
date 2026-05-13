import React, { memo } from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';

import { screen } from '../../../theme/screen';

import { countryListEmptyStateStyles as styles } from './CountryListEmptyState.styles';

export type CountryListEmptyStateVariant = 'no-matches' | 'empty-data';

export interface CountryListEmptyStateProps {
  readonly variant: CountryListEmptyStateVariant;
}

function CountryListEmptyStateComponent({
  variant,
}: CountryListEmptyStateProps): React.JSX.Element {
  const title =
    variant === 'no-matches' ? 'No matches' : 'No data';
  const subtitle =
    variant === 'no-matches'
      ? 'Try a different spelling or a shorter search.'
      : 'Pull down to refresh, or try again later.';

  return (
    <View style={styles.emptyInner}>
      <MaterialCommunityIcons
        name="earth-off"
        size={40}
        color={screen.textMuted}
        style={styles.stateIcon}
      />
      <Text variant="titleMedium" style={styles.emptyTitle}>
        {title}
      </Text>
      <Text variant="bodyMedium" style={styles.emptySubtitle}>
        {subtitle}
      </Text>
    </View>
  );
}

export const CountryListEmptyState = memo(CountryListEmptyStateComponent);
