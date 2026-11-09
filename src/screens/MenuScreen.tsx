import React, {useCallback, useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Image,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  BarChart3,
  BookOpen,
  Hourglass,
  Settings,
  Trophy,
  Users,
} from 'lucide-react-native';

import assets from '../assets';
import {FOSSILS_PER_ROUND, T} from '../constants/config';
import theme from '../constants/theme';
import {DECKS, getDeck, type Deck, type DeckId} from '../game/decks';
import type {Bests, Lifetime} from '../game/scoring';
import {bestLengthFor} from '../game/scoring';
import DeckChip, {CHIP_H} from '../components/DeckChip';
import DoubleRule from '../components/DoubleRule';
import FossilLives from '../components/FossilLives';
import GhostButton from '../components/GhostButton';
import IconPlate from '../components/IconPlate';
import PrimaryButton from '../components/PrimaryButton';
import ScreenFrame from '../components/ScreenFrame';
import ScreenHeader from '../components/ScreenHeader';
import StatCard from '../components/StatCard';

type Props = {
  deckId: DeckId;
  bests: Bests;
  lifetime: Lifetime;
  onSelectDeck: (deckId: DeckId) => void;
  onPlay: () => void;
  onArchive: () => void;
  onEraStats: () => void;
  onPassPlay: () => void;
  onSettings: () => void;
  onHowTo: () => void;
  onSources: () => void;
};

