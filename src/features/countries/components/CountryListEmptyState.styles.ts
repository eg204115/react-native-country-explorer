import { StyleSheet } from 'react-native';

import type { ScreenPalette } from '../../../theme/palette';

export function createCountryListEmptyStateStyles(palette: ScreenPalette) {
  return StyleSheet.create({
    emptyInner: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
      paddingVertical: 48,
      minHeight: 280,
    },
    stateIcon: {
      opacity: 0.85,
    },
    emptyTitle: {
      marginTop: 12,
      color: palette.text,
      textAlign: 'center',
    },
    emptySubtitle: {
      marginTop: 8,
      color: palette.textMuted,
      textAlign: 'center',
      lineHeight: 22,
    },
  });
}
