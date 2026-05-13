import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Appearance } from 'react-native';

import { buildNavigationTheme } from '../theme/buildNavigationTheme';
import { buildPaperTheme } from '../theme/buildPaperTheme';
import {
  darkScreenPalette,
  lightScreenPalette,
  type ScreenPalette,
} from '../theme/palette';

const STORAGE_KEY = '@country-explorer/theme-mode';

export type ColorSchemeName = 'light' | 'dark';

export interface ThemePreferenceContextValue {
  readonly colorScheme: ColorSchemeName;
  readonly setColorScheme: (mode: ColorSchemeName) => void;
  readonly toggleColorScheme: () => void;
  readonly palette: ScreenPalette;
  readonly paperTheme: ReturnType<typeof buildPaperTheme>;
  readonly navigationTheme: ReturnType<typeof buildNavigationTheme>;
  readonly ready: boolean;
}

const ThemePreferenceContext =
  createContext<ThemePreferenceContextValue | null>(null);

function resolveStoredMode(raw: string | null): ColorSchemeName | null {
  if (raw === 'light' || raw === 'dark') {
    return raw;
  }
  return null;
}

export function ThemePreferenceProvider({
  children,
}: {
  readonly children: React.ReactNode;
}): React.JSX.Element {
  const [colorScheme, setColorSchemeState] = useState<ColorSchemeName>(() =>
    Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        const resolved = resolveStoredMode(stored);
        if (!cancelled && resolved) {
          setColorSchemeState(resolved);
        }
      } finally {
        if (!cancelled) {
          setReady(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const setColorScheme = useCallback((mode: ColorSchemeName) => {
    setColorSchemeState(mode);
    void AsyncStorage.setItem(STORAGE_KEY, mode);
  }, []);

  const toggleColorScheme = useCallback(() => {
    setColorSchemeState((prev) => {
      const next: ColorSchemeName = prev === 'light' ? 'dark' : 'light';
      void AsyncStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const palette = useMemo(
    () => (colorScheme === 'dark' ? darkScreenPalette : lightScreenPalette),
    [colorScheme],
  );

  const paperTheme = useMemo(
    () => buildPaperTheme(palette, colorScheme === 'dark'),
    [palette, colorScheme],
  );

  const navigationTheme = useMemo(
    () => buildNavigationTheme(palette, colorScheme === 'dark'),
    [palette, colorScheme],
  );

  const value = useMemo(
    (): ThemePreferenceContextValue => ({
      colorScheme,
      setColorScheme,
      toggleColorScheme,
      palette,
      paperTheme,
      navigationTheme,
      ready,
    }),
    [
      colorScheme,
      setColorScheme,
      toggleColorScheme,
      palette,
      paperTheme,
      navigationTheme,
      ready,
    ],
  );

  return (
    <ThemePreferenceContext.Provider value={value}>
      {children}
    </ThemePreferenceContext.Provider>
  );
}

export function useThemePreference(): ThemePreferenceContextValue {
  const ctx = useContext(ThemePreferenceContext);
  if (!ctx) {
    throw new Error(
      'useThemePreference must be used within ThemePreferenceProvider',
    );
  }
  return ctx;
}
