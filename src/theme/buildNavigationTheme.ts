import {
  DarkTheme,
  DefaultTheme,
  type Theme as NavigationTheme,
} from '@react-navigation/native';

import type { ScreenPalette } from './palette';

export function buildNavigationTheme(
  palette: ScreenPalette,
  dark: boolean,
): NavigationTheme {
  const base = dark ? DarkTheme : DefaultTheme;
  return {
    ...base,
    dark,
    colors: {
      ...base.colors,
      primary: palette.primary,
      background: palette.bg,
      card: palette.card,
      text: palette.text,
      border: palette.cardBorder,
      notification: palette.primary,
    },
  };
}
