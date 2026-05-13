import { MD3LightTheme } from 'react-native-paper';

export const appTheme = {
  ...MD3LightTheme,
  roundness: 12,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2563EB',
    onPrimary: '#FFFFFF',
    primaryContainer: '#DBEAFE',
    onPrimaryContainer: '#1E3A8A',
    secondary: '#334155',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E2E8F0',
    onSecondaryContainer: '#1E293B',
    background: '#F1F5F9',
    surface: '#FFFFFF',
    surfaceVariant: '#E2E8F0',
    onSurfaceVariant: '#64748B',
    outline: '#CBD5E1',
    error: '#B91C1C',
  },
};
