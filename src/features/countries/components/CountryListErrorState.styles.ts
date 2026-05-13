import { StyleSheet } from 'react-native';

import type { ScreenPalette } from '../../../theme/palette';

export function createCountryListErrorStateStyles(palette: ScreenPalette) {
  return StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 28,
      backgroundColor: palette.bg,
    },
    stateIcon: {
      opacity: 0.85,
    },
    errorText: {
      textAlign: 'center',
      color: palette.error,
      marginTop: 12,
      lineHeight: 22,
    },
    retryButton: {
      marginTop: 22,
      paddingHorizontal: 28,
      paddingVertical: 12,
      backgroundColor: palette.primary,
      borderRadius: 12,
    },
    retryButtonPressed: {
      opacity: 0.9,
    },
    retryLabel: {
      color: palette.onPrimary,
      fontWeight: '600',
    },
  });
}
