import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

import type { ScreenPalette } from './palette';

export function buildPaperTheme(palette: ScreenPalette, dark: boolean) {
  const base = dark ? MD3DarkTheme : MD3LightTheme;
  return {
    ...base,
    dark,
    roundness: 12,
    colors: {
      ...base.colors,
      primary: palette.primary,
      onPrimary: palette.onPrimary,
      primaryContainer: palette.chipBg,
      onPrimaryContainer: palette.chipText,
      secondary: palette.textMuted,
      onSecondary: palette.card,
      secondaryContainer: palette.divider,
      onSecondaryContainer: palette.text,
      background: palette.bg,
      surface: palette.card,
      surfaceVariant: palette.divider,
      onSurface: palette.text,
      onSurfaceVariant: palette.textMuted,
      outline: palette.cardBorder,
      outlineVariant: palette.divider,
      error: palette.error,
      onBackground: palette.text,
      elevation: base.colors.elevation,
    },
  };
}
