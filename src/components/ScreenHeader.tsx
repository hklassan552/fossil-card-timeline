import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {HEADER_H, HEADER_TOP_PAD} from '../constants/config';
import theme from '../constants/theme';

type Props = {
  title: string;
  subtitle?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  tone?: 'light' | 'dark';
  /** Centres the title block instead of left-aligning it (used in game). */
  centered?: boolean;
};

/**
 * The one header used on every screen (rule #12 of the self-check): the slots
 * change per screen, the styling never does.
 */
export const ScreenHeader = memo(function ScreenHeader({
  title,
  subtitle,
  leftSlot,
  rightSlot,
  tone = 'light',
  centered = false,
}: Props) {
  const dark = tone === 'dark';
  const titleColor = dark ? theme.colors.onDark : theme.colors.text;
  const subColor = dark ? theme.colors.onDarkMuted : theme.colors.textMuted;

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: dark ? 'rgba(0,0,0,0.30)' : 'rgba(34,37,31,0.06)',
          borderBottomColor: dark
            ? 'rgba(236,229,216,0.16)'
            : theme.colors.divider,
        },
      ]}>
      <View style={styles.slot}>
        {leftSlot ?? <View style={styles.spacer} />}
      </View>

      <View style={[styles.titleWrap, centered ? styles.titleCentered : null]}>
        <Text
          numberOfLines={1}
          style={[
            centered ? styles.titleSm : styles.title,
            {color: titleColor},
            centered ? styles.centerText : null,
          ]}>
          {title}
        </Text>
        {subtitle ? (
          <Text
            numberOfLines={1}
            style={[
              styles.subtitle,
              {color: subColor},
              centered ? styles.centerText : null,
            ]}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={styles.slotRight}>
        {rightSlot ?? <View style={styles.spacer} />}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    paddingTop: HEADER_TOP_PAD,
    height: HEADER_H + HEADER_TOP_PAD,
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  slot: {
    minWidth: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  slotRight: {
    minWidth: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  spacer: {
    width: 44,
    height: 44,
  },
  titleWrap: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    justifyContent: 'center',
  },
  titleCentered: {
    alignItems: 'center',
  },
  title: {
    ...theme.typography.title,
  },
  titleSm: {
    ...theme.typography.titleSm,
  },
  centerText: {
    textAlign: 'center',
  },
  subtitle: {
    ...theme.typography.captionXs,
    marginTop: 3,
  },
});

export default ScreenHeader;
