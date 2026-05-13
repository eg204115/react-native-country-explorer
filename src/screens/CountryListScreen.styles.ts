import { Platform, StyleSheet } from 'react-native';

import { screen } from '../theme/screen';

export const styles = StyleSheet.create({
  screenFill: {
    flex: 1,
    backgroundColor: screen.bg,
  },
  listRoot: {
    flex: 1,
    backgroundColor: screen.bg,
  },
  listContent: {
    paddingTop: 4,
  },
  emptyList: {
    flexGrow: 1,
    backgroundColor: screen.bg,
  },
});
