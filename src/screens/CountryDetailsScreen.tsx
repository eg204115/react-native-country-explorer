import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const CountryDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">
        Country Details Screen
      </Text>
    </View>
  );
};

export default CountryDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});