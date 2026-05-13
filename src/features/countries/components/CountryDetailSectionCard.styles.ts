import { Platform, StyleSheet } from 'react-native';

import type { ScreenPalette } from '../../../theme/palette';

export function createCountryDetailSectionCardStyles(palette: ScreenPalette) {
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
    sectionCard: {
      marginHorizontal: 16,
      marginTop: 12,
      paddingHorizontal: 18,
      paddingTop: 16,
      paddingBottom: 8,
      backgroundColor: palette.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.cardBorder,
      ...cardShadow,
    },
    sectionTitle: {
      marginBottom: 14,
      color: palette.text,
      fontWeight: '600',
    },
  });
}
