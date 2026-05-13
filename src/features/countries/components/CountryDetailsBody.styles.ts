import { StyleSheet } from 'react-native';

import type { ScreenPalette } from '../../../theme/palette';

export function createCountryDetailsBodyStyles(palette: ScreenPalette) {
  return StyleSheet.create({
    scrollRoot: {
      flex: 1,
      backgroundColor: palette.bg,
    },
    scrollContent: {
      paddingTop: 8,
    },
  });
}
