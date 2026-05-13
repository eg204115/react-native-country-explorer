import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';

import { useThemePreference } from '../../../context/ThemePreferenceContext';

import { createCountryDetailErrorStateStyles } from './CountryDetailErrorState.styles';

export interface CountryDetailErrorStateProps {
  readonly message: string;
  readonly onRetry: () => void;
}

function CountryDetailErrorStateComponent({
  message,
  onRetry,
}: CountryDetailErrorStateProps): React.JSX.Element {
  const { palette } = useThemePreference();
  const styles = useMemo(
    () => createCountryDetailErrorStateStyles(palette),
    [palette],
  );

  const handleRetry = useCallback(() => {
    onRetry();
  }, [onRetry]);

  return (
    <View style={styles.screenFill}>
      <View style={styles.centered}>
        <MaterialCommunityIcons
          name="map-marker-alert-outline"
          size={48}
          color={palette.textMuted}
          style={styles.stateIcon}
        />
        <Text variant="bodyLarge" style={styles.errorText}>
          {message}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Retry loading country details"
          onPress={handleRetry}
          style={({ pressed }) => [
            styles.retryButton,
            pressed && styles.retryButtonPressed,
          ]}
        >
          <Text variant="labelLarge" style={styles.retryLabel}>
            Retry
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export const CountryDetailErrorState = memo(CountryDetailErrorStateComponent);
