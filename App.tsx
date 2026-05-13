import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  ThemePreferenceProvider,
  useThemePreference,
} from './src/context/ThemePreferenceContext';
import AppNavigator from './src/navigation/AppNavigator';

function ThemedRoot(): React.JSX.Element {
  const { paperTheme, colorScheme } = useThemePreference();

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <AppNavigator />
    </PaperProvider>
  );
}

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemePreferenceProvider>
        <ThemedRoot />
      </ThemePreferenceProvider>
    </SafeAreaProvider>
  );
}
