import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CountryDetails'>;

const CountryDetailsScreen = ({ route }: Props) => {
  const { countryName } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
          {countryName}
        </Text>
        <Text variant="bodyMedium" style={styles.lead}>
          Opened from the country list.
        </Text>
      </View>
    </ScrollView>
  );
};

export default CountryDetailsScreen;

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    marginBottom: 8,
  },
  lead: {
    lineHeight: 22,
    color: '#64748B',
  },
});
