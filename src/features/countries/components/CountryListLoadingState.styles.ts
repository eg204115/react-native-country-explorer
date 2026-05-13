import { StyleSheet } from 'react-native';

import type { ScreenPalette } from '../../../theme/palette';

export function createCountryListLoadingStateStyles(palette: ScreenPalette) {
  return StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 28,
      backgroundColor: palette.bg,
    },
    hint: {
      marginTop: 16,
      color: palette.textMuted,
      textAlign: 'center',
    },
  });
}
