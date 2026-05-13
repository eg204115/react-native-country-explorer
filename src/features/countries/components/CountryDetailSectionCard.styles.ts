import { Platform, StyleSheet } from 'react-native';

import { screen } from '../../../theme/screen';

const cardShadow = Platform.select({
  ios: {
    shadowColor: screen.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },
  android: { elevation: 3 },
  default: {},
});

export const countryDetailSectionCardStyles = StyleSheet.create({
  sectionCard: {
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: screen.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: screen.cardBorder,
    ...cardShadow,
  },
  sectionTitle: {
    marginBottom: 14,
    color: screen.text,
    fontWeight: '600',
  },
});
