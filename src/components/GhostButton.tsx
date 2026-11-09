import React, {memo, useCallback, useRef} from 'react';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import type {LucideIcon} from 'lucide-react-native';

import theme from '../constants/theme';
import DoubleRule from './DoubleRule';

type Props = {
  label: string;
  onPress: () => void;
  Icon?: LucideIcon;
  tone?: 'light' | 'dark';
  width?: number | '100%';
  height?: 48;
};

const HIT_SLOP = {top: 8, bottom: 8, left: 8, right: 8};

/** Same 24px icon size as PrimaryButton — never mix sizes on one screen. */
const ICON_SIZE = 24;

export const GhostButton = memo(function GhostButton({
  label,
  onPress,
  Icon,
  tone = 'light',
  width = '100%',
  height = 48,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.97,
      tension: theme.animation.press.tension,
      friction: theme.animation.press.friction,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  const pressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      tension: theme.animation.press.tension,
      friction: theme.animation.press.friction,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  const dark = tone === 'dark';

  return (
    <Pressable
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      hitSlop={HIT_SLOP}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[styles.press, {width, height}]}>
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.plate,
          {
            height,
            transform: [{scale}],
            backgroundColor: dark
              ? 'rgba(236,229,216,0.08)'
              : theme.colors.surfaceAlt,
            borderColor: dark
              ? 'rgba(236,229,216,0.22)'
              : 'rgba(74,93,78,0.22)',
          },
        ]}>
        <DoubleRule
          inset={4}
          radius={theme.radius.xs}
          color={dark ? 'rgba(236,229,216,0.12)' : 'rgba(185,174,151,0.40)'}
        />
        <View style={styles.row}>
          {Icon ? (
            <Icon
              size={ICON_SIZE}
              color={dark ? theme.colors.onDark : theme.colors.primary}
              strokeWidth={2}
            />
          ) : null}
          <Text
            numberOfLines={1}
            style={[
              styles.label,
              {color: dark ? theme.colors.onDark : theme.colors.primary},
            ]}>
            {label}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  press: {
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  plate: {
    width: '100%',
    borderRadius: theme.radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: theme.spacing.md,
  },
  label: {
    ...theme.typography.caption,
    lineHeight: ICON_SIZE,
  },
});

export default GhostButton;
