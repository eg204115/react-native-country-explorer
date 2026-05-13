import { Platform, StyleSheet } from 'react-native';

import { screen } from '../../../theme/screen';

export const searchBarHeaderStyles = StyleSheet.create({
  searchWrap: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: screen.bg,
  },
  searchbar: {
    borderRadius: 14,
    elevation: 0,
    backgroundColor: screen.card,
    borderWidth: 1,
    borderColor: screen.cardBorder,
    ...Platform.select({
      ios: {
        shadowColor: screen.shadow,
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
