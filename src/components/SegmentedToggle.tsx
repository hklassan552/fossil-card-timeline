import React, {memo, useCallback} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import theme from '../constants/theme';

type Props = {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  /** Every segment is this tall; 48 keeps it above the 44px touch minimum. */
  height?: 48;
};

const HIT_SLOP = {top: 8, bottom: 8, left: 8, right: 8};

export const SegmentedToggle = memo(function SegmentedToggle({
  options,
  value,
  onChange,
  height = 48,
}: Props) {
  return (
    <View style={styles.row}>
      {options.map(option => (
        <Segment
          key={option}
          option={option}
          active={option === value}
          height={height}
          onChange={onChange}
        />
      ))}
    </View>
  );
});

const Segment = memo(function Segment({
  option,
  active,
  height,
  onChange,
}: {
  option: string;
  active: boolean;
  height: number;
  onChange: (value: string) => void;
}) {
  const handlePress = useCallback(() => onChange(option), [onChange, option]);

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={HIT_SLOP}
      accessibilityRole="button"
      accessibilityState={{selected: active}}
      accessibilityLabel={option}
      style={[styles.segmentPress, {height}]}>
      <View
        style={[
          styles.segment,
          {
            height,
            backgroundColor: active
              ? theme.colors.primary
              : theme.colors.surfaceAlt,
            borderColor: active
              ? theme.colors.primary
              : 'rgba(185,174,151,0.55)',
          },
        ]}>
        <Text
          style={[
            styles.label,
            {color: active ? theme.colors.onDark : theme.colors.primary},
          ]}>
          {option}
        </Text>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  segmentPress: {
    flex: 1,
  },
  segment: {
    width: '100%',
    borderRadius: theme.radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...theme.typography.caption,
    lineHeight: 20,
  },
});

export default SegmentedToggle;
