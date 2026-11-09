import React, {memo, useCallback, useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {T} from '../constants/config';
import theme from '../constants/theme';
import type {DeckId} from '../game/decks';
import DoubleRule from './DoubleRule';

type Props = {
  /** Primitives only, so memo() holds inside the deck rail. */
  deckId: DeckId;
  name: string;
  span: string;
  best: number;
  active: boolean;
  /** Position in the rail — drives the 60ms stagger on mount. */
  index: number;
  onPress: (deckId: DeckId) => void;
};

const HIT_SLOP = {top: 8, bottom: 8, left: 8, right: 8};
export const CHIP_W = 128;
export const CHIP_H = 88;

export const DeckChip = memo(function DeckChip({
  deckId,
  name,
  span,
  best,
  active,
  index,
  onPress,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const enter = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(enter, {
      toValue: 1,
      duration: T.elementFade,
      delay: index * T.deckStagger,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [enter, index]);

  const handlePress = useCallback(() => {
    // selection pulse 1 -> 1.04 -> 1
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1.04,
        tension: theme.animation.card.tension,
        friction: theme.animation.card.friction,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        tension: theme.animation.card.tension,
        friction: theme.animation.card.friction,
        useNativeDriver: true,
      }),
    ]).start();
    onPress(deckId);
  }, [deckId, onPress, scale]);

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

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      hitSlop={HIT_SLOP}
      accessibilityRole="button"
      accessibilityState={ACCESSIBILITY_STATE(active)}
      accessibilityLabel={`${name} deck`}
      style={styles.press}>
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.chip,
          {
            opacity: enter,
            transform: [
              {scale},
              {
                translateY: enter.interpolate({
                  inputRange: [0, 1],
                  outputRange: [10, 0],
                }),
              },
            ],
            backgroundColor: active
              ? theme.colors.primarySoft
              : theme.colors.surfaceAlt,
            borderColor: active
              ? theme.colors.primary
              : 'rgba(185,174,151,0.55)',
            borderWidth: active ? 2 : 1,
          },
        ]}>
        <DoubleRule
          inset={4}
          radius={theme.radius.xs}
          color={active ? 'rgba(74,93,78,0.25)' : 'rgba(185,174,151,0.35)'}
        />
        <Text numberOfLines={2} style={styles.name}>
          {name}
        </Text>
        <Text numberOfLines={1} style={styles.span}>
          {span}
        </Text>
        <View style={styles.footer}>
          {best > 0 ? (
            <Text style={styles.best}>{`BEST ${best}`}</Text>
          ) : (
            <Text style={styles.fresh}>NEW</Text>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
});

const ACCESSIBILITY_STATE = (selected: boolean) => ({selected});

const styles = StyleSheet.create({
  press: {
    width: CHIP_W,
    height: CHIP_H,
  },
  chip: {
    width: CHIP_W,
    height: CHIP_H,
    borderRadius: theme.radius.md,
    paddingHorizontal: 10,
    paddingVertical: 9,
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: 'serif',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '700',
    color: theme.colors.text,
  },
  span: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.1,
    color: theme.colors.textMuted,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  best: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: theme.colors.accentDeep,
    fontVariant: ['tabular-nums'],
  },
  fresh: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: theme.colors.primary,
  },
});

export default DeckChip;
