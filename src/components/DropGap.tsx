import React, {memo, useCallback, useEffect, useRef} from 'react';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';

import {CARD_H, GAP_OPEN_W, GAP_W, T} from '../constants/config';
import theme from '../constants/theme';

type Props = {
  index: number;
  open: boolean;
  /** TAP TO PLACE mode renders a visible tap affordance inside the gap. */
  tappable: boolean;
  onPress: (index: number) => void;
};

/** hitSlop widens a GAP_W-wide target to ~50px without changing the layout. */
const HIT_SLOP = {top: 8, bottom: 8, left: 16, right: 16};

/**
 * The animated amber gap between two specimens.
 *
 * `width` cannot run on the native driver (rule: animation-gpu-properties), so
 * the widening uses useNativeDriver:false. Only the wash and the dashed column
 * fade, and those use opacity, which is native-safe.
 */
export const DropGap = memo(function DropGap({
  index,
  open,
  tappable,
  onPress,
}: Props) {
  // The closed width never changes with the mode: drag-target resolution is
  // computed from GAP_W, so a wider tap target would desynchronise the two.
  const width = useRef(new Animated.Value(GAP_W)).current;
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(width, {
      toValue: open ? GAP_OPEN_W : GAP_W,
      tension: theme.animation.gap.tension,
      friction: theme.animation.gap.friction,
      useNativeDriver: false, // width — never the native driver
    }).start();
    Animated.timing(glow, {
      toValue: open ? 1 : 0,
      duration: T.gapOpen,
      useNativeDriver: true,
    }).start();
  }, [open, width, glow]);

  const handlePress = useCallback(() => onPress(index), [index, onPress]);

  return (
    <Animated.View style={[styles.root, {width}]} pointerEvents="box-none">
      <Animated.View
        pointerEvents="none"
        style={[styles.indicator, {opacity: glow}]}>
        <View style={styles.dashed} />
        <View style={styles.wash} />
      </Animated.View>

      {tappable ? (
        <Pressable
          onPress={handlePress}
          hitSlop={HIT_SLOP}
          accessibilityRole="button"
          accessibilityLabel={`Place card at position ${index + 1}`}
          style={styles.tapTarget}>
          <View style={styles.tapInner}>
            <Text style={styles.tapMark}>+</Text>
          </View>
        </Pressable>
      ) : null}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  root: {
    height: CARD_H,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashed: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    width: 0,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.accent,
    borderStyle: 'dashed',
  },
  wash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.accentSoft,
    borderRadius: theme.radius.xs,
  },
  tapTarget: {
    width: GAP_W,
    height: CARD_H,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapInner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(209,143,46,0.55)',
    backgroundColor: 'rgba(250,246,236,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapMark: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '700',
    color: theme.colors.accentDeep,
  },
});

export default DropGap;
