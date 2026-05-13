import React, { useCallback, useEffect } from 'react';
import { Linking } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  CountryDetailErrorState,
  CountryDetailLoadingState,
  CountryDetailsBody,
  useCountryDetail,
} from '../features/countries';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CountryDetails'>;

const CountryDetailsScreen = ({ navigation, route }: Props) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { cca3, countryName } = route.params;

  const { country, loading, error, reload } = useCountryDetail(cca3);

  useEffect(() => {
    if (country) {
      navigation.setOptions({ title: country.commonName });
    }
  }, [country, navigation]);

  useEffect(() => {
    if (error && !country) {
      navigation.setOptions({ title: countryName });
    }
  }, [error, country, countryName, navigation]);

  const onRetry = useCallback(() => {
    void reload();
  }, [reload]);

  const openUrl = useCallback((url: string) => {
    void Linking.openURL(url);
  }, []);

  const scrollBottomPad = 24 + insets.bottom;

  if (loading && !country) {
    return <CountryDetailLoadingState primaryColor={theme.colors.primary} />;
  }

  if (error || !country) {
    return (
      <CountryDetailErrorState
        message={error ?? 'Something went wrong.'}
        onRetry={onRetry}
      />
    );
  }

  return (
    <CountryDetailsBody
      country={country}
      paddingBottom={scrollBottomPad}
      onOpenUrl={openUrl}
    />
  );
};

export default CountryDetailsScreen;
