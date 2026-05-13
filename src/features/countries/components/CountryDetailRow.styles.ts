import { StyleSheet } from 'react-native';

import { screen } from '../../../theme/screen';

export const countryDetailRowStyles = StyleSheet.create({
  detailBlock: {
    marginBottom: 14,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: screen.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  detailValue: {
    color: screen.text,
    lineHeight: 24,
  },
});
