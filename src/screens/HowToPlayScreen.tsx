import React, {memo, useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Check, ChevronLeft} from 'lucide-react-native';

import assets from '../assets';
import {FOSSILS_PER_ROUND, T} from '../constants/config';
import theme from '../constants/theme';
import DoubleRule from '../components/DoubleRule';
import IconPlate from '../components/IconPlate';
import PrimaryButton from '../components/PrimaryButton';
import ScreenFrame from '../components/ScreenFrame';
import ScreenHeader from '../components/ScreenHeader';

type Props = {
  onBack: () => void;
};

type Step = {
  n: string;
  title: string;
  body: string;
  sprite: ImageSourcePropType;
};

const STEPS: Step[] = [
  {
    n: '1',
    title: 'TAKE THE CARD',
    body: 'One undated event sits above the bar. Drag it, or tap it, to send it onto the timeline.',
    sprite: assets.sprite2,
  },
  {
    n: '2',
    title: 'OPEN A GAP',
    body: 'The nearest gap between two specimens widens and fills amber. That gap is your answer.',
    sprite: assets.iconHome,
  },
  {
    n: '3',
    title: 'THE DATE STAMPS',
    body: 'Right, and the true year prints onto the label. Wrong, and the card slides to where it belonged.',
    sprite: assets.sprite4,
  },
  {
    n: '4',
    title: 'MIND THE FOSSILS',
    body: `You get ${FOSSILS_PER_ROUND} per round. Each misplacement spends one; at zero the round is over.`,
    sprite: assets.iconPause,
  },
];

export function HowToPlayScreen({onBack}: Props) {
  return (
    <ScreenFrame variant="menu">
      <ScreenHeader
        title="HOW TO PLAY"
        subtitle="FOUR STEPS, ONE TIMELINE"
        leftSlot={
          <IconPlate
            Icon={ChevronLeft}
            onPress={onBack}
            accessibilityLabel="Back to deck vault"
          />
        }
      />

      <View style={styles.body}>
        {STEPS.map((step, i) => (
          <StepPlate key={step.n} step={step} index={i} />
        ))}

        <View style={styles.spacer} />

        <Text style={styles.hint}>
          OLDEST ON THE LEFT · NEWEST ON THE RIGHT
        </Text>
        <PrimaryButton
          label="GOT IT"
          Icon={Check}
          onPress={onBack}
          height={56}
        />
      </View>
    </ScreenFrame>
  );
}

const StepPlate = memo(function StepPlate({
  step,
  index,
}: {
  step: Step;
  index: number;
}) {
  // A slow looping drift stands in for the micro-animation of each step.
  const drift = useRef(new Animated.Value(0)).current;
  const enter = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(enter, {
      toValue: 1,
      duration: T.elementFade,
      delay: index * T.stagger,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(drift, {
          toValue: 1,
          duration: T.breathe / 2,
          delay: index * 120,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(drift, {
          toValue: 0,
          duration: T.breathe / 2,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [drift, enter, index]);

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.plate,
        {
          opacity: enter,
          transform: [
            {
              translateY: enter.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
              }),
            },
          ],
        },
      ]}>
      <DoubleRule
        inset={5}
        radius={theme.radius.xs}
        color="rgba(185,174,151,0.45)"
      />
      <Text style={styles.stepNumber}>{step.n}</Text>
      <View style={styles.stepText}>
        <Text style={styles.stepTitle}>{step.title}</Text>
        <Text style={styles.stepBody}>{step.body}</Text>
      </View>
      <Animated.Image
        source={step.sprite}
        resizeMode="contain"
        style={[
          styles.stepSprite,
          {
            transform: [
              {
                translateX: drift.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 5],
                }),
              },
            ],
          },
        ]}
      />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  plate: {
    minHeight: 92,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  stepNumber: {
    fontFamily: 'serif',
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '700',
    color: theme.colors.accent,
    width: 28,
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
  },
  stepText: {
    flex: 1,
  },
  stepTitle: {
    ...theme.typography.captionXs,
    color: theme.colors.text,
  },
  stepBody: {
    fontSize: 13,
    lineHeight: 19,
    color: theme.colors.textMid,
    marginTop: 4,
  },
  stepSprite: {
    width: 36,
    height: 36,
    opacity: 0.85,
  },
  spacer: {
    flex: 1,
    minHeight: theme.spacing.sm,
  },
  hint: {
    ...theme.typography.captionXs,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
});

export default HowToPlayScreen;
