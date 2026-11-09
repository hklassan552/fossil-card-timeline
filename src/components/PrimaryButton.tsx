import React, {memo, useCallback, useRef} from 'react';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type {LucideIcon} from 'lucide-react-native';

import theme from '../constants/theme';
import DoubleRule from './DoubleRule';

type Props = {
  label: string;
  onPress: () => void;
  Icon?: LucideIcon;
  /** 56 on the menu tile, 60 on the round summary. */
  height?: 56 | 60;
  width?: number | '100%';
  disabled?: boolean;
};

const HIT_SLOP = {top: 8, bottom: 8, left: 8, right: 8};

/** Rule #20 — icon is ALWAYS 24x24 and the label's lineHeight matches it. */
const ICON_SIZE = 24;

export const PrimaryButton = memo(function PrimaryButton({
  label,
  onPress,
  Icon,
  height = 56,
  width = '100%',
  disabled = false,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.96,
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

  return (
    <Pressable
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      disabled={disabled}
      hitSlop={HIT_SLOP}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[styles.press, {width, height}]}>
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.animWrap,
          {height, transform: [{scale}], opacity: disabled ? 0.5 : 1},
        ]}>
        <LinearGradient
          colors={theme.gradients.cta}
          start={H_START}
          end={H_END}
          style={[styles.grad, {height}]}>
          <DoubleRule
            inset={5}
            radius={theme.radius.sm}
            color="rgba(34,37,31,0.18)"
          />
          <View style={styles.row}>
            {Icon ? (
              <Icon
                size={ICON_SIZE}
                color={theme.colors.text}
                strokeWidth={2.2}
              />
            ) : null}
            <Text style={styles.label}>{label}</Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
});

const H_START = {x: 0, y: 0};
const H_END = {x: 1, y: 0};

const styles = StyleSheet.create({
  press: {
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  animWrap: {
    width: '100%',
    borderRadius: theme.radius.lg,
    ...theme.shadows.cta,
  },
  grad: {
    width: '100%',
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  label: {
    ...theme.typography.button,
    lineHeight: ICON_SIZE,
    color: theme.colors.text,
  },
});

export default PrimaryButton;
