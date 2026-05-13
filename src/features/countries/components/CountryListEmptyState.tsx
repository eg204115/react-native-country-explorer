import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';

import { useThemePreference } from '../../../context/ThemePreferenceContext';

import { createCountryListEmptyStateStyles } from './CountryListEmptyState.styles';

export type CountryListEmptyStateVariant = 'no-matches' | 'empty-data';

export interface CountryListEmptyStateProps {
  readonly variant: CountryListEmptyStateVariant;
}

function CountryListEmptyStateComponent({
  variant,
}: CountryListEmptyStateProps): React.JSX.Element {
  const { palette } = useThemePreference();
  const styles = useMemo(
    () => createCountryListEmptyStateStyles(palette),
    [palette],
  );

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
        color={palette.textMuted}
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
