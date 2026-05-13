import { StyleSheet } from 'react-native';

import { screen } from '../../../theme/screen';

export const countryDetailMapsLinksStyles = StyleSheet.create({
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginBottom: 4,
    borderRadius: 12,
  },
  linkRowPressed: {
    backgroundColor: '#F1F5F9',
  },
  linkIcon: {
    marginRight: 12,
  },
  linkText: {
    flex: 1,
    color: screen.primary,
    fontWeight: '600',
  },
  linkTrailing: {
    marginLeft: 8,
  },
});
