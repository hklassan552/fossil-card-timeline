import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ChevronLeft, Hand, HelpCircle, Pause, Play} from 'lucide-react-native';

import {
  CARD_W,
  CURRENT_CARD_BOTTOM,
  CURRENT_CARD_H,
  FLOATING_BAR_BOTTOM,
  FLOATING_BAR_H,
  FOSSILS_PER_ROUND,
  GAP_W,
  RAIL_PAD_H,
  SCREEN_W,
  T,
} from '../constants/config';
import theme from '../constants/theme';
import {getDeck, type DeckId} from '../game/decks';
import {formatYear} from '../utils/formatYear';
import type {RoundResult} from '../game/scoring';
import {useTimelineRound} from '../hooks/useTimelineRound';
import {useAutoScroll} from '../hooks/useAutoScroll';
import {useDragPlacement} from '../hooks/useDragPlacement';
import {useSettings} from '../hooks/useAppSettings';
import CardRevealOverlay from '../components/CardRevealOverlay';
import DoubleRule from '../components/DoubleRule';
import DraggableCard from '../components/DraggableCard';
import FossilLives from '../components/FossilLives';
import GhostButton from '../components/GhostButton';
import IconPlate from '../components/IconPlate';
import ScreenFrame from '../components/ScreenFrame';
import HandoffOverlay from '../components/HandoffOverlay';
import ScreenHeader from '../components/ScreenHeader';
import TimelineRail from '../components/TimelineRail';

type Props = {
  deckId: DeckId;
  onGameOver: (result: RoundResult, seenIds: number[]) => void;
  onBack: () => void;
  onHowTo: () => void;
  /** Pass-and-play only: one name per seat. A single name means solo play. */
  players?: readonly string[] | null;
};

