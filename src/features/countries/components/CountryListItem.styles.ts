import { Platform, StyleSheet, type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';

import type { ScreenPalette } from '../../../theme/palette';

interface CountryListItemStyles {
  readonly row: ViewStyle;
  readonly rowPressed: ViewStyle;
  readonly flag: ImageStyle;
  readonly rowText: ViewStyle;
  readonly rowTitle: TextStyle;
  readonly meta: TextStyle;
  readonly population: TextStyle;
  readonly chevron: ViewStyle;
}

const cache = new WeakMap<ScreenPalette, CountryListItemStyles>();

export function getCountryListItemStyles(palette: ScreenPalette) {
  const cached = cache.get(palette);
  if (cached) {
    return cached;
  }

  const styles = StyleSheet.create<CountryListItemStyles>({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 14,
      paddingVertical: 12,
      marginHorizontal: 16,
      marginBottom: 10,
      backgroundColor: palette.card,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.cardBorder,
      ...Platform.select({
        ios: {
          shadowColor: palette.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 6,
        },
        android: {
          elevation: 2,
        },
        default: {},
      }),
    },
    rowPressed: {
      opacity: 0.92,
    },
    flag: {
      width: 56,
      height: 40,
      borderRadius: 6,
      backgroundColor: palette.divider,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: palette.cardBorder,
    },
    rowText: {
      flex: 1,
      marginLeft: 14,
      minWidth: 0,
    },
    rowTitle: {
      color: palette.text,
      fontWeight: '600',
    },
    meta: {
      color: palette.textMuted,
      marginTop: 2,
    },
    population: {
      color: palette.textMuted,
      marginTop: 4,
    },
    chevron: {
      marginLeft: 4,
    },
  });

  cache.set(palette, styles);
  return styles;
}
