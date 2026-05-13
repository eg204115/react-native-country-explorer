import React, { memo, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';

import { screen } from '../../../theme/screen';

import { countryDetailErrorStateStyles as styles } from './CountryDetailErrorState.styles';

export interface CountryDetailErrorStateProps {
  readonly message: string;
  readonly onRetry: () => void;
}

function CountryDetailErrorStateComponent({
  message,
  onRetry,
}: CountryDetailErrorStateProps): React.JSX.Element {
  const handleRetry = useCallback(() => {
    onRetry();
  }, [onRetry]);

  return (
    <View style={styles.screenFill}>
      <View style={styles.centered}>
        <MaterialCommunityIcons
          name="map-marker-alert-outline"
          size={48}
          color={screen.textMuted}
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
