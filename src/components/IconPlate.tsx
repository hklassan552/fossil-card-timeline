import React, {memo, useCallback, useRef} from 'react';
import {Animated, Pressable, StyleSheet} from 'react-native';
import type {LucideIcon} from 'lucide-react-native';

import theme from '../constants/theme';
import DoubleRule from './DoubleRule';

export type PlateTone = 'light' | 'dark';

type Props = {
  Icon: LucideIcon;
  onPress: () => void;
  accessibilityLabel: string;
  tone?: PlateTone;
  /** 44 is the minimum tappable plate; 48 for the larger bar buttons. */
  size?: 44 | 48;
  active?: boolean;
};

const HIT_SLOP = {top: 8, bottom: 8, left: 8, right: 8};

/**
 * The square tappable plate used for every header / bar icon.
 * Pressable is the PARENT and the Animated.View is its CHILD (rule #8) — the
 * reverse eats onPress on Android release builds.
 */
export const IconPlate = memo(function IconPlate({
  Icon,
  onPress,
  accessibilityLabel,
  tone = 'light',
  size = 44,
  active = false,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.94,
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
  const iconColor = active
    ? theme.colors.accent
    : dark
    ? theme.colors.onDark
    : theme.colors.primary;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      hitSlop={HIT_SLOP}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={[styles.press, {width: size, height: size}]}>
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.plate,
          {
            width: size,
            height: size,
            transform: [{scale}],
            backgroundColor: active
              ? theme.colors.accentSoft
              : dark
              ? 'rgba(236,229,216,0.08)'
              : theme.colors.surfaceAlt,
            borderColor: active
              ? theme.colors.accent
              : dark
              ? 'rgba(236,229,216,0.22)'
              : 'rgba(74,93,78,0.22)',
          },
        ]}>
        <DoubleRule
          inset={4}
          radius={theme.radius.xs}
          color={dark ? 'rgba(236,229,216,0.14)' : 'rgba(185,174,151,0.45)'}
        />
        <Icon size={22} color={iconColor} strokeWidth={2} />
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  press: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  plate: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
    borderWidth: 1,
  },
});

export default IconPlate;
