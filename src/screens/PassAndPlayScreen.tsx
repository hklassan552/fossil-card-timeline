import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {ChevronLeft, Users} from 'lucide-react-native';

import theme from '../constants/theme';
import DoubleRule from '../components/DoubleRule';
import IconPlate from '../components/IconPlate';
import PrimaryButton from '../components/PrimaryButton';
import ScreenFrame from '../components/ScreenFrame';
import ScreenHeader from '../components/ScreenHeader';
import SegmentedToggle from '../components/SegmentedToggle';

type Props = {
  onStart: (players: string[]) => void;
  onBack: () => void;
};

const COUNT_OPTIONS = ['2', '3', '4'] as const;

export function PassAndPlayScreen({onStart, onBack}: Props) {
  const [count, setCount] = useState('2');
  const [names, setNames] = useState<string[]>(['', '', '', '']);

  const n = Number(count);

  const setName = useCallback((index: number, value: string) => {
    setNames(prev => {
      const next = prev.slice();
      next[index] = value;
      return next;
    });
  }, []);

  const resolved = useMemo(
    () => names.slice(0, n).map((name, i) => name.trim() || `PLAYER ${i + 1}`),
    [names, n],
  );

  const handleStart = useCallback(() => onStart(resolved), [onStart, resolved]);

  const slots: number[] = [];
  for (let i = 0; i < n; i++) slots.push(i);

  return (
    <ScreenFrame variant="menu">
      <ScreenHeader
        title="PASS AND PLAY"
        subtitle="ONE DEVICE, TAKING TURNS"
        leftSlot={
          <IconPlate
            Icon={ChevronLeft}
            onPress={onBack}
            accessibilityLabel="Back to deck vault"
          />
        }
      />

      <View style={styles.body}>
        <Text style={styles.sectionLabel}>HOW MANY PLAYERS</Text>
        <SegmentedToggle
          options={COUNT_OPTIONS}
          value={count}
          onChange={setCount}
        />

        <Text style={[styles.sectionLabel, styles.sectionGap]}>NAMES</Text>
        {slots.map(i => (
          <View key={i} style={styles.inputWrap}>
            <DoubleRule
              inset={4}
              radius={theme.radius.xs}
              color="rgba(185,174,151,0.35)"
            />
            <TextInput
              value={names[i]}
              onChangeText={text => setName(i, text)}
              placeholder={`PLAYER ${i + 1}`}
              placeholderTextColor={theme.colors.textMuted}
              style={styles.input}
              autoCorrect={false}
              autoCapitalize="characters"
              maxLength={14}
              accessibilityLabel={`Name for player ${i + 1}`}
            />
          </View>
        ))}

        <View style={styles.rulesPlate}>
          <DoubleRule inset={5} radius={theme.radius.xs} />
          <Text style={styles.rulesTitle}>TURN ORDER</Text>
          <Text style={styles.rulesBody}>
            Everyone shares one timeline and one set of three fossils. Each
            player places a single card, then hands the device on. The round
            ends when the fossils run out, and the score belongs to the table,
            not to one player.
          </Text>
        </View>

        <View style={styles.spacer} />

        {/* hint sits ABOVE the CTA, never under it (rule #19) */}
        <Text style={styles.hint}>
          {`${resolved.length} PLAYERS · SHARED TIMELINE`}
        </Text>
        <PrimaryButton
          label="START SESSION"
          Icon={Users}
          onPress={handleStart}
          height={56}
        />
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
  },
  sectionLabel: {
    ...theme.typography.captionXs,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.sm,
  },
  sectionGap: {
    marginTop: theme.spacing.lg,
  },
  inputWrap: {
    height: 48,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: 'rgba(255,255,255,0.60)',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  input: {
    height: 48,
    padding: 0,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: theme.colors.text,
  },
  rulesPlate: {
    marginTop: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  rulesTitle: {
    ...theme.typography.captionXs,
    color: theme.colors.primary,
  },
  rulesBody: {
    ...theme.typography.bodySm,
    color: theme.colors.textMid,
    marginTop: theme.spacing.sm,
  },
  spacer: {
    flex: 1,
    minHeight: theme.spacing.md,
  },
  hint: {
    ...theme.typography.captionXs,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
});

export default PassAndPlayScreen;
