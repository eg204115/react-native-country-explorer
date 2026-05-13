import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { fetchCountryDetail } from '../api/services/countryService';
import { formatPopulation, mapUnknownToErrorMessage } from '../features/countries';
import { screen } from '../theme/screen';
import type { CountryDetail } from '../types/countryDetail';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CountryDetails'>;

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

const SectionCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={styles.sectionCard}>
    <Text variant="titleMedium" style={styles.sectionTitle}>
      {title}
    </Text>
    {children}
  </View>
);

const CountryDetailsScreen = ({ navigation, route }: Props) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
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
    } catch (caught: unknown) {
      setCountry(null);
      setError(mapUnknownToErrorMessage(caught));
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

  const scrollBottomPad = 24 + insets.bottom;

  if (loading && !country) {
    return (
      <View style={[styles.centered, styles.screenFill]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text variant="bodyLarge" style={styles.hint}>
          Loading details…
        </Text>
      </View>
    );
  }

  if (error || !country) {
    return (
      <View style={[styles.centered, styles.screenFill]}>
        <MaterialCommunityIcons
          name="map-marker-alert-outline"
          size={48}
          color={screen.textMuted}
          style={styles.stateIcon}
        />
        <Text variant="bodyLarge" style={styles.errorText}>
          {error ?? 'Something went wrong.'}
        </Text>
        <Pressable
          onPress={() => void loadDetail()}
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
    <ScrollView
      style={styles.scrollRoot}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingBottom: scrollBottomPad },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroCard}>
        <Image
          source={{ uri: country.flagPng }}
          style={styles.flag}
          accessibilityLabel={
            country.flagAlt ?? `Flag of ${country.commonName}`
          }
          resizeMode="contain"
        />
        <Text variant="headlineSmall" style={styles.commonTitle}>
          {country.commonName}
        </Text>
        <Text variant="bodyLarge" style={styles.officialName}>
          {country.officialName}
        </Text>
        <View style={styles.codeChip}>
          <Text variant="labelMedium" style={styles.codeChipText}>
            {country.cca3}
          </Text>
        </View>
      </View>

      <SectionCard title="Overview">
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
      </SectionCard>

      <SectionCard title="People & economy">
        <DetailRow label="Languages" value={languagesText} />
        <DetailRow label="Currencies" value={currenciesText} />
        <DetailRow
          label="Calling code"
          value={country.callingCode ?? '—'}
        />
        <DetailRow label="Top-level domains" value={tldText} />
      </SectionCard>

      <SectionCard title="Geography">
        <DetailRow label="Coordinates" value={coordsText} />
        <DetailRow label="Time zones" value={timezonesText} />
        <DetailRow label="Border countries (codes)" value={bordersText} />
      </SectionCard>

      {(country.googleMapsUrl || country.openStreetMapsUrl) && (
        <SectionCard title="Maps">
          {country.googleMapsUrl ? (
            <Pressable
              onPress={() => openUrl(country.googleMapsUrl!)}
              style={({ pressed }) => [
                styles.linkRow,
                pressed && styles.linkRowPressed,
              ]}
              android_ripple={{ color: '#2563EB18' }}
            >
              <MaterialCommunityIcons
                name="map-search-outline"
                size={22}
                color={screen.primary}
                style={styles.linkIcon}
              />
              <Text variant="bodyLarge" style={styles.linkText}>
                Google Maps
              </Text>
              <MaterialCommunityIcons
                name="open-in-new"
                size={18}
                color={screen.textMuted}
                style={styles.linkTrailing}
              />
            </Pressable>
          ) : null}
          {country.openStreetMapsUrl ? (
            <Pressable
              onPress={() => openUrl(country.openStreetMapsUrl!)}
              style={({ pressed }) => [
                styles.linkRow,
                pressed && styles.linkRowPressed,
              ]}
              android_ripple={{ color: '#2563EB18' }}
            >
              <MaterialCommunityIcons
                name="map-outline"
                size={22}
                color={screen.primary}
                style={styles.linkIcon}
              />
              <Text variant="bodyLarge" style={styles.linkText}>
                OpenStreetMap
              </Text>
              <MaterialCommunityIcons
                name="open-in-new"
                size={18}
                color={screen.textMuted}
                style={styles.linkTrailing}
              />
            </Pressable>
          ) : null}
        </SectionCard>
      )}
    </ScrollView>
  );
};

export default CountryDetailsScreen;

const cardShadow = Platform.select({
  ios: {
    shadowColor: screen.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },
  android: { elevation: 3 },
  default: {},
});

const styles = StyleSheet.create({
  screenFill: {
    flex: 1,
    backgroundColor: screen.bg,
  },
  scrollRoot: {
    flex: 1,
    backgroundColor: screen.bg,
  },
  scrollContent: {
    paddingTop: 8,
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
  heroCard: {
    marginHorizontal: 16,
    marginBottom: 4,
    padding: 18,
    paddingTop: 16,
    alignItems: 'center',
    backgroundColor: screen.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: screen.cardBorder,
    ...cardShadow,
  },
  flag: {
    width: '100%',
    maxWidth: 300,
    height: 180,
    marginBottom: 14,
    backgroundColor: screen.divider,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: screen.cardBorder,
  },
  commonTitle: {
    textAlign: 'center',
    color: screen.text,
    fontWeight: '700',
  },
  officialName: {
    textAlign: 'center',
    color: screen.textSubtle,
    marginTop: 8,
    lineHeight: 24,
  },
  codeChip: {
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#DBEAFE',
  },
  codeChipText: {
    color: '#1E40AF',
    fontWeight: '600',
    letterSpacing: 1,
  },
  sectionCard: {
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: screen.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: screen.cardBorder,
    ...cardShadow,
  },
  sectionTitle: {
    marginBottom: 14,
    color: screen.text,
    fontWeight: '600',
  },
  detailBlock: {
    marginBottom: 14,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: screen.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  detailValue: {
    color: screen.text,
    lineHeight: 24,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginBottom: 4,
    borderRadius: 12,
  },
  linkRowPressed: {
    backgroundColor: '#F1F5F9',
  },
  linkIcon: {
    marginRight: 12,
  },
  linkText: {
    flex: 1,
    color: screen.primary,
    fontWeight: '600',
  },
  linkTrailing: {
    marginLeft: 8,
  },
});
