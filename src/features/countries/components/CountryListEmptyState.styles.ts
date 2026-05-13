import { StyleSheet } from 'react-native';

import { screen } from '../../../theme/screen';

export const countryListEmptyStateStyles = StyleSheet.create({
  emptyInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 48,
    minHeight: 280,
  },
  stateIcon: {
    opacity: 0.85,
  },
  emptyTitle: {
    marginTop: 12,
    color: screen.text,
    textAlign: 'center',
  },
  emptySubtitle: {
    marginTop: 8,
    color: screen.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
});
