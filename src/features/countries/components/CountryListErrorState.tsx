import React, { memo, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';

import { screen } from '../../../theme/screen';

import { countryListErrorStateStyles as styles } from './CountryListErrorState.styles';

export interface CountryListErrorStateProps {
  readonly message: string;
  readonly onRetry: () => void;
}

function CountryListErrorStateComponent({
  message,
  onRetry,
}: CountryListErrorStateProps): React.JSX.Element {
  const handleRetry = useCallback(() => {
    onRetry();
  }, [onRetry]);

  return (
    <View style={styles.centered}>
      <MaterialCommunityIcons
        name="cloud-alert-outline"
        size={48}
        color={screen.textMuted}
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