/** G2 Floating Controls: the rail owns the canvas, the action bar floats. */
export function GameScreen({
  deckId,
  onGameOver,
  onBack,
  onHowTo,
  players = null,
}: Props) {
  const round = useTimelineRound(deckId);
  const {dateFormat, fontScale} = useSettings();
  const deck = getDeck(deckId);

  const [tapToPlace, setTapToPlace] = useState(true);
  const [handoff, setHandoff] = useState(false);

  const railRef = useRef<ScrollView>(null);
  const offsetRef = useRef(0);
  const maxOffsetRef = useRef(0);

  const {onFingerX, stop, scrollToOffset} = useAutoScroll({
    scrollRef: railRef,
    offsetRef,
    maxOffsetRef,
  });

  const {openGap, dragging, onDragStart, onDragMove, onDragEnd, onDragCancel} =
    useDragPlacement({
      gapCount: round.placed.length + 1,
      offsetRef,
      onFingerX,
      onStopAutoScroll: stop,
      onCommit: round.place,
    });

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      offsetRef.current = e.nativeEvent.contentOffset.x;
    },
    [],
  );

  const handleContentSize = useCallback((w: number) => {
    maxOffsetRef.current = Math.max(0, w - SCREEN_W);
  }, []);

  // --- round lifecycle -------------------------------------------------
  const resultRef = useRef(round.result);
  resultRef.current = round.result;
  const seenRef = useRef(round.seenIds);
  seenRef.current = round.seenIds;
  const overRef = useRef(onGameOver);
  overRef.current = onGameOver;

  const {phase, resolved, lastIndex, placed} = round;
  const placedCount = placed.length;

  // A wrong drop resolves after the glide, then input unlocks again.
  useEffect(() => {
    if (phase !== 'resolving') return;
    const timer = setTimeout(resolved, T.wrongGlide);
    return () => clearTimeout(timer);
  }, [phase, resolved]);

  // Let the rail fade before App swaps the screen (rule #12).
  useEffect(() => {
    if (phase !== 'over') return;
    const timer = setTimeout(
      () => overRef.current(resultRef.current, seenRef.current),
      T.screenFade,
    );
    return () => clearTimeout(timer);
  }, [phase]);

  // Re-centre on whatever just landed.
  useEffect(() => {
    const centre =
      RAIL_PAD_H + lastIndex * (GAP_W + CARD_W) + GAP_W + CARD_W / 2;
    scrollToOffset(centre - SCREEN_W / 2, true);
  }, [lastIndex, placedCount, scrollToOffset]);

  // --- pass and play ---------------------------------------------------
  const multiplayer = !!players && players.length > 1;
  const seat = multiplayer ? round.attempted % players!.length : 0;
  const turnLabel = multiplayer
    ? `${players![seat]} · TURN ${round.attempted + 1}`
    : null;

  // The device changes hands once a card has been resolved, never mid-reveal.
  useEffect(() => {
    if (!multiplayer || placedCount <= 1 || phase === 'over') return;
    setHandoff(true);
  }, [placedCount, multiplayer, phase]);

  const endHandoff = useCallback(() => setHandoff(false), []);

  const togglePlaceMode = useCallback(() => setTapToPlace(v => !v), []);
  const togglePause = useCallback(
    () => round.setPaused(!round.paused),
    [round],
  );

  const inputEnabled = phase === 'idle' && !round.paused && !handoff;
  const oldest = placed.length > 0 ? placed[0] : null;
  const newest = placed.length > 0 ? placed[placed.length - 1] : null;
  const progress =
    round.roundLength > 0 ? round.cardNumber / round.roundLength : 0;

  return (
    <ScreenFrame variant="game">
      <ScreenHeader
        centered
        title={turnLabel ?? deck.name}
        subtitle={`CARDS PLACED ${round.score}`}
        leftSlot={
          <IconPlate
            Icon={ChevronLeft}
            onPress={onBack}
            accessibilityLabel="Back to deck vault"
          />
        }
        rightSlot={
          <View style={styles.headerRight}>
            <IconPlate
              Icon={round.paused ? Play : Pause}
              onPress={togglePause}
              accessibilityLabel={round.paused ? 'Resume' : 'Pause'}
              active={round.paused}
            />
            <FossilLives
              total={FOSSILS_PER_ROUND}
              remaining={round.fossils}
              size={18}
            />
          </View>
        }
      />

      <View style={styles.area}>
        <View style={styles.stack}>
          <View style={round.paused ? styles.railPaused : null}>
            <TimelineRail
              cards={round.placed}
              openGapIndex={openGap}
              tapToPlace={tapToPlace && inputEnabled}
              dateFormat={dateFormat}
              fontScale={fontScale}
              railRef={railRef}
              onGapPress={round.place}
              onScroll={handleScroll}
              onContentSizeChange={handleContentSize}
            />
          </View>

          {/* the cabinet label: how far the timeline currently reaches */}
          {oldest && newest ? (
            <View style={styles.spanPlate}>
              <DoubleRule inset={5} radius={theme.radius.xs} />
              <View style={styles.spanEnd}>
                <Text style={styles.spanLabel}>OLDEST</Text>
                <Text style={styles.spanValue}>
                  {formatYear(oldest.year, dateFormat)}
                </Text>
              </View>
              <View style={styles.spanMiddle}>
                <View style={styles.spanRule} />
                <Text style={styles.spanCount}>
                  {`${placed.length} ON THE TABLE`}
                </Text>
                <View style={styles.spanRule} />
              </View>
              <View style={styles.spanEndRight}>
                <Text style={styles.spanLabel}>NEWEST</Text>
                <Text style={styles.spanValue}>
                  {formatYear(newest.year, dateFormat)}
                </Text>
              </View>
            </View>
          ) : null}
        </View>

        {round.paused ? (
          <View style={styles.pausePlate}>
            <DoubleRule inset={5} radius={theme.radius.sm} />
            <Text style={styles.pauseTitle}>PAUSED</Text>
            <View style={styles.pauseRule} />
            <Text style={styles.pauseHint}>THE TIMELINE IS ON HOLD</Text>
            <View style={styles.pauseCta}>
              <GhostButton
                label="RESUME ROUND"
                Icon={Play}
                onPress={togglePause}
              />
            </View>
          </View>
        ) : null}

        {round.current && phase !== 'over' ? (
          <DraggableCard
            card={round.current}
            enabled={inputEnabled}
            dateFormat={dateFormat}
            fontScale={fontScale}
            hintVisible={!dragging && inputEnabled}
            onDragStart={onDragStart}
            onDragMove={onDragMove}
            onDragEnd={onDragEnd}
            onDragCancel={onDragCancel}
          />
        ) : null}

        {/* ---------------- floating control bar ---------------- */}
        <View style={[styles.bar, dragging ? styles.barDimmed : null]}>
          <DoubleRule inset={5} radius={theme.radius.sm} />

          <IconPlate
            Icon={Hand}
            onPress={togglePlaceMode}
            accessibilityLabel={
              tapToPlace ? 'Switch to drag mode' : 'Switch to tap to place mode'
            }
            active={tapToPlace}
          />

          <View style={styles.barCentre}>
            <Text style={styles.barCaption}>
              {`CARD ${round.cardNumber} / ${round.roundLength}`}
            </Text>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  {width: `${Math.max(2, Math.round(progress * 100))}%`},
                ]}
              />
            </View>
            <Text style={styles.barMode}>
              {tapToPlace ? 'TAP TO PLACE' : 'DRAG'}
            </Text>
          </View>

          <IconPlate
            Icon={HelpCircle}
            onPress={onHowTo}
            accessibilityLabel="How to play"
            size={48}
          />
        </View>
      </View>

      <HandoffOverlay
        visible={handoff}
        playerName={multiplayer ? players![seat] : ''}
        onDone={endHandoff}
      />

      <CardRevealOverlay
        visible={phase === 'revealing'}
        card={round.pending?.card ?? null}
        correct={round.pending?.placement.correct ?? false}
        dateFormat={dateFormat}
        fontScale={fontScale}
        onNext={round.next}
      />
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  area: {
    flex: 1,
  },
  stack: {
    flex: 1,
    justifyContent: 'center',
    // keeps the stack clear of the card in hand and the floating bar
    paddingBottom: CURRENT_CARD_BOTTOM + CURRENT_CARD_H,
  },
  railPaused: {
    opacity: 0.5,
  },
  spanPlate: {
    marginTop: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: 'rgba(74,93,78,0.22)',
    backgroundColor: 'rgba(250,246,236,0.78)',
  },
  spanEnd: {
    width: 86,
  },
  spanEndRight: {
    width: 86,
    alignItems: 'flex-end',
  },
  spanLabel: {
    ...theme.typography.captionXs,
    fontSize: 9,
    color: theme.colors.textMuted,
  },
  spanValue: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.4,
    color: theme.colors.primary,
    fontVariant: ['tabular-nums'],
    marginTop: 3,
  },
  spanMiddle: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  spanRule: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(209,143,46,0.45)',
  },
  spanCount: {
    ...theme.typography.captionXs,
    fontSize: 9,
    color: theme.colors.textMid,
    fontVariant: ['tabular-nums'],
    marginVertical: 6,
  },
  pausePlate: {
    position: 'absolute',
    top: '42%',
    left: theme.spacing.xl,
    right: theme.spacing.xl,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: 'rgba(250,246,236,0.96)',
    alignItems: 'center',
    ...theme.shadows.bar,
  },
  pauseTitle: {
    fontFamily: 'serif',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 2.4,
    color: theme.colors.text,
  },
  pauseRule: {
    width: 48,
    height: 1,
    backgroundColor: theme.colors.accent,
    marginVertical: theme.spacing.md,
  },
  pauseHint: {
    ...theme.typography.captionXs,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.lg,
  },
  pauseCta: {
    width: '100%',
  },
  bar: {
    position: 'absolute',
    bottom: FLOATING_BAR_BOTTOM,
    left: theme.spacing.lg,
    right: theme.spacing.lg,
    height: FLOATING_BAR_H,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: 'rgba(74,93,78,0.22)',
    backgroundColor: 'rgba(250,246,236,0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md,
    ...theme.shadows.bar,
  },
  barDimmed: {
    opacity: 0.65,
  },
  barCentre: {
    flex: 1,
    alignItems: 'center',
  },
  barCaption: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.text,
    fontVariant: ['tabular-nums'],
  },
  barTrack: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(185,174,151,0.55)',
    marginVertical: 6,
  },
  barFill: {
    height: 1,
    backgroundColor: theme.colors.accent,
  },
  barMode: {
    ...theme.typography.captionXs,
    fontSize: 9,
    color: theme.colors.textMuted,
  },
});

export default GameScreen;
