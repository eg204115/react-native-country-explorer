import { StyleSheet } from 'react-native';

import { screen } from '../../../theme/screen';

export const countryDetailLoadingStateStyles = StyleSheet.create({
  screenFill: {
    flex: 1,
    backgroundColor: screen.bg,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  hint: {
    marginTop: 16,
    color: screen.textMuted,
    textAlign: 'center',
  },
});
