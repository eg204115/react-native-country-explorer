import React, { memo } from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { searchBarHeaderStyles as styles } from './SearchBarHeader.styles';

export interface SearchBarHeaderProps {
  readonly value: string;
  readonly onChangeText: (text: string) => void;
  readonly placeholder?: string;
}

const DEFAULT_PLACEHOLDER = 'Search by name, capital, or region';

function SearchBarHeaderComponent({
  value,
  onChangeText,
  placeholder = DEFAULT_PLACEHOLDER,
}: SearchBarHeaderProps): React.JSX.Element {
  return (
    <View style={styles.searchWrap}>
      <Searchbar
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        style={styles.searchbar}
        inputStyle={styles.searchInput}
        elevation={0}
        rippleColor="transparent"
      />
    </View>
  );
}

export const SearchBarHeader = memo(SearchBarHeaderComponent);
