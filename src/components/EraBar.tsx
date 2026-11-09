import React, {memo, useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {T} from '../constants/config';
import theme from '../constants/theme';
import {formatPercent} from '../utils/formatYear';

type Props = {
  label: string;
  /** 0-100. */
  accuracy: number;
  seen: number;
  index: number;
};

const TRACK_H = 14;

/**
 * One era accuracy bar. The fill grows with scaleX on the native driver —
 * animating `width` here would recalculate layout for eight rows at once.
 */
export const EraBar = memo(function EraBar({
  label,
  accuracy,
  seen,
  index,
}: Props) {
  const grow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(grow, {
      toValue: 1,
      duration: T.countUp,
      delay: index * T.stagger,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [grow, index]);

  const pct = Math.max(0, Math.min(100, accuracy));
  const scaleX = grow.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.max(0.02, pct / 100)],
  });

  return (
    <View style={styles.row}>
      <View style={styles.head}>
        <Text numberOfLines={1} style={styles.label}>
          {label}
        </Text>
        <Text style={styles.value}>
          {seen > 0 ? formatPercent(pct) : 'NO DATA'}
        </Text>
      </View>
      <View style={styles.track}>
        <Animated.View
          pointerEvents="none"
          style={[styles.fillWrap, {transform: [{scaleX}]}]}>
          <LinearGradient
            colors={theme.gradients.progress}
            start={H_START}
            end={H_END}
            style={styles.fill}
          />
        </Animated.View>
      </View>
    </View>
  );
});

const H_START = {x: 0, y: 0};
const H_END = {x: 1, y: 0};

const styles = StyleSheet.create({
  row: {
    marginBottom: 14,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    ...theme.typography.captionXs,
    color: theme.colors.text,
    flex: 1,
  },
  value: {
    ...theme.typography.captionXs,
    color: theme.colors.accentDeep,
    fontVariant: ['tabular-nums'],
    marginLeft: theme.spacing.sm,
  },
  track: {
    height: TRACK_H,
    borderRadius: theme.radius.xs,
    backgroundColor: 'rgba(34,37,31,0.08)',
    overflow: 'hidden',
  },
  fillWrap: {
    ...StyleSheet.absoluteFillObject,
    // scaleX grows from the left edge, not the centre
    transformOrigin: '0% 50%',
  },
  fill: {
    flex: 1,
    borderRadius: theme.radius.xs,
  },
});

export default EraBar;
