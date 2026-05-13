import { DefaultTheme, Theme } from '@react-navigation/native';

export const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2563EB',
    background: '#F1F5F9',
    card: '#FFFFFF',
    text: '#0F172A',
    border: '#E2E8F0',
    notification: '#2563EB',
  },
};
