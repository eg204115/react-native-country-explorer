import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
} from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useThemePreference } from '../context/ThemePreferenceContext';
import {
  CountryListEmptyState,
  CountryListErrorState,
  CountryListItem,
  CountryListLoadingState,
  SearchBarHeader,
  useCountries,
  useCountrySearch,
} from '../features/countries';
import type { Country } from '../types/country';
import type { RootStackParamList } from '../types/navigation';

import { createCountryListScreenStyles } from './CountryListScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'CountryList'>;

const CountryListScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  const { palette, toggleColorScheme, colorScheme } = useThemePreference();
  const insets = useSafeAreaInsets();
  const { countries, loading, refreshing, error, load } = useCountries();
  const { searchQuery, setSearchQuery, filteredCountries } =
    useCountrySearch(countries);

  const styles = useMemo(
    () => createCountryListScreenStyles(palette),
    [palette],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={colorScheme === 'dark' ? 'weather-sunny' : 'weather-night'}
          iconColor={palette.primary}
          onPress={toggleColorScheme}
          accessibilityLabel={
            colorScheme === 'dark'
              ? 'Switch to light mode'
              : 'Switch to dark mode'
          }
        />
      ),
    });
  }, [navigation, toggleColorScheme, colorScheme, palette.primary]);

  const listBottomPad = 16 + insets.bottom;

  const onRefresh = useCallback(() => {
    void load('refresh');
  }, [load]);

  const onRetry = useCallback(() => {
    void load('retry');
  }, [load]);

  const handleCountryPress = useCallback(
    (country: Country) => {
      navigation.navigate('CountryDetails', {
        cca3: country.cca3,
        countryName: country.name,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: Country }) => (
      <CountryListItem country={item} onPress={handleCountryPress} />
    ),
    [handleCountryPress],
  );

  const emptyVariant = useMemo(() => {
    if (searchQuery.trim() && countries.length > 0) {
      return 'no-matches' as const;
    }
    return 'empty-data' as const;
  }, [searchQuery, countries.length]);

  if (loading && countries.length === 0) {
    return (
      <View style={styles.screenFill}>
        <CountryListLoadingState primaryColor={theme.colors.primary} />
      </View>
    );
  }

  if (error && countries.length === 0) {
    return (
      <View style={styles.screenFill}>
        <CountryListErrorState message={error} onRetry={onRetry} />
      </View>
    );
  }

  return (
    <View style={styles.screenFill}>
      <SearchBarHeader value={searchQuery} onChangeText={setSearchQuery} />
      <FlatList
        style={styles.listRoot}
        data={filteredCountries}
        keyExtractor={(item) => item.cca3}
        renderItem={renderItem}
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
        ListEmptyComponent={<CountryListEmptyState variant={emptyVariant} />}
      />
    </View>
  );
};

export default CountryListScreen;
