import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CountryListScreen from '../screens/CountryListScreen';
import CountryDetailsScreen from '../screens/CountryDetailsScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CountryList">
        <Stack.Screen
          name="CountryList"
          component={CountryListScreen}
          options={{ title: 'Countries' }}
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
