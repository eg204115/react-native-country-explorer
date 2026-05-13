import { StyleSheet } from 'react-native';

import type { ScreenPalette } from '../theme/palette';

export function createCountryListScreenStyles(palette: ScreenPalette) {
  return StyleSheet.create({
    screenFill: {
      flex: 1,
      backgroundColor: palette.bg,
    },
    listRoot: {
      flex: 1,
      backgroundColor: palette.bg,
    },
    listContent: {
      paddingTop: 4,
    },
    emptyList: {
      flexGrow: 1,
      backgroundColor: palette.bg,
    },
  });
}
