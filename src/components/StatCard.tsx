import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import type {LucideIcon} from 'lucide-react-native';

import theme from '../constants/theme';
import DoubleRule from './DoubleRule';

type Props = {
  Icon: LucideIcon;
  value: string;
  label: string;
  /** Carries the semantics: moss = correct, amber = accuracy, terracotta = best. */
  valueColor: string;
  tone?: 'light' | 'dark';
};

/**
 * The one stat pill, reused on Menu, Round Summary and Era Stats.
 *
 * Geometry notes:
 *  - `width: '100%'`, never `flex: 1` — the parent slot is already flex:1 and
 *    nesting the two collapses the card to ~30px (rule #19a).
 *  - the icon is a 22px vector from one library, never a PNG sprite (rule #21).
 */
export const StatCard = memo(function StatCard({
  Icon,
  value,
  label,
  valueColor,
  tone = 'light',
}: Props) {
  const dark = tone === 'dark';

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: dark
            ? 'rgba(236,229,216,0.06)'
            : theme.colors.surface,
          borderColor: valueColor + '55',
        },
      ]}>
      <DoubleRule
        inset={4}
        radius={theme.radius.xs}
        color={dark ? 'rgba(236,229,216,0.10)' : 'rgba(185,174,151,0.45)'}
      />
      <View style={[styles.iconWrap, {backgroundColor: valueColor + '1A'}]}>
        <Icon size={22} color={valueColor} strokeWidth={2.5} />
      </View>
      <Text style={[styles.value, {color: valueColor}]} numberOfLines={1}>
        {value}
      </Text>
      <Text
        style={[
          styles.label,
          {color: dark ? theme.colors.onDarkMuted : theme.colors.textMuted},
        ]}
        numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.4,
    fontVariant: ['tabular-nums'],
  },
  label: {
    ...theme.typography.captionXs,
    marginTop: 2,
  },
});

export default StatCard;
