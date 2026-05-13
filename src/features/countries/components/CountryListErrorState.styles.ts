import { StyleSheet } from 'react-native';

import { screen } from '../../../theme/screen';

export const countryListErrorStateStyles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
    backgroundColor: screen.bg,
  },
  stateIcon: {
    opacity: 0.85,
  },
  errorText: {
    textAlign: 'center',
    color: screen.error,
    marginTop: 12,
    lineHeight: 22,
  },
  retryButton: {
    marginTop: 22,
    paddingHorizontal: 28,
    paddingVertical: 12,
    backgroundColor: screen.primary,
    borderRadius: 12,
  },
  retryButtonPressed: {
    opacity: 0.9,
  },
  retryLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
