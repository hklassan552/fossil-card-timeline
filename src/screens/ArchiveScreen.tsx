import React, {memo, useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ChevronLeft} from 'lucide-react-native';

import assets, {spriteFor} from '../assets';
import theme from '../constants/theme';
import type {DateFormat} from '../constants/config';
import {ALL_CARDS, ERA_LABEL, type Card} from '../game/decks';

/** Size of the whole cabinet, derived from the decks themselves. */
const ARCHIVE_TOTAL = ALL_CARDS.length;
import {useSettings} from '../hooks/useAppSettings';
import {formatYear} from '../utils/formatYear';
import DoubleRule from '../components/DoubleRule';
import IconPlate from '../components/IconPlate';
import ScreenFrame from '../components/ScreenFrame';
import ScreenHeader from '../components/ScreenHeader';
import SearchField from '../components/SearchField';

type Props = {
  seenIds: readonly number[];
  onBack: () => void;
};

const ROW_H = 88;

export function ArchiveScreen({seenIds, onBack}: Props) {
  const {dateFormat} = useSettings();
  const [query, setQuery] = useState('');

  const seen = useMemo(() => new Set(seenIds), [seenIds]);

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_CARDS;
    return ALL_CARDS.filter(c => c.title.toLowerCase().includes(q));
  }, [query]);

  // One callback instance for the whole list (list-perf rule 2.2).
  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<Card>) => (
      <ArchiveRow
        cardId={item.id}
        title={item.title}
        year={item.year}
        era={ERA_LABEL[item.era]}
        revealed={seen.has(item.id)}
        dateFormat={dateFormat}
      />
    ),
    [seen, dateFormat],
  );

  return (
    <ScreenFrame variant="menu">
      <ScreenHeader
        title="FACT ARCHIVE"
        subtitle="EVERY SPECIMEN LABEL"
        leftSlot={
          <IconPlate
            Icon={ChevronLeft}
            onPress={onBack}
            accessibilityLabel="Back to deck vault"
          />
        }
      />

      <View style={styles.searchWrap}>
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder={`SEARCH ${ARCHIVE_TOTAL} FACTS`}
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        initialNumToRender={8}
        windowSize={7}
        removeClippedSubviews
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={EmptyList}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <Text style={styles.counter}>
          {`${seen.size} / ${ARCHIVE_TOTAL} SEEN`}
        </Text>
      </View>
    </ScreenFrame>
  );
}

const ArchiveRow = memo(function ArchiveRow({
  cardId,
  title,
  year,
  era,
  revealed,
  dateFormat,
}: {
  cardId: number;
  title: string;
  year: number;
  era: string;
  revealed: boolean;
  dateFormat: DateFormat;
}) {
  return (
    <View style={[styles.row, revealed ? null : styles.rowLocked]}>
      <DoubleRule
        inset={4}
        radius={theme.radius.xs}
        color="rgba(185,174,151,0.35)"
      />
      <Image
        source={assets[spriteFor(cardId)]}
        style={styles.rowSprite}
        resizeMode="contain"
      />
      <View style={styles.rowBody}>
        <Text numberOfLines={2} style={styles.rowTitle}>
          {revealed ? title : '· · · · ·'}
        </Text>
        <Text numberOfLines={1} style={styles.rowEra}>
          {era}
        </Text>
      </View>
      <Text style={styles.rowDate}>
        {revealed ? formatYear(year, dateFormat) : '? ? ? ?'}
      </Text>
    </View>
  );
});

const EmptyList = () => (
  <View style={styles.empty}>
    <Text style={styles.emptyTitle}>NOTHING FILED UNDER THAT</Text>
    <Text style={styles.emptyHint}>
      Try a shorter search, or clear the field to browse the whole cabinet.
    </Text>
  </View>
);

const keyExtractor = (item: Card) => `${item.id}`;
const getItemLayout = (_data: unknown, index: number) => ({
  length: ROW_H + 10,
  offset: (ROW_H + 10) * index,
  index,
});

const styles = StyleSheet.create({
  searchWrap: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  row: {
    height: ROW_H,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  rowLocked: {
    opacity: 0.45,
  },
  rowSprite: {
    width: 40,
    height: 40,
    opacity: 0.88,
  },
  rowBody: {
    flex: 1,
  },
  rowTitle: {
    fontFamily: 'serif',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  rowEra: {
    ...theme.typography.captionXs,
    fontSize: 9,
    color: theme.colors.textMuted,
    marginTop: 3,
  },
  rowDate: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: theme.colors.primary,
    fontVariant: ['tabular-nums'],
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    alignItems: 'center',
  },
  counter: {
    ...theme.typography.caption,
    color: theme.colors.textMid,
    fontVariant: ['tabular-nums'],
  },
  empty: {
    paddingVertical: theme.spacing.xxl,
    alignItems: 'center',
  },
  emptyTitle: {
    ...theme.typography.caption,
    color: theme.colors.textMid,
  },
  emptyHint: {
    ...theme.typography.bodySm,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
  },
});

export default ArchiveScreen;
