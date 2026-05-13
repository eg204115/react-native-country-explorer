import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Searchbar, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { fetchCountries } from '../api/services/countryService';
import { screen } from '../theme/screen';
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
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [countries, setCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listBottomPad = 16 + insets.bottom;

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
          elevation={0}
          rippleColor="transparent"
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
        android_ripple={{ color: '#2563EB14' }}
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
          <Text variant="titleMedium" style={styles.rowTitle} numberOfLines={1}>
            {item.name}
          </Text>
          <Text variant="bodySmall" style={styles.meta} numberOfLines={1}>
            {[item.capital, item.region].filter(Boolean).join(' · ')}
          </Text>
          <Text variant="bodySmall" style={styles.population}>
            Pop. {formatPopulation(item.population)}
          </Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={22}
          color={screen.textMuted}
          style={styles.chevron}
        />
      </Pressable>
    ),
    [navigation],
  );

  if (loading && countries.length === 0) {
    return (
      <View style={[styles.centered, styles.screenFill]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text variant="bodyLarge" style={styles.hint}>
          Loading countries…
        </Text>
      </View>
    );
  }

  if (error && countries.length === 0) {
    return (
      <View style={[styles.centered, styles.screenFill]}>
        <MaterialCommunityIcons
          name="cloud-alert-outline"
          size={48}
          color={screen.textMuted}
          style={styles.stateIcon}
        />
        <Text variant="bodyLarge" style={styles.errorText}>
          {error}
        </Text>
        <Pressable
          onPress={() => void loadCountries(false)}
          style={({ pressed }) => [
            styles.retryButton,
            pressed && styles.retryButtonPressed,
          ]}
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
      style={styles.listRoot}
      data={filteredCountries}
      keyExtractor={(item) => item.cca3}
      renderItem={renderItem}
      ListHeaderComponent={listHeader}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[
        filteredCountries.length === 0 ? styles.emptyList : styles.listContent,
        { paddingBottom: listBottomPad },
      ]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={theme.colors.primary}
          colors={[theme.colors.primary]}
        />
      }
      ListEmptyComponent={
        <View style={styles.emptyInner}>
          <MaterialCommunityIcons
            name="earth-off"
            size={40}
            color={screen.textMuted}
            style={styles.stateIcon}
          />
          <Text variant="titleMedium" style={styles.emptyTitle}>
            {searchQuery.trim() && countries.length > 0
              ? 'No matches'
              : 'No data'}
          </Text>
          <Text variant="bodyMedium" style={styles.emptySubtitle}>
            {searchQuery.trim() && countries.length > 0
              ? 'Try a different spelling or a shorter search.'
              : 'Pull down to refresh, or try again later.'}
          </Text>
        </View>
      }
    />
  );
};

export default CountryListScreen;

const styles = StyleSheet.create({
  screenFill: {
    backgroundColor: screen.bg,
  },
  listRoot: {
    flex: 1,
    backgroundColor: screen.bg,
  },
  searchWrap: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: screen.bg,
  },
  searchbar: {
    borderRadius: 14,
    elevation: 0,
    backgroundColor: screen.card,
    borderWidth: 1,
    borderColor: screen.cardBorder,
    ...Platform.select({
      ios: {
        shadowColor: screen.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      default: {},
    }),
  },
  searchInput: {
    minHeight: 0,
    fontSize: 16,
  },
  listContent: {
    paddingTop: 4,
  },
  emptyList: {
    flexGrow: 1,
    backgroundColor: screen.bg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: screen.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: screen.cardBorder,
    ...Platform.select({
      ios: {
        shadowColor: screen.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  rowPressed: {
    opacity: 0.92,
  },
  flag: {
    width: 56,
    height: 40,
    borderRadius: 6,
    backgroundColor: screen.divider,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: screen.cardBorder,
  },
  rowText: {
    flex: 1,
    marginLeft: 14,
    minWidth: 0,
  },
  rowTitle: {
    color: screen.text,
    fontWeight: '600',
  },
  meta: {
    color: screen.textMuted,
    marginTop: 2,
  },
  population: {
    color: screen.textMuted,
    marginTop: 4,
  },
  chevron: {
    marginLeft: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  hint: {
    marginTop: 16,
    color: screen.textMuted,
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: screen.error,
    marginTop: 12,
    lineHeight: 22,
  },
  stateIcon: {
    opacity: 0.85,
  },
  retryButton: {
    marginTop: 22,
    paddingHorizontal: 28,
    paddingVertical: 12,
    backgroundColor: screen.primary,
    borderRadius: 12,
  },
  retryButtonPressed: {
    opacity: 0.9,
  },
  retryLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  emptyInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 48,
    minHeight: 280,
  },
  emptyTitle: {
    marginTop: 12,
    color: screen.text,
    textAlign: 'center',
  },
  emptySubtitle: {
    marginTop: 8,
    color: screen.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
});
