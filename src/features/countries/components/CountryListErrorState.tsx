import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';

import { useThemePreference } from '../../../context/ThemePreferenceContext';

import { createCountryListErrorStateStyles } from './CountryListErrorState.styles';

export interface CountryListErrorStateProps {
  readonly message: string;
  readonly onRetry: () => void;
}

function CountryListErrorStateComponent({
  message,
  onRetry,
}: CountryListErrorStateProps): React.JSX.Element {
  const { palette } = useThemePreference();
  const styles = useMemo(
    () => createCountryListErrorStateStyles(palette),
    [palette],
  );

  const handleRetry = useCallback(() => {
    onRetry();
  }, [onRetry]);

  return (
    <View style={styles.centered}>
      <MaterialCommunityIcons
        name="cloud-alert-outline"
        size={48}
        color={palette.textMuted}
        style={styles.stateIcon}
      />
      <Text variant="bodyLarge" style={styles.errorText}>
        {message}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Retry loading countries"
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
  );
}

export const CountryListErrorState = memo(CountryListErrorStateComponent);
