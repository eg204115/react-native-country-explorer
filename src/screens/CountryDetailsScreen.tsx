import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { fetchCountryDetail } from '../api/services/countryService';
import type { CountryDetail } from '../types/countryDetail';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CountryDetails'>;

const formatPopulation = (n: number): string =>
  new Intl.NumberFormat().format(n);

const formatArea = (km2: number): string =>
  `${new Intl.NumberFormat().format(Math.round(km2))} km²`;

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <View style={styles.detailBlock}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text variant="bodyLarge" style={styles.detailValue}>
      {value}
    </Text>
  </View>
);

const CountryDetailsScreen = ({ navigation, route }: Props) => {
  const { cca3, countryName } = route.params;

  const [country, setCountry] = useState<CountryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDetail = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCountryDetail(cca3);
      setCountry(data);
      navigation.setOptions({ title: data.commonName });
    } catch (e) {
      setCountry(null);
      setError(
        e instanceof Error ? e.message : 'Could not load country details.',
      );
      navigation.setOptions({ title: countryName });
    } finally {
      setLoading(false);
    }
  }, [cca3, countryName, navigation]);

  useEffect(() => {
    void loadDetail();
  }, [loadDetail]);

  const openUrl = useCallback((url: string) => {
    void Linking.openURL(url);
  }, []);

  if (loading && !country) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.hint}>Loading details…</Text>
      </View>
    );
  }

  if (error || !country) {
    return (
      <View style={styles.centered}>
        <Text variant="bodyLarge" style={styles.errorText}>
          {error ?? 'Something went wrong.'}
        </Text>
        <Pressable onPress={() => void loadDetail()} style={styles.retryButton}>
          <Text variant="labelLarge" style={styles.retryLabel}>
            Retry
          </Text>
        </Pressable>
      </View>
    );
  }

  const capitalsText =
    country.capitals.length > 0
      ? country.capitals.join(', ')
      : '—';

  const languagesText =
    country.languageNames.length > 0
      ? country.languageNames.join(', ')
      : '—';

  const currenciesText =
    country.currencyLabels.length > 0
      ? country.currencyLabels.join(', ')
      : '—';

  const tldText =
    country.topLevelDomains.length > 0
      ? country.topLevelDomains.join(', ')
      : '—';

  const bordersText =
    country.borderCodes.length > 0
      ? country.borderCodes.join(', ')
      : 'None';

  const coordsText =
    country.latitude != null && country.longitude != null
      ? `${country.latitude.toFixed(2)}, ${country.longitude.toFixed(2)}`
      : '—';

  const timezonesText =
    country.timezones.length > 0
      ? country.timezones.join('\n')
      : '—';

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.hero}>
        <Image
          source={{ uri: country.flagPng }}
          style={styles.flag}
          accessibilityLabel={country.flagAlt ?? `Flag of ${country.commonName}`}
          resizeMode="contain"
        />
        <Text variant="headlineSmall" style={styles.commonTitle}>
          {country.commonName}
        </Text>
        <Text variant="titleMedium" style={styles.officialName}>
          {country.officialName}
        </Text>
        <Text variant="labelLarge" style={styles.codeChip}>
          {country.cca3}
        </Text>
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Overview
        </Text>
        <DetailRow
          label="Population"
          value={formatPopulation(country.population)}
        />
        <DetailRow label="Area" value={formatArea(country.areaKm2)} />
        <DetailRow label="Capital" value={capitalsText} />
        <DetailRow label="Region" value={country.region} />
        {country.subregion ? (
          <DetailRow label="Subregion" value={country.subregion} />
        ) : null}
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          People & economy
        </Text>
        <DetailRow label="Languages" value={languagesText} />
        <DetailRow label="Currencies" value={currenciesText} />
        <DetailRow
          label="Calling code"
          value={country.callingCode ?? '—'}
        />
        <DetailRow label="Top-level domains" value={tldText} />
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Geography
        </Text>
        <DetailRow label="Coordinates" value={coordsText} />
        <DetailRow label="Time zones" value={timezonesText} />
        <DetailRow label="Border countries (codes)" value={bordersText} />
      </View>

      {(country.googleMapsUrl || country.openStreetMapsUrl) && (
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Maps
          </Text>
          {country.googleMapsUrl ? (
            <Pressable
              onPress={() => openUrl(country.googleMapsUrl!)}
              style={styles.linkRow}
            >
              <Text variant="bodyLarge" style={styles.link}>
                Open in Google Maps
              </Text>
            </Pressable>
          ) : null}
          {country.openStreetMapsUrl ? (
            <Pressable
              onPress={() => openUrl(country.openStreetMapsUrl!)}
              style={styles.linkRow}
            >
              <Text variant="bodyLarge" style={styles.link}>
                Open in OpenStreetMap
              </Text>
            </Pressable>
          ) : null}
        </View>
      )}
    </ScrollView>
  );
};

export default CountryDetailsScreen;

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 32,
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
  hero: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  flag: {
    width: '100%',
    maxWidth: 320,
    height: 200,
    marginBottom: 16,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
  },
  commonTitle: {
    textAlign: 'center',
  },
  officialName: {
    textAlign: 'center',
    color: '#475569',
    marginTop: 8,
    fontWeight: '400',
  },
  codeChip: {
    marginTop: 12,
    color: '#2563EB',
    letterSpacing: 1,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E2E8F0',
    paddingTop: 20,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#0F172A',
  },
  detailBlock: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  detailValue: {
    color: '#1E293B',
  },
  linkRow: {
    paddingVertical: 8,
  },
  link: {
    color: '#2563EB',
    textDecorationLine: 'underline',
  },
});
