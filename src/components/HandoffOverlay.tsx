import React, {memo, useEffect, useRef} from 'react';
import {Animated, Easing, Image, StyleSheet, Text, View} from 'react-native';

import assets from '../assets';
import {T} from '../constants/config';
import theme from '../constants/theme';
import DoubleRule from './DoubleRule';

type Props = {
  visible: boolean;
  playerName: string;
  onDone: () => void;
};

/**
 * Covers the rail between pass-and-play turns so the next player cannot see
 * the previous one's timeline position while the device changes hands.
 */
export const HandoffOverlay = memo(function HandoffOverlay({
  visible,
  playerName,
  onDone,
}: Props) {
  const fade = useRef(new Animated.Value(0)).current;
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (!visible) {
      fade.setValue(0);
      return;
    }
    Animated.timing(fade, {
      toValue: 1,
      duration: T.elementFade,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => doneRef.current(), T.handoff);
    return () => clearTimeout(timer);
  }, [visible, fade]);

  if (!visible) return null;

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[styles.scrim, {opacity: fade}]}>
      <View style={styles.plate}>
        <DoubleRule
          inset={5}
          radius={theme.radius.sm}
          color="rgba(236,229,216,0.18)"
        />
        <Image source={assets.logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>PASS THE DEVICE</Text>
        <View style={styles.rule} />
        <Text style={styles.name} numberOfLines={1}>
          {playerName}
        </Text>
        <Text style={styles.hint}>YOUR TURN NEXT</Text>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26,28,23,0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  plate: {
    width: '100%',
    maxWidth: 300,
    paddingVertical: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(236,229,216,0.22)',
    backgroundColor: 'rgba(236,229,216,0.06)',
    alignItems: 'center',
  },
  logo: {
    width: 72,
    height: 72,
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.caption,
    letterSpacing: 2.4,
    color: theme.colors.onDark,
  },
  rule: {
    width: 56,
    height: 1,
    backgroundColor: theme.colors.accent,
    marginVertical: theme.spacing.md,
  },
  name: {
    fontFamily: 'serif',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: theme.colors.accent,
  },
  hint: {
    ...theme.typography.captionXs,
    color: theme.colors.onDarkMuted,
    marginTop: theme.spacing.sm,
  },
});

export default HandoffOverlay;
