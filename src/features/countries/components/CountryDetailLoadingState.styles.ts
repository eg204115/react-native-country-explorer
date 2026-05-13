import { StyleSheet } from 'react-native';

import type { ScreenPalette } from '../../../theme/palette';

export function createCountryDetailLoadingStateStyles(palette: ScreenPalette) {
  return StyleSheet.create({
    screenFill: {
      flex: 1,
      backgroundColor: palette.bg,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 28,
    },
    hint: {
      marginTop: 16,
      color: palette.textMuted,
      textAlign: 'center',
    },
  });
}
