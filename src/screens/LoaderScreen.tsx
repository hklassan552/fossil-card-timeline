import React, {useEffect, useRef} from 'react';
import {Animated, Easing, Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import assets from '../assets';
import {
  LOADER_BAR_W,
  LOADER_DURATION_MS,
  LOADER_FADE_MS,
  LOADER_PROGRESS_MS,
} from '../constants/config';
import theme from '../constants/theme';
import DoubleRule from '../components/DoubleRule';
import ScreenFrame from '../components/ScreenFrame';

type Props = {
  onDone: () => void;
};

/**
 * Splash. Deliberately the darkest screen in the app so it can never be
 * confused with the limestone Menu (rule #14) — and it carries no chips and
 * no interactive controls at all.
 */
export function LoaderScreen({onDone}: Props) {
  const plate = useRef(new Animated.Value(0)).current;
  const title = useRef(new Animated.Value(0)).current;
  const bar = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(1)).current;

  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(plate, {
        toValue: 1,
        tension: theme.animation.plate.tension,
        friction: theme.animation.plate.friction,
        useNativeDriver: true,
      }),
      Animated.timing(title, {
        toValue: 1,
        duration: 420,
        delay: 180,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    // The fill animates `width`, so it must stay off the native driver.
    Animated.timing(bar, {
      toValue: 1,
      duration: LOADER_PROGRESS_MS,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fade, {
        toValue: 0,
        duration: LOADER_FADE_MS,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }).start(() => doneRef.current());
    }, LOADER_DURATION_MS - LOADER_FADE_MS);

    return () => clearTimeout(timer);
  }, [plate, title, bar, fade]);

  const barWidth = bar.interpolate({
    inputRange: [0, 1],
    outputRange: [0, LOADER_BAR_W],
  });

  return (
    <ScreenFrame variant="loader">
      <Animated.View
        pointerEvents="box-none"
        style={[styles.root, {opacity: fade}]}>
        <Animated.View
          pointerEvents="box-none"
          style={[
            styles.plate,
            {
              opacity: plate,
              transform: [
                {
                  scale: plate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.86, 1],
                  }),
                },
              ],
            },
          ]}>
          <DoubleRule
            inset={5}
            radius={theme.radius.sm}
            color="rgba(236,229,216,0.14)"
          />
          <Image
            source={assets.logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View
          pointerEvents="box-none"
          style={[
            styles.titleBlock,
            {
              opacity: title,
              transform: [
                {
                  translateY: title.interpolate({
                    inputRange: [0, 1],
                    outputRange: [14, 0],
                  }),
                },
              ],
            },
          ]}>
          <Text style={styles.brandTop}>FOSSIL</Text>
          <Text style={styles.brandBottom}>CARD TIMELINE</Text>

          <View style={styles.subRule} />
          <Text style={styles.subtitle}>PLACE HISTORY IN ORDER</Text>
          <View style={styles.subRule} />
        </Animated.View>

        <View style={styles.progressBlock}>
          <View style={styles.track}>
            <Animated.View
              pointerEvents="none"
              style={[styles.fillWrap, {width: barWidth}]}>
              <LinearGradient
                colors={theme.gradients.progress}
                start={GRAD_FROM}
                end={GRAD_TO}
                style={styles.fill}
              />
            </Animated.View>
          </View>
          <Text style={styles.loading}>LOADING SPECIMENS</Text>
        </View>
      </Animated.View>
    </ScreenFrame>
  );
}

const GRAD_FROM = {x: 0, y: 0};
const GRAD_TO = {x: 1, y: 0};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  plate: {
    width: 180,
    height: 180,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(236,229,216,0.14)',
    backgroundColor: 'rgba(236,229,216,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 148,
    height: 148,
  },
  titleBlock: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  brandTop: {
    fontFamily: 'serif',
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 5.5,
    color: theme.colors.onDark,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 8,
    textShadowOffset: {width: 0, height: 2},
  },
  brandBottom: {
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 3,
    color: theme.colors.onDark,
    textAlign: 'center',
    marginTop: 4,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 8,
    textShadowOffset: {width: 0, height: 2},
  },
  subRule: {
    width: 56,
    height: 1,
    backgroundColor: 'rgba(185,174,151,0.3)',
    marginVertical: theme.spacing.md,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.4,
    color: '#B9AE97',
  },
  progressBlock: {
    position: 'absolute',
    bottom: 72,
    alignItems: 'center',
  },
  track: {
    width: LOADER_BAR_W,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(236,229,216,0.12)',
    overflow: 'hidden',
  },
  fillWrap: {
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    flex: 1,
  },
  loading: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
    color: '#8E8878',
    marginTop: theme.spacing.md,
  },
});

export default LoaderScreen;
