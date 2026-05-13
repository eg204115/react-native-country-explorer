import { Platform, StyleSheet } from 'react-native';

import type { ScreenPalette } from '../../../theme/palette';

export function createSearchBarHeaderStyles(palette: ScreenPalette) {
  return StyleSheet.create({
    searchWrap: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 8,
      backgroundColor: palette.bg,
    },
    searchbar: {
      borderRadius: 14,
      elevation: 0,
      backgroundColor: palette.card,
      borderWidth: 1,
      borderColor: palette.cardBorder,
      ...Platform.select({
        ios: {
          shadowColor: palette.shadow,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
        },
        default: {},
      }),
    },
    searchInput: {
      minHeight: 0,
      fontSize: 16,
    },
  });
}
