import React, {memo, useEffect, useRef} from 'react';
import {Animated, Easing, Image, StyleSheet, Text, View} from 'react-native';

import assets, {spriteFor} from '../assets';
import {T} from '../constants/config';
import theme from '../constants/theme';
import type {DateFormat} from '../constants/config';
import type {Card} from '../game/decks';
import {ERA_LABEL} from '../game/decks';
import {formatYear} from '../utils/formatYear';
import DoubleRule from './DoubleRule';
import PrimaryButton from './PrimaryButton';

type Props = {
  visible: boolean;
  card: Card | null;
  correct: boolean;
  dateFormat: DateFormat;
  fontScale: number;
  onNext: () => void;
};

/**
 * Not a screen — a full-bleed overlay rendered inside GameScreen, so the rail
 * stays mounted behind it and the gap animation is not thrown away.
 */
export const CardRevealOverlay = memo(function CardRevealOverlay({
  visible,
  card,
  correct,
  dateFormat,
  fontScale,
  onNext,
}: Props) {
  const fade = useRef(new Animated.Value(0)).current;
  const stamp = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) {
      fade.setValue(0);
      stamp.setValue(0);
      return;
    }
    Animated.timing(fade, {
      toValue: 1,
      duration: T.elementFade,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
    Animated.timing(stamp, {
      toValue: 1,
      duration: T.stamp,
      delay: 100,
      easing: Easing.out(Easing.back(1.4)),
      useNativeDriver: true,
    }).start();
  }, [visible, fade, stamp]);

  if (!visible || !card) return null;

  const accentColor = correct ? theme.colors.accent : theme.colors.primary;

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[styles.scrim, {opacity: fade}]}>
      <View style={styles.plate}>
        <DoubleRule
          inset={5}
          radius={theme.radius.sm}
          color={theme.colors.borderSoft}
        />

        <Text style={[styles.verdict, {color: accentColor}]}>
          {correct ? 'CORRECT' : 'TRUE DATE'}
        </Text>
        <View style={[styles.rule, {backgroundColor: accentColor}]} />

        <Image
          source={assets[spriteFor(card.id)]}
          style={styles.sprite}
          resizeMode="contain"
        />

        <Text numberOfLines={2} style={styles.title}>
          {card.title}
        </Text>

        <Animated.Text
          style={[
            styles.date,
            {
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
          {formatYear(card.year, dateFormat)}
        </Animated.Text>

        <Text style={styles.era}>{ERA_LABEL[card.era]}</Text>

        {correct ? null : <Text style={styles.penalty}>MINUS 1 FOSSIL</Text>}

        <View style={styles.ruleThin} />

        <Text
          numberOfLines={6}
          style={[
            styles.fact,
            {fontSize: 14 * fontScale, lineHeight: 21 * fontScale},
          ]}>
          {card.fact}
        </Text>

        <View style={styles.cta}>
          <PrimaryButton label="NEXT CARD" onPress={onNext} height={56} />
        </View>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26,28,23,0.72)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  plate: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
    alignItems: 'center',
  },
  verdict: {
    ...theme.typography.caption,
    letterSpacing: 2.4,
  },
  rule: {
    width: 48,
    height: 1,
    marginTop: 10,
    marginBottom: 12,
  },
  ruleThin: {
    width: '70%',
    height: 1,
    backgroundColor: 'rgba(185,174,151,0.6)',
    marginTop: 14,
    marginBottom: 12,
  },
  sprite: {
    width: 56,
    height: 56,
    opacity: 0.9,
  },
  title: {
    fontFamily: 'serif',
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: 10,
  },
  date: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: theme.colors.primary,
    fontVariant: ['tabular-nums'],
    marginTop: 8,
  },
  era: {
    ...theme.typography.captionXs,
    color: theme.colors.textMuted,
    marginTop: 4,
  },
  penalty: {
    ...theme.typography.captionXs,
    color: theme.colors.accentDeep,
    marginTop: 8,
  },
  fact: {
    color: theme.colors.textMid,
    textAlign: 'center',
  },
  cta: {
    width: '100%',
    marginTop: theme.spacing.lg,
  },
});

export default CardRevealOverlay;
