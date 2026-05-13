import { StyleSheet } from 'react-native';

import { screen } from '../../../theme/screen';

export const countryListLoadingStateStyles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
    backgroundColor: screen.bg,
  },
  hint: {
    marginTop: 16,
    color: screen.textMuted,
    textAlign: 'center',
  },
});
