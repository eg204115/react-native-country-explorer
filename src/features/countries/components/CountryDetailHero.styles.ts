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

export const countryDetailHeroStyles = StyleSheet.create({
  heroCard: {
    marginHorizontal: 16,
    marginBottom: 4,
    padding: 18,
    paddingTop: 16,
    alignItems: 'center',
    backgroundColor: screen.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: screen.cardBorder,
    ...cardShadow,
  },
  flag: {
    width: '100%',
    maxWidth: 300,
    height: 180,
    marginBottom: 14,
    backgroundColor: screen.divider,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: screen.cardBorder,
  },
  commonTitle: {
    textAlign: 'center',
    color: screen.text,
    fontWeight: '700',
  },
  officialName: {
    textAlign: 'center',
    color: screen.textSubtle,
    marginTop: 8,
    lineHeight: 24,
  },
  codeChip: {
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#DBEAFE',
  },
  codeChipText: {
    color: '#1E40AF',
    fontWeight: '600',
    letterSpacing: 1,
  },
});
