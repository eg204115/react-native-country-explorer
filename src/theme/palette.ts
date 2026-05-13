/**
 * Semantic colors for screens and cards (outside Paper components).
 * Switched with light/dark preference.
 */
export interface ScreenPalette {
  readonly bg: string;
  readonly card: string;
  readonly cardBorder: string;
  readonly text: string;
  readonly textMuted: string;
  readonly textSubtle: string;
  readonly divider: string;
  readonly primary: string;
  readonly error: string;
  readonly shadow: string;
  readonly onPrimary: string;
  readonly chipBg: string;
  readonly chipText: string;
  readonly linkPressedBg: string;
}

export const lightScreenPalette: ScreenPalette = {
  bg: '#F1F5F9',
  card: '#FFFFFF',
  cardBorder: '#E8EEF4',
  text: '#0F172A',
  textMuted: '#64748B',
  textSubtle: '#475569',
  divider: '#E2E8F0',
  primary: '#2563EB',
  error: '#B91C1C',
  shadow: '#0F172A',
  onPrimary: '#FFFFFF',
  chipBg: '#DBEAFE',
  chipText: '#1E40AF',
  linkPressedBg: '#F1F5F9',
};

export const darkScreenPalette: ScreenPalette = {
  bg: '#0F172A',
  card: '#1E293B',
  cardBorder: '#334155',
  text: '#F8FAFC',
  textMuted: '#94A3B8',
  textSubtle: '#CBD5E1',
  divider: '#334155',
  primary: '#60A5FA',
  error: '#F87171',
  shadow: '#000000',
  onPrimary: '#FFFFFF',
  chipBg: '#1E3A8A',
  chipText: '#93C5FD',
  linkPressedBg: '#334155',
};
