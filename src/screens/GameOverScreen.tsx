import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import {BookOpen, Flame, Home, RotateCcw, Target} from 'lucide-react-native';

import {MISSES_SHOWN, T} from '../constants/config';
import theme from '../constants/theme';
import {getDeck} from '../game/decks';
import {
  accuracy,
  closestMisses,
  type Bests,
  type RoundResult,
} from '../game/scoring';
import {useSettings} from '../hooks/useAppSettings';
import {formatYear} from '../utils/formatYear';
import DoubleRule from '../components/DoubleRule';
import GhostButton from '../components/GhostButton';
import PrimaryButton from '../components/PrimaryButton';
import ScreenFrame from '../components/ScreenFrame';
import ScreenHeader from '../components/ScreenHeader';
import StatCard from '../components/StatCard';

type Props = {
  result: RoundResult;
  /** Bests as they stood BEFORE this round was folded in. */
  previousBest: number;
  bests: Bests;
  onPlayAgain: () => void;
  onMenu: () => void;
  onArchive: () => void;
};

export function GameOverScreen({
  result,
  previousBest,
  onPlayAgain,
  onMenu,
  onArchive,
}: Props) {
  const {dateFormat} = useSettings();
  const deck = getDeck(result.deckId);

  const pct = accuracy(result.score, result.attempted);
  const misses = closestMisses(result.misses, MISSES_SHOWN);
  const newBest = result.score > previousBest && result.score > 0;

  // Count-up runs on a listener, not the native driver — it drives text.
  const [shown, setShown] = useState(0);
  const count = useRef(new Animated.Value(0)).current;
  const cta = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const id = count.addListener(({value}) => setShown(Math.round(value)));
    Animated.timing(count, {
      toValue: result.score,
      duration: T.countUp,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
    Animated.timing(cta, {
      toValue: 1,
      duration: T.elementFade,
      delay: T.countUp,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
    return () => count.removeListener(id);
  }, [count, cta, result.score]);

  const renderMiss = useCallback(
    (
      cardId: number,
      title: string,
      guessed: number | null,
      trueYear: number,
    ) => (
      <View key={cardId} style={styles.missRow}>
        <Text numberOfLines={1} style={styles.missTitle}>
          {title}
        </Text>
        <View style={styles.missDates}>
          <Text style={styles.missGuess}>
            {guessed === null
              ? 'YOU  --'
              : `YOU ${formatYear(guessed, dateFormat)}`}
          </Text>
          <Text style={styles.missDot}>·</Text>
          <Text style={styles.missTrue}>
            {formatYear(trueYear, dateFormat)}
          </Text>
        </View>
      </View>
    ),
    [dateFormat],
  );

  return (
    <ScreenFrame variant="dark">
      <ScreenHeader
        tone="dark"
        title="ROUND SUMMARY"
        subtitle={deck.name.toUpperCase()}
      />

      <View style={styles.body}>
        {/* heading, with the rules kept clear of the letters (rule #17) */}
        <View style={styles.headingBlock}>
          <View style={styles.headingRule} />
          <Text style={styles.heading}>ROUND COMPLETE</Text>
          <View style={styles.headingRule} />
        </View>

        <Text style={styles.scoreLabel}>CARDS PLACED</Text>
        <Text style={styles.score}>{shown}</Text>

        {newBest ? (
          <View style={styles.ribbon}>
            <Text style={styles.ribbonText}>NEW BEST</Text>
          </View>
        ) : null}

        {result.attempted > 0 ? (
          <View style={styles.statsRow}>
            <View style={styles.statSlot}>
              <StatCard
                tone="dark"
                Icon={Target}
                value={`${Math.round(pct)}%`}
                label="ACCURACY"
                valueColor={theme.colors.accent}
              />
            </View>
            <View style={styles.statSlot}>
              <StatCard
                tone="dark"
                Icon={Flame}
                value={`${result.bestStreak}`}
                label="BEST STREAK"
                valueColor={theme.colors.correct}
              />
            </View>
          </View>
        ) : null}

        {misses.length > 0 ? (
          <View style={styles.missPlate}>
            <DoubleRule
              inset={5}
              radius={theme.radius.xs}
              color="rgba(236,229,216,0.14)"
            />
            <Text style={styles.missHeading}>CLOSEST MISSES</Text>
            {misses.map(m =>
              renderMiss(m.cardId, m.title, m.guessedYear, m.trueYear),
            )}
          </View>
        ) : null}

        <View style={styles.spacer} />

        <Animated.View
          pointerEvents="box-none"
          style={[styles.ctaWrap, {opacity: cta}]}>
          <PrimaryButton
            label="PLAY AGAIN"
            Icon={RotateCcw}
            onPress={onPlayAgain}
            height={60}
          />
        </Animated.View>

        <View style={styles.secondary}>
          <GhostButton
            label="DECK VAULT"
            Icon={Home}
            tone="dark"
            onPress={onMenu}
          />
        </View>
        <View style={styles.tertiary}>
          <GhostButton
            label="FACT ARCHIVE"
            Icon={BookOpen}
            tone="dark"
            onPress={onArchive}
          />
        </View>
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    alignItems: 'center',
  },
  headingBlock: {
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'serif',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 2.4,
    color: theme.colors.onDark,
    textAlign: 'center',
    marginVertical: 12,
  },
  headingRule: {
    width: 64,
    height: 1,
    backgroundColor: theme.colors.accent,
    opacity: 0.8,
  },
  scoreLabel: {
    ...theme.typography.captionXs,
    color: theme.colors.onDarkMuted,
    marginTop: theme.spacing.md,
  },
  score: {
    fontSize: 56,
    lineHeight: 64,
    fontWeight: '700',
    letterSpacing: 2,
    color: theme.colors.accent,
    fontVariant: ['tabular-nums'],
  },
  ribbon: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.radius.xs,
    backgroundColor: theme.colors.accent,
    marginTop: 4,
  },
  ribbonText: {
    ...theme.typography.captionXs,
    letterSpacing: 2,
    color: theme.colors.text,
  },
  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    width: '100%',
    marginTop: theme.spacing.lg,
  },
  statSlot: {
    flex: 1,
  },
  missPlate: {
    width: '100%',
    marginTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: 'rgba(236,229,216,0.22)',
    backgroundColor: 'rgba(236,229,216,0.06)',
  },
  missHeading: {
    ...theme.typography.captionXs,
    color: theme.colors.onDarkMuted,
    marginBottom: theme.spacing.sm,
  },
  missRow: {
    height: 44,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(236,229,216,0.10)',
  },
  missTitle: {
    fontFamily: 'serif',
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.onDark,
  },
  missDates: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  missGuess: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: theme.colors.onDarkMuted,
    fontVariant: ['tabular-nums'],
  },
  missDot: {
    fontSize: 10,
    color: theme.colors.onDarkMuted,
  },
  missTrue: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: theme.colors.accent,
    fontVariant: ['tabular-nums'],
  },
  spacer: {
    flex: 1,
    minHeight: theme.spacing.md,
  },
  ctaWrap: {
    width: '100%',
  },
  secondary: {
    width: '100%',
    marginTop: theme.spacing.md,
  },
  tertiary: {
    width: '100%',
    marginTop: 10,
  },
});

export default GameOverScreen;
