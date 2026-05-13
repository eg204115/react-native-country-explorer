import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CountryListScreen from '../screens/CountryListScreen';
import CountryDetailsScreen from '../screens/CountryDetailsScreen';
import { navigationTheme } from '../theme/navigationTheme';
import { screen } from '../theme/screen';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const headerStyle = {
  backgroundColor: screen.card,
  ...Platform.select({
    ios: {
      shadowColor: screen.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    },
    default: {},
  }),
};

const AppNavigator = () => {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="CountryList"
        screenOptions={{
          headerStyle,
          headerShadowVisible: false,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: screen.primary,
          contentStyle: { backgroundColor: screen.bg },
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

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: '600',
    fontSize: 18,
    color: screen.text,
  },
});
