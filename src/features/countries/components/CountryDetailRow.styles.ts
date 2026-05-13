import { StyleSheet } from 'react-native';

import type { ScreenPalette } from '../../../theme/palette';

export function createCountryDetailRowStyles(palette: ScreenPalette) {
  return StyleSheet.create({
    detailBlock: {
      marginBottom: 14,
    },
    detailLabel: {
      fontSize: 11,
      fontWeight: '700',
      color: palette.textMuted,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      marginBottom: 4,
    },
    detailValue: {
      color: palette.text,
      lineHeight: 24,
    },
  });
}
