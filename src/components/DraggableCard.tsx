import React, {memo, useEffect, useMemo, useRef} from 'react';
import {
  Animated,
  Easing,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {CURRENT_CARD_BOTTOM, T} from '../constants/config';
import theme from '../constants/theme';
import type {DateFormat} from '../constants/config';
import type {Card} from '../game/decks';
import SpecimenCard from './SpecimenCard';

type Props = {
  card: Card;
  enabled: boolean;
  dateFormat: DateFormat;
  fontScale: number;
  hintVisible: boolean;
  onDragStart: (fingerX: number) => void;
  onDragMove: (fingerX: number) => void;
  onDragEnd: () => void;
  onDragCancel: () => void;
};

/**
 * The card in hand. Drag input is core `PanResponder`, the only gesture API
 * allowed on this stack (rule #8).
 *
 * The pan value is driven with setValue from the responder, so it stays on the
 * JS driver; mixing setValue with a native-driven node is the one combination
 * that misbehaves on Android release builds. Only transform is animated.
 */
export const DraggableCard = memo(function DraggableCard({
  card,
  enabled,
  dateFormat,
  fontScale,
  hintVisible,
  onDragStart,
  onDragMove,
  onDragEnd,
  onDragCancel,
}: Props) {
  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const lift = useRef(new Animated.Value(0)).current;
  const breathe = useRef(new Animated.Value(0)).current;

  // Callbacks the responder reads must come from refs, never from state
  // captured at creation time (rule #8).
  const cb = useRef({
    onDragStart,
    onDragMove,
    onDragEnd,
    onDragCancel,
    enabled,
  });
  cb.current = {onDragStart, onDragMove, onDragEnd, onDragCancel, enabled};

  const responder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => cb.current.enabled,
        onMoveShouldSetPanResponder: () => cb.current.enabled,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: (_e, g) => {
          pan.setValue({x: 0, y: 0});
          Animated.spring(lift, {
            toValue: 1,
            tension: theme.animation.card.tension,
            friction: theme.animation.card.friction,
            useNativeDriver: false,
          }).start();
          cb.current.onDragStart(g.x0);
        },
        onPanResponderMove: (_e, g) => {
          pan.setValue({x: g.dx, y: g.dy});
          cb.current.onDragMove(g.moveX);
        },
        onPanResponderRelease: () => {
          settle();
          cb.current.onDragEnd();
        },
        onPanResponderTerminate: () => {
          settle();
          cb.current.onDragCancel();
        },
      }),
    // `pan`, `lift` and `settle` are stable for the component's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  function settle() {
    Animated.parallel([
      Animated.spring(pan, {
        toValue: {x: 0, y: 0},
        tension: theme.animation.card.tension,
        friction: theme.animation.card.friction,
        useNativeDriver: false,
      }),
      Animated.timing(lift, {
        toValue: 0,
        duration: T.elementFade,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
    ]).start();
  }

  // Idle breathing loop, +/-3px — stops while the card is being dragged.
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, {
          toValue: 1,
          duration: T.breathe / 2,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.timing(breathe, {
          toValue: 0,
          duration: T.breathe / 2,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [breathe]);

  const scale = lift.interpolate({inputRange: [0, 1], outputRange: [1, 1.06]});
  const float = breathe.interpolate({inputRange: [0, 1], outputRange: [0, -3]});
  const shadowRadius = lift.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 18],
  });

  return (
    /* pointerEvents is deliberately left at the default `auto`: this view
       carries the PanResponder and holds no Pressable, so it has to be the
       touch target itself. `box-none` here is what would stop the drag. */
    <Animated.View
      style={[
        styles.root,
        {
          shadowRadius,
          transform: [
            {translateX: pan.x},
            {translateY: Animated.add(pan.y, float)},
            {scale},
          ],
        },
      ]}
      {...responder.panHandlers}>
      <SpecimenCard
        cardId={card.id}
        title={card.title}
        year={card.year}
        revealed={false}
        variant="current"
        dateFormat={dateFormat}
        fontScale={fontScale}
      />
      {hintVisible ? (
        <View pointerEvents="none" style={styles.hintWrap}>
          <Text style={styles.hint}>DRAG THE CARD ONTO THE TIMELINE</Text>
        </View>
      ) : null}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: CURRENT_CARD_BOTTOM,
    alignSelf: 'center',
    borderRadius: theme.radius.sm,
    shadowColor: theme.colors.darkMid,
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 6},
    elevation: 7,
  },
  hintWrap: {
    position: 'absolute',
    top: -24,
    left: -60,
    right: -60,
    alignItems: 'center',
  },
  hint: {
    ...theme.typography.captionXs,
    fontSize: 9,
    color: theme.colors.textMuted,
  },
});

export default DraggableCard;
