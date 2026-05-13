import { Platform, StyleSheet } from 'react-native';

import type { ScreenPalette } from '../../../theme/palette';

export function createCountryDetailHeroStyles(palette: ScreenPalette) {
  const cardShadow = Platform.select({
    ios: {
      shadowColor: palette.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
    },
    android: { elevation: 3 },
    default: {},
  });

  return StyleSheet.create({
    heroCard: {
      marginHorizontal: 16,
      marginBottom: 4,
      padding: 18,
      paddingTop: 16,
      alignItems: 'center',
      backgroundColor: palette.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.cardBorder,
      ...cardShadow,
    },
    flag: {
      width: '100%',
      maxWidth: 300,
      height: 180,
      marginBottom: 14,
      backgroundColor: palette.divider,
      borderRadius: 12,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: palette.cardBorder,
    },
    commonTitle: {
      textAlign: 'center',
      color: palette.text,
      fontWeight: '700',
    },
    officialName: {
      textAlign: 'center',
      color: palette.textSubtle,
      marginTop: 8,
      lineHeight: 24,
    },
    codeChip: {
      marginTop: 14,
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 999,
      backgroundColor: palette.chipBg,
    },
    codeChipText: {
      color: palette.chipText,
      fontWeight: '600',
      letterSpacing: 1,
    },
  });
}
