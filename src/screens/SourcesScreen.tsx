import React, {useCallback} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ChevronLeft} from 'lucide-react-native';

import theme from '../constants/theme';
import {DECKS, type Deck} from '../game/decks';
import DoubleRule from '../components/DoubleRule';
import IconPlate from '../components/IconPlate';
import ScreenFrame from '../components/ScreenFrame';
import ScreenHeader from '../components/ScreenHeader';

type Props = {
  onBack: () => void;
};

/** A plain editorial column — one paragraph per deck, then the date note. */
export function SourcesScreen({onBack}: Props) {
  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<Deck>) => (
      <View style={styles.entry}>
        <Text style={styles.deckName}>{item.name.toUpperCase()}</Text>
        <Text style={styles.deckSpan}>{item.span}</Text>
        <Text style={styles.deckBody}>{item.blurb}</Text>
        <Text style={styles.deckCount}>
          {`${item.cards.length} CARDS IN THIS DECK`}
        </Text>
      </View>
    ),
    [],
  );

  return (
    <ScreenFrame variant="menu">
      <ScreenHeader
        title="SOURCES"
        subtitle="WHERE THE DATES COME FROM"
        leftSlot={
          <IconPlate
            Icon={ChevronLeft}
            onPress={onBack}
            accessibilityLabel="Back to deck vault"
          />
        }
      />

      <View style={styles.intro}>
        <View style={styles.rule} />
        <Text style={styles.introBody}>
          Dates follow the consensus of standard reference works. Deep-time
          figures are rounded to the nearest useful unit and carry real
          uncertainty; a placement is judged against the figure printed on the
          card, not against the full error bar.
        </Text>
      </View>

      <FlatList
        data={DECKS}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={4}
        windowSize={5}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={Footer}
      />
    </ScreenFrame>
  );
}

const Footer = () => (
  <View style={styles.footer}>
    <DoubleRule inset={5} radius={theme.radius.xs} />
    <Text style={styles.footerTitle}>ON BCE AND BC</Text>
    <Text style={styles.footerBody}>
      The two notations count the same years and differ only in wording. Switch
      between them in Settings. Years before about 20,000 years ago are shown in
      millions or thousands of years ago instead, because a calendar year stops
      being a useful unit long before that.
    </Text>
  </View>
);

const keyExtractor = (item: Deck) => item.id;

const styles = StyleSheet.create({
  intro: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  rule: {
    width: 64,
    height: 1,
    backgroundColor: theme.colors.accent,
    marginBottom: theme.spacing.md,
  },
  introBody: {
    ...theme.typography.bodySm,
    color: theme.colors.textMid,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  entry: {
    marginBottom: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(185,174,151,0.45)',
  },
  deckName: {
    ...theme.typography.caption,
    color: theme.colors.primary,
  },
  deckSpan: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: theme.colors.textMuted,
    marginTop: 3,
  },
  deckBody: {
    ...theme.typography.bodySm,
    color: theme.colors.textMid,
    marginTop: 6,
  },
  deckCount: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: theme.colors.accentDeep,
    marginTop: 6,
    fontVariant: ['tabular-nums'],
  },
  footer: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  footerTitle: {
    ...theme.typography.captionXs,
    color: theme.colors.primary,
  },
  footerBody: {
    ...theme.typography.bodySm,
    color: theme.colors.textMid,
    marginTop: theme.spacing.sm,
  },
});

export default SourcesScreen;
