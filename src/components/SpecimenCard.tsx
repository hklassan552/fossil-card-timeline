import React, {memo, useEffect, useRef} from 'react';
import {Animated, Easing, Image, StyleSheet, Text, View} from 'react-native';

import assets, {spriteFor} from '../assets';
import {
  CARD_H,
  CARD_W,
  CURRENT_CARD_H,
  CURRENT_CARD_W,
  T,
} from '../constants/config';
import theme from '../constants/theme';
import type {DateFormat} from '../constants/config';
import {eraTick} from '../game/decks';
import {UNKNOWN_DATE, formatYear} from '../utils/formatYear';
import DoubleRule from './DoubleRule';

type Props = {
  /** Primitives only, so memo() actually helps inside the rail. */
  cardId: number;
  title: string;
  year: number;
  revealed: boolean;
  variant: 'placed' | 'current';
  dateFormat: DateFormat;
  fontScale?: number;
};

/**
 * The specimen label — the single card surface, used on the rail and as the
 * card in hand. Sprites are plain transparent PNGs laid over the paper, with
 * no circular mask and no oversize hack (rule #7).
 */
export const SpecimenCard = memo(function SpecimenCard({
  cardId,
  title,
  year,
  revealed,
  variant,
  dateFormat,
  fontScale = 1,
}: Props) {
  const current = variant === 'current';

  // Mount animation: a newly spliced card glides in, so the player watches the
  // timeline absorb it. Transform + opacity only.
  const enter = useRef(new Animated.Value(current ? 1 : 0)).current;
  const stamp = useRef(
    new Animated.Value(current || !revealed ? 1 : 0),
  ).current;

  useEffect(() => {
    if (current) return;
    Animated.timing(enter, {
      toValue: 1,
      duration: T.wrongGlide,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
    Animated.timing(stamp, {
      toValue: 1,
      duration: T.stamp,
      delay: 120,
      easing: Easing.out(Easing.back(1.4)),
      useNativeDriver: true,
    }).start();
  }, [current, enter, stamp]);

  const sprite = assets[spriteFor(cardId)];
  const dateText = revealed ? formatYear(year, dateFormat) : UNKNOWN_DATE;

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        current ? styles.current : styles.placed,
        {
          opacity: enter,
          transform: [
            {
              translateY: enter.interpolate({
                inputRange: [0, 1],
                outputRange: [14, 0],
              }),
            },
          ],
        },
      ]}>
      <DoubleRule
        inset={4}
        radius={theme.radius.xs}
        color={current ? 'rgba(236,229,216,0.28)' : theme.colors.borderSoft}
      />

      <Image source={sprite} style={styles.sprite} resizeMode="contain" />

      <Text
        numberOfLines={2}
        style={[
          styles.title,
          {
            color: current ? theme.colors.onDark : theme.colors.text,
            fontSize: (current ? 13 : 12) * fontScale,
            lineHeight: (current ? 17 : 15) * fontScale,
          },
        ]}>
        {title}
      </Text>

      <View
        style={[
          styles.rule,
          {
            backgroundColor: current
              ? theme.colors.accent
              : theme.colors.accent,
          },
        ]}
      />

      <Animated.Text
        numberOfLines={1}
        style={[
          styles.date,
          {
            color: current ? theme.colors.onDark : theme.colors.primary,
            opacity: stamp,
            transform: [
              {
                scale: stamp.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1.5, 1],
                }),
              },
            ],
          },
        ]}>
        {dateText}
      </Animated.Text>

      {revealed ? (
        <Text numberOfLines={1} style={styles.era}>
          {eraTick(year)}
        </Text>
      ) : (
        <Text numberOfLines={1} style={[styles.era, styles.eraOnDark]}>
          UNDATED
        </Text>
      )}
    </Animated.View>
  );
});

const base = {
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  paddingHorizontal: 10,
  paddingVertical: 8,
};

const styles = StyleSheet.create({
  placed: {
    ...base,
    width: CARD_W,
    height: CARD_H,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  current: {
    ...base,
    width: CURRENT_CARD_W,
    height: CURRENT_CARD_H,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.primaryDeep,
  },
  sprite: {
    width: 34,
    height: 34,
    opacity: 0.88,
  },
  title: {
    fontFamily: 'serif',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 2,
  },
  rule: {
    width: 36,
    height: 1,
    marginVertical: 4,
    opacity: 0.8,
  },
  date: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.6,
    fontVariant: ['tabular-nums'],
  },
  era: {
    ...theme.typography.captionXs,
    fontSize: 9,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  eraOnDark: {
    color: 'rgba(236,229,216,0.55)',
  },
});

export default SpecimenCard;
