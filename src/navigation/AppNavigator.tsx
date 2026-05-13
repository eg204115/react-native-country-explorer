import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useThemePreference } from '../context/ThemePreferenceContext';
import CountryDetailsScreen from '../screens/CountryDetailsScreen';
import CountryListScreen from '../screens/CountryListScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = (): React.JSX.Element => {
  const { navigationTheme, palette } = useThemePreference();

  const headerStyle = useMemo(
    () => ({
      backgroundColor: palette.card,
      ...Platform.select({
        ios: {
          shadowColor: palette.shadow,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
        default: {},
      }),
    }),
    [palette],
  );

  const headerTitleStyle = useMemo(
    () => ({
      fontWeight: '600' as const,
      fontSize: 18,
      color: palette.text,
    }),
    [palette],
  );

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="CountryList"
        screenOptions={{
          headerStyle,
          headerShadowVisible: false,
          headerTitleStyle,
          headerTintColor: palette.primary,
          contentStyle: { backgroundColor: palette.bg },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="CountryList"
          component={CountryListScreen}
          options={{ title: 'Explore countries' }}
        />
        <Stack.Screen
          name="CountryDetails"
          component={CountryDetailsScreen}
          options={({ route }) => ({
            title: route.params.countryName,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
