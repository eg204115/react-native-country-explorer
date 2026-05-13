import { StyleSheet } from 'react-native';

import type { ScreenPalette } from '../../../theme/palette';

export function createCountryDetailMapsLinksStyles(palette: ScreenPalette) {
  return StyleSheet.create({
    linkRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 4,
      marginBottom: 4,
      borderRadius: 12,
    },
    linkRowPressed: {
      backgroundColor: palette.linkPressedBg,
    },
    linkIcon: {
      marginRight: 12,
    },
    linkText: {
      flex: 1,
      color: palette.primary,
      fontWeight: '600',
    },
    linkTrailing: {
      marginLeft: 8,
    },
  });
}