/** M3 Bento-Hub: a hero START tile, a deck rail, then stats and secondaries. */
export function MenuScreen({
  deckId,
  bests,
  lifetime,
  onSelectDeck,
  onPlay,
  onArchive,
  onEraStats,
  onPassPlay,
  onSettings,
  onHowTo,
  onSources,
}: Props) {
  const deck = getDeck(deckId);
  const best = bestLengthFor(bests, deckId);
  const seen = lifetime.seenIds.length;

  const tileSlide = useRef(new Animated.Value(0)).current;
  const statsFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(tileSlide, {
      toValue: 1,
      tension: theme.animation.card.tension,
      friction: theme.animation.card.friction,
      useNativeDriver: true,
    }).start();
    Animated.timing(statsFade, {
      toValue: 1,
      duration: T.elementFade,
      delay: 120,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [tileSlide, statsFade]);

  // Hoisted once for the whole rail, not rebuilt per item (list-perf rule 2.2).
  const renderDeck = useCallback(
    ({item, index}: ListRenderItemInfo<Deck>) => (
      <DeckChip
        deckId={item.id}
        name={item.name}
        span={item.span}
        best={bestLengthFor(bests, item.id)}
        active={item.id === deckId}
        index={index}
        onPress={onSelectDeck}
      />
    ),
    [bests, deckId, onSelectDeck],
  );

  const showStats = best > 0 && seen > 0;

  return (
    <ScreenFrame variant="menu">
      <ScreenHeader
        title="DECK VAULT"
        subtitle="EIGHT THEMED DECKS"
        rightSlot={
          <IconPlate
            Icon={Settings}
            onPress={onSettings}
            accessibilityLabel="Settings"
          />
        }
      />

      <View style={styles.body}>
        {/* ---------------- hero bento cell ---------------- */}
        <Animated.View
          pointerEvents="box-none"
          style={[
            styles.tile,
            {
              transform: [
                {
                  translateY: tileSlide.interpolate({
                    inputRange: [0, 1],
                    outputRange: [18, 0],
                  }),
                },
              ],
            },
          ]}>
          <DoubleRule
            inset={6}
            radius={theme.radius.md}
            color="rgba(236,229,216,0.28)"
          />
          <Image
            source={assets.sprite1}
            style={styles.tileSprite}
            resizeMode="contain"
          />

          <Text numberOfLines={1} style={styles.tileDeck}>
            {deck.name}
          </Text>
          <Text numberOfLines={1} style={styles.tileSpan}>
            {deck.span}
          </Text>
          <View style={styles.tileRule} />

          <View style={styles.tileCta}>
            <PrimaryButton
              label="START TIMELINE"
              Icon={Hourglass}
              onPress={onPlay}
              height={56}
            />
          </View>
        </Animated.View>

        {/* ---------------- deck rail ---------------- */}
        <View style={styles.railWrap}>
          <FlatList
            data={DECKS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={keyExtractor}
            renderItem={renderDeck}
            ItemSeparatorComponent={Separator}
            contentContainerStyle={styles.railContent}
            initialNumToRender={4}
            windowSize={5}
          />
        </View>

        {/* ---------------- stats / fossil preview ---------------- */}
        <Animated.View
          pointerEvents="box-none"
          style={[styles.statsBlock, {opacity: statsFade}]}>
          {showStats ? (
            <View style={styles.statsRow}>
              <View style={styles.statSlot}>
                <StatCard
                  Icon={Trophy}
                  value={`${best}`}
                  label="BEST TIMELINE"
                  valueColor={theme.colors.accentDeep}
                />
              </View>
              <View style={styles.statSlot}>
                <StatCard
                  Icon={BookOpen}
                  value={`${seen}`}
                  label="CARDS SEEN"
                  valueColor={theme.colors.primary}
                />
              </View>
            </View>
          ) : null}

          <View style={styles.fossilRow}>
            <FossilLives
              total={FOSSILS_PER_ROUND}
              remaining={FOSSILS_PER_ROUND}
              size={14}
            />
            <Text style={styles.fossilCaption}>
              {`${FOSSILS_PER_ROUND} FOSSILS PER ROUND`}
            </Text>
          </View>
        </Animated.View>

        <View style={styles.spacer} />

        {/* ---------------- secondaries ---------------- */}
        <View style={styles.secondaryRow}>
          <View style={styles.secondarySlot}>
            <GhostButton
              label="FACT ARCHIVE"
              Icon={BookOpen}
              onPress={onArchive}
            />
          </View>
          <View style={styles.secondarySlot}>
            <GhostButton
              label="ERA STATS"
              Icon={BarChart3}
              onPress={onEraStats}
            />
          </View>
        </View>
        <View style={styles.secondaryWide}>
          <GhostButton
            label="PASS AND PLAY"
            Icon={Users}
            onPress={onPassPlay}
          />
        </View>

        {/* footer links — plain text, separated by a middle dot (rule #15-safe) */}
        <View style={styles.footerRow}>
          <Pressable
            onPress={onHowTo}
            hitSlop={LINK_HIT_SLOP}
            accessibilityRole="link"
            accessibilityLabel="How to play"
            style={styles.footerLink}>
            <Text style={styles.footerNote}>HOW TO PLAY</Text>
          </Pressable>
          <Text style={styles.footerDot}>·</Text>
          <Pressable
            onPress={onSources}
            hitSlop={LINK_HIT_SLOP}
            accessibilityRole="link"
            accessibilityLabel="Sources and date conventions"
            style={styles.footerLink}>
            <Text style={styles.footerNote}>SOURCES</Text>
          </Pressable>
        </View>
      </View>
    </ScreenFrame>
  );
}

const LINK_HIT_SLOP = {top: 8, bottom: 8, left: 8, right: 8};

const keyExtractor = (item: Deck) => item.id;
const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  tile: {
    height: 168,
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 14,
    paddingBottom: 14,
    justifyContent: 'flex-end',
  },
  tileSprite: {
    position: 'absolute',
    right: 14,
    bottom: 14,
    width: 72,
    height: 72,
    opacity: 0.9,
  },
  tileDeck: {
    fontFamily: 'serif',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: theme.colors.onDark,
  },
  tileSpan: {
    ...theme.typography.captionXs,
    color: 'rgba(236,229,216,0.70)',
    marginTop: 3,
  },
  tileRule: {
    width: 48,
    height: 1,
    backgroundColor: theme.colors.accent,
    marginTop: 8,
    marginBottom: 10,
  },
  tileCta: {
    width: '100%',
  },
  railWrap: {
    height: CHIP_H,
    marginTop: theme.spacing.lg,
    marginHorizontal: -theme.spacing.lg,
  },
  railContent: {
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
  },
  separator: {
    width: 10,
  },
  statsBlock: {
    marginTop: theme.spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  statSlot: {
    flex: 1,
  },
  fossilRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  fossilCaption: {
    ...theme.typography.captionXs,
    color: theme.colors.textMuted,
  },
  spacer: {
    flex: 1,
    minHeight: theme.spacing.md,
  },
  secondaryRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  secondarySlot: {
    flex: 1,
  },
  secondaryWide: {
    marginTop: 10,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.md,
  },
  footerLink: {
    height: 44,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerDot: {
    ...theme.typography.captionXs,
    fontSize: 10,
    color: theme.colors.border,
  },
  footerNote: {
    ...theme.typography.captionXs,
    fontSize: 10,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
});

export default MenuScreen;
