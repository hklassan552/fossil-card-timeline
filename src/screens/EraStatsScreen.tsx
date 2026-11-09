import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BookOpen, ChevronLeft, Target} from 'lucide-react-native';

import theme from '../constants/theme';
import {ERA_LABEL, ERA_ORDER} from '../game/decks';
import {
  accuracy,
  eraAccuracy,
  strongestEra,
  type Lifetime,
} from '../game/scoring';
import DoubleRule from '../components/DoubleRule';
import EraBar from '../components/EraBar';
import IconPlate from '../components/IconPlate';
import ScreenFrame from '../components/ScreenFrame';
import ScreenHeader from '../components/ScreenHeader';
import StatCard from '../components/StatCard';

type Props = {
  lifetime: Lifetime;
  onBack: () => void;
};

export function EraStatsScreen({lifetime, onBack}: Props) {
  const overall = accuracy(lifetime.cardsCorrect, lifetime.cardsSeen);
  const strongest = strongestEra(lifetime, ERA_ORDER);
  const played = lifetime.cardsSeen > 0;

  return (
    <ScreenFrame variant="menu">
      <ScreenHeader
        title="ERA STATS"
        subtitle="ACCURACY BY PERIOD"
        leftSlot={
          <IconPlate
            Icon={ChevronLeft}
            onPress={onBack}
            accessibilityLabel="Back to deck vault"
          />
        }
      />

      <View style={styles.body}>
        {played ? (
          <View style={styles.statsRow}>
            <View style={styles.statSlot}>
              <StatCard
                Icon={Target}
                value={`${Math.round(overall)}%`}
                label="OVERALL"
                valueColor={theme.colors.accentDeep}
              />
            </View>
            <View style={styles.statSlot}>
              <StatCard
                Icon={BookOpen}
                value={`${lifetime.seenIds.length}`}
                label="CARDS SEEN"
                valueColor={theme.colors.primary}
              />
            </View>
          </View>
        ) : (
          <View style={styles.introPlate}>
            <DoubleRule inset={5} radius={theme.radius.xs} />
            <Text style={styles.introTitle}>NO READINGS YET</Text>
            <Text style={styles.introBody}>
              Play a round and this page fills in: one bar per era, so you can
              see which stretch of time you actually know.
            </Text>
          </View>
        )}

        {strongest ? (
          <View style={styles.strongPlate}>
            <DoubleRule
              inset={5}
              radius={theme.radius.xs}
              color="rgba(209,143,46,0.35)"
            />
            <Text style={styles.strongLabel}>STRONGEST</Text>
            <Text style={styles.strongValue}>{ERA_LABEL[strongest]}</Text>
          </View>
        ) : null}

        <View style={styles.bars}>
          {ERA_ORDER.map((era, i) => (
            <EraBar
              key={era}
              label={ERA_LABEL[era]}
              accuracy={eraAccuracy(lifetime, era)}
              seen={lifetime.eraSeen[era] ?? 0}
              index={i}
            />
          ))}
        </View>
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  statSlot: {
    flex: 1,
  },
  introPlate: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  introTitle: {
    ...theme.typography.caption,
    color: theme.colors.text,
  },
  introBody: {
    ...theme.typography.bodySm,
    color: theme.colors.textMid,
    marginTop: theme.spacing.sm,
  },
  strongPlate: {
    marginTop: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.accent,
    backgroundColor: theme.colors.accentSoft,
  },
  strongLabel: {
    ...theme.typography.captionXs,
    color: theme.colors.accentDeep,
  },
  strongValue: {
    fontFamily: 'serif',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: theme.colors.text,
    marginTop: 3,
  },
  bars: {
    marginTop: theme.spacing.xl,
  },
});

export default EraStatsScreen;
