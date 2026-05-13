import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { fetchCountries } from '../api/services/countryService';
import type { Country } from '../types/country';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CountryList'>;

const formatPopulation = (n: number): string =>
  new Intl.NumberFormat().format(n);

const matchesSearch = (country: Country, query: string): boolean => {
  const q = query.trim().toLowerCase();
  if (!q) {
    return true;
  }

  const haystack = [
    country.name,
    country.capital ?? '',
    country.region,
    country.subregion ?? '',
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(q);
};

const CountryListScreen = ({ navigation }: Props) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCountries = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const data = await fetchCountries();
      setCountries(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadCountries(false);
  }, [loadCountries]);

  const onRefresh = useCallback(() => {
    void loadCountries(true);
  }, [loadCountries]);

  const filteredCountries = useMemo(
    () => countries.filter((c) => matchesSearch(c, searchQuery)),
    [countries, searchQuery],
  );

  const listHeader = useMemo(
    () => (
      <View style={styles.searchWrap}>
        <Searchbar
          placeholder="Search by name, capital, or region"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          inputStyle={styles.searchInput}
        />
      </View>
    ),
    [searchQuery],
  );

  const renderItem = useCallback(
    ({ item }: { item: Country }) => (
      <Pressable
        onPress={() =>
          navigation.navigate('CountryDetails', {
            cca3: item.cca3,
            countryName: item.name,
          })
        }
        style={({ pressed }) => [
          styles.row,
          pressed && styles.rowPressed,
        ]}
      >
        <Image
          source={{ uri: item.flag }}
          style={styles.flag}
          accessibilityLabel={`Flag of ${item.name}`}
        />
        <View style={styles.rowText}>
          <Text variant="titleMedium" numberOfLines={1}>
            {item.name}
          </Text>
          <Text variant="bodySmall" style={styles.meta} numberOfLines={1}>
            {[item.capital, item.region].filter(Boolean).join(' · ')}
          </Text>
          <Text variant="bodySmall" style={styles.population}>
            Pop. {formatPopulation(item.population)}
          </Text>
        </View>
      </Pressable>
    ),
    [navigation],
  );

  if (loading && countries.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.hint}>Loading countries…</Text>
      </View>
    );
  }

  if (error && countries.length === 0) {
    return (
      <View style={styles.centered}>
        <Text variant="bodyLarge" style={styles.errorText}>
          {error}
        </Text>
        <Pressable
          onPress={() => void loadCountries(false)}
          style={styles.retryButton}
        >
          <Text variant="labelLarge" style={styles.retryLabel}>
            Retry
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredCountries}
      keyExtractor={(item) => item.cca3}
      renderItem={renderItem}
      ListHeaderComponent={listHeader}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={
        filteredCountries.length === 0 ? styles.emptyList : styles.listContent
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <View style={styles.centered}>
          <Text variant="bodyLarge">
            {searchQuery.trim() && countries.length > 0
              ? 'No countries match your search.'
              : 'No countries found.'}
          </Text>
        </View>
      }
    />
  );
};

export default CountryListScreen;

const styles = StyleSheet.create({
  searchWrap: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: '#FFFFFF',
  },
  searchbar: {
    elevation: 0,
    backgroundColor: '#F1F5F9',
  },
  searchInput: {
    minHeight: 0,
  },
  listContent: {
    paddingVertical: 8,
  },
  emptyList: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E2E8F0',
  },
  rowPressed: {
    backgroundColor: '#F1F5F9',
  },
  flag: {
    width: 56,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
  },
  rowText: {
    flex: 1,
    marginLeft: 14,
  },
  meta: {
    color: '#64748B',
    marginTop: 2,
  },
  population: {
    color: '#64748B',
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  hint: {
    marginTop: 12,
    color: '#64748B',
  },
  errorText: {
    textAlign: 'center',
    color: '#B91C1C',
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#2563EB',
    borderRadius: 8,
  },
  retryLabel: {
    color: '#FFFFFF',
  },
});
