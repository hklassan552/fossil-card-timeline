import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, Switch, Text, View} from 'react-native';
import {ChevronLeft} from 'lucide-react-native';

import {T} from '../constants/config';
import theme from '../constants/theme';
import type {DateFormat, TextSizeKey} from '../constants/config';
import {useSettings} from '../hooks/useAppSettings';
import DoubleRule from '../components/DoubleRule';
import IconPlate from '../components/IconPlate';
import ScreenFrame from '../components/ScreenFrame';
import ScreenHeader from '../components/ScreenHeader';
import SegmentedToggle from '../components/SegmentedToggle';

type Props = {
  onBack: () => void;
  onResetProgress: () => void;
};

const DATE_OPTIONS = ['BCE', 'BC'] as const;
const SIZE_OPTIONS = ['S', 'M', 'L'] as const;
const HIT_SLOP = {top: 8, bottom: 8, left: 8, right: 8};

export function SettingsScreen({onBack, onResetProgress}: Props) {
  const {
    soundOn,
    setSoundOn,
    dateFormat,
    setDateFormat,
    textSize,
    setTextSize,
  } = useSettings();

  // Destructive action needs a second tap inside a 3s window.
  const [armed, setArmed] = useState(false);
  const resetRef = useRef(onResetProgress);
  resetRef.current = onResetProgress;

  useEffect(() => {
    if (!armed) return;
    const timer = setTimeout(() => setArmed(false), T.resetArmWindow);
    return () => clearTimeout(timer);
  }, [armed]);

  const handleReset = useCallback(() => {
    if (armed) {
      setArmed(false);
      resetRef.current();
      return;
    }
    setArmed(true);
  }, [armed]);

  const handleDate = useCallback(
    (value: string) => setDateFormat(value as DateFormat),
    [setDateFormat],
  );
  const handleSize = useCallback(
    (value: string) => setTextSize(value as TextSizeKey),
    [setTextSize],
  );

  return (
    <ScreenFrame variant="menu">
      <ScreenHeader
        title="SETTINGS"
        subtitle="SOUND, DATES, TEXT"
        leftSlot={
          <IconPlate
            Icon={ChevronLeft}
            onPress={onBack}
            accessibilityLabel="Back to deck vault"
          />
        }
      />

      <View style={styles.body}>
        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.rowLabel}>SOUND</Text>
            <Text style={styles.rowHint}>Stamp and shuffle effects</Text>
          </View>
          <Switch
            value={soundOn}
            onValueChange={setSoundOn}
            trackColor={TRACK_COLOR}
            thumbColor={soundOn ? theme.colors.accent : theme.colors.surface}
            accessibilityLabel="Sound effects"
          />
        </View>

        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.rowLabel}>DATE FORMAT</Text>
            <Text style={styles.rowHint}>Before the common era</Text>
          </View>
          <View style={styles.rowControlWide}>
            <SegmentedToggle
              options={DATE_OPTIONS}
              value={dateFormat}
              onChange={handleDate}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.rowLabel}>TEXT SIZE</Text>
            <Text style={styles.rowHint}>Fact paragraphs and labels</Text>
          </View>
          <View style={styles.rowControlWide}>
            <SegmentedToggle
              options={SIZE_OPTIONS}
              value={textSize}
              onChange={handleSize}
            />
          </View>
        </View>

        <Pressable
          onPress={handleReset}
          hitSlop={HIT_SLOP}
          accessibilityRole="button"
          accessibilityLabel="Reset progress"
          style={styles.resetPress}>
          <View style={[styles.resetRow, armed ? styles.resetArmed : null]}>
            <DoubleRule
              inset={4}
              radius={theme.radius.xs}
              color={armed ? 'rgba(209,143,46,0.45)' : 'rgba(185,174,151,0.35)'}
            />
            <Text
              style={[styles.rowLabel, armed ? styles.resetArmedText : null]}>
              {armed ? 'TAP AGAIN TO RESET' : 'RESET PROGRESS'}
            </Text>
            <Text style={styles.rowHint}>
              {armed
                ? 'Clears bests and seen cards'
                : 'Bests, seen cards and era stats'}
            </Text>
          </View>
        </Pressable>

        <View style={styles.about}>
          <DoubleRule inset={5} radius={theme.radius.xs} />
          <Text style={styles.aboutTitle}>ABOUT</Text>
          <Text style={styles.aboutBody}>
            FossilCardTimeline is a quiet museum of time: eight decks of undated
            events, three fossils a round, and no purchases of any kind.
            Progress is kept on this device only, for the length of the session.
          </Text>
        </View>
      </View>
    </ScreenFrame>
  );
}

const TRACK_COLOR = {
  false: 'rgba(185,174,151,0.55)',
  true: 'rgba(209,143,46,0.45)',
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
  },
  row: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(185,174,151,0.5)',
    gap: theme.spacing.md,
  },
  rowText: {
    flex: 1,
  },
  rowControlWide: {
    width: 140,
  },
  rowLabel: {
    ...theme.typography.caption,
    color: theme.colors.text,
  },
  rowHint: {
    fontSize: 11,
    lineHeight: 16,
    color: theme.colors.textMuted,
    marginTop: 3,
  },
  resetPress: {
    marginTop: theme.spacing.lg,
  },
  resetRow: {
    minHeight: 64,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceAlt,
  },
  resetArmed: {
    borderColor: theme.colors.accent,
    backgroundColor: theme.colors.accentSoft,
  },
  resetArmedText: {
    color: theme.colors.accentDeep,
  },
  about: {
    marginTop: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  aboutTitle: {
    ...theme.typography.captionXs,
    color: theme.colors.primary,
  },
  aboutBody: {
    ...theme.typography.bodySm,
    color: theme.colors.textMid,
    marginTop: theme.spacing.sm,
  },
});

export default SettingsScreen;
