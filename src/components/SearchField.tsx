import React, {memo} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Search} from 'lucide-react-native';

import theme from '../constants/theme';
import DoubleRule from './DoubleRule';

type Props = {
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
};

export const SearchField = memo(function SearchField({
  value,
  onChange,
  placeholder,
}: Props) {
  return (
    <View style={styles.field}>
      <DoubleRule
        inset={4}
        radius={theme.radius.xs}
        color="rgba(185,174,151,0.40)"
      />
      <Search size={20} color={theme.colors.primary} strokeWidth={2} />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="characters"
        returnKeyType="search"
        accessibilityLabel={placeholder}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  field: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    gap: 10,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: 'rgba(255,255,255,0.60)',
  },
  input: {
    flex: 1,
    height: 48,
    padding: 0,
    fontSize: 13,
    letterSpacing: 1.2,
    fontWeight: '700',
    color: theme.colors.text,
  },
});

export default SearchField;
