import { Platform, StyleSheet } from 'react-native';

import { screen } from '../../../theme/screen';

export const countryListItemStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: screen.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: screen.cardBorder,
    ...Platform.select({
      ios: {
        shadowColor: screen.shadow,
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
    backgroundColor: screen.divider,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: screen.cardBorder,
  },
  rowText: {
    flex: 1,
    marginLeft: 14,
    minWidth: 0,
  },
  rowTitle: {
    color: screen.text,
    fontWeight: '600',
  },
  meta: {
    color: screen.textMuted,
    marginTop: 2,
  },
  population: {
    color: screen.textMuted,
    marginTop: 4,
  },
  chevron: {
    marginLeft: 4,
  },
});
