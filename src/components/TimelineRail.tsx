import React, {memo, useCallback} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  BOARD_FRAME,
  CARD_H,
  CARD_W,
  GAP_W,
  RAIL_H,
  RAIL_PAD_H,
  SCREEN_W,
  SPINE_LABEL_H,
} from '../constants/config';
import theme from '../constants/theme';
import type {DateFormat} from '../constants/config';
import type {Card} from '../game/decks';
import {eraTick} from '../game/decks';
import DropGap from './DropGap';
import SpecimenCard from './SpecimenCard';

type Props = {
  cards: readonly Card[];
  openGapIndex: number;
  tapToPlace: boolean;
  dateFormat: DateFormat;
  fontScale: number;
  railRef: React.RefObject<ScrollView>;
  onGapPress: (index: number) => void;
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onContentSizeChange: (w: number, h: number) => void;
};

/**
 * The timeline itself: oldest on the left, newest on the right, with the era
 * spine running behind the cards.
 *
 * A horizontal ScrollView rather than a FlatList — the rail holds at most 25
 * cards and every gap animates its own width, which a virtualiser with
 * getItemLayout cannot express. The screen wrapper is still a plain View
 * (rule #3): this list scrolls sideways inside the game area.
 */
export const TimelineRail = memo(function TimelineRail({
  cards,
  openGapIndex,
  tapToPlace,
  dateFormat,
  fontScale,
  railRef,
  onGapPress,
  onScroll,
  onContentSizeChange,
}: Props) {
  const renderGap = useCallback(
    (index: number) => (
      <DropGap
        key={`gap-${index}`}
        index={index}
        open={openGapIndex === index}
        tappable={tapToPlace}
        onPress={onGapPress}
      />
    ),
    [openGapIndex, tapToPlace, onGapPress],
  );

  const children: React.ReactNode[] = [];
  for (let i = 0; i < cards.length; i++) {
    children.push(renderGap(i));
    const card = cards[i];
    children.push(
      <View key={`card-${card.id}`} style={styles.slot}>
        <Text numberOfLines={1} style={styles.eraLabel}>
          {eraTick(card.year)}
        </Text>
        <View style={styles.tick} />
        <SpecimenCard
          cardId={card.id}
          title={card.title}
          year={card.year}
          revealed
          variant="placed"
          dateFormat={dateFormat}
          fontScale={fontScale}
        />
      </View>,
    );
  }
  children.push(renderGap(cards.length));

  return (
    <View style={styles.root}>
      {/* era spine — a moss line through the vertical centre of the card band */}
      <View pointerEvents="none" style={styles.spine} />

      <ScrollView
        ref={railRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
        onContentSizeChange={onContentSizeChange}
        contentContainerStyle={styles.content}
        style={styles.scroll}>
        {children}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    height: RAIL_H,
    justifyContent: 'center',
  },
  scroll: {
    flexGrow: 0,
  },
  content: {
    paddingHorizontal: RAIL_PAD_H,
    alignItems: 'flex-end',
    paddingVertical: BOARD_FRAME,
  },
  slot: {
    width: CARD_W,
    alignItems: 'center',
  },
  eraLabel: {
    ...theme.typography.captionXs,
    fontSize: 9,
    letterSpacing: 1.4,
    color: theme.colors.textMuted,
    height: 14,
  },
  tick: {
    width: 1,
    height: SPINE_LABEL_H - 22,
    backgroundColor: 'rgba(209,143,46,0.75)',
    marginBottom: 6,
  },
  spine: {
    position: 'absolute',
    left: 0,
    width: SCREEN_W,
    // vertical centre of the card band: frame + (label + tick) + half a card
    top: BOARD_FRAME + (SPINE_LABEL_H - 2) + CARD_H / 2,
    height: 3,
    backgroundColor: theme.colors.primary,
    opacity: 0.55,
  },
});

/** Content width of a rail holding `count` cards with every gap closed. */
export function railContentWidth(count: number): number {
  return RAIL_PAD_H * 2 + count * CARD_W + (count + 1) * GAP_W;
}

export default TimelineRail;
