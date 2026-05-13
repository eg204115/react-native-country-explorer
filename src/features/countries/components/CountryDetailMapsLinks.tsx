import React, { memo, useCallback, useMemo } from 'react';
import { Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';

import { useThemePreference } from '../../../context/ThemePreferenceContext';

import { createCountryDetailMapsLinksStyles } from './CountryDetailMapsLinks.styles';

export interface CountryDetailMapsLinksProps {
  readonly googleMapsUrl: string | null;
  readonly openStreetMapsUrl: string | null;
  readonly onOpenUrl: (url: string) => void;
}

function CountryDetailMapsLinksComponent({
  googleMapsUrl,
  openStreetMapsUrl,
  onOpenUrl,
}: CountryDetailMapsLinksProps): React.JSX.Element {
  const { palette } = useThemePreference();
  const styles = useMemo(
    () => createCountryDetailMapsLinksStyles(palette),
    [palette],
  );

  const rippleMaps = `${palette.primary}18`;

  const onPressGoogle = useCallback(() => {
    if (googleMapsUrl) {
      onOpenUrl(googleMapsUrl);
    }
  }, [googleMapsUrl, onOpenUrl]);

  const onPressOsm = useCallback(() => {
    if (openStreetMapsUrl) {
      onOpenUrl(openStreetMapsUrl);
    }
  }, [openStreetMapsUrl, onOpenUrl]);

  return (
    <>
      {googleMapsUrl ? (
        <Pressable
          onPress={onPressGoogle}
          style={({ pressed }) => [
            styles.linkRow,
            pressed && styles.linkRowPressed,
          ]}
          android_ripple={{ color: rippleMaps }}
        >
          <MaterialCommunityIcons
            name="map-search-outline"
            size={22}
            color={palette.primary}
            style={styles.linkIcon}
          />
          <Text variant="bodyLarge" style={styles.linkText}>
            Google Maps
          </Text>
          <MaterialCommunityIcons
            name="open-in-new"
            size={18}
            color={palette.textMuted}
            style={styles.linkTrailing}
          />
        </Pressable>
      ) : null}
      {openStreetMapsUrl ? (
        <Pressable
          onPress={onPressOsm}
          style={({ pressed }) => [
            styles.linkRow,
            pressed && styles.linkRowPressed,
          ]}
          android_ripple={{ color: rippleMaps }}
        >
          <MaterialCommunityIcons
            name="map-outline"
            size={22}
            color={palette.primary}
            style={styles.linkIcon}
          />
          <Text variant="bodyLarge" style={styles.linkText}>
            OpenStreetMap
          </Text>
          <MaterialCommunityIcons
            name="open-in-new"
            size={18}
            color={palette.textMuted}
            style={styles.linkTrailing}
          />
        </Pressable>
      ) : null}
    </>
  );
}

export const CountryDetailMapsLinks = memo(CountryDetailMapsLinksComponent);
