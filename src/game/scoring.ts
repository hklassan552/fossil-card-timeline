import type {DeckId, EraId} from './decks';
import type {Miss} from './timelineEngine';

export type RoundResult = {
  deckId: DeckId;
  /** Correctly placed cards, 0..ROUND_SIZE. */
  score: number;
  attempted: number;
  bestStreak: number;
  misses: Miss[];
  /** Per-era tally gathered during the round. */
  eraSeen: Partial<Record<EraId, number>>;
  eraCorrect: Partial<Record<EraId, number>>;
};

export const EMPTY_RESULT: RoundResult = {
  deckId: 'DEEP_TIME',
  score: 0,
  attempted: 0,
  bestStreak: 0,
  misses: [],
  eraSeen: {},
  eraCorrect: {},
};

export function accuracy(correct: number, attempted: number): number {
  if (attempted <= 0) return 0;
  return (correct / attempted) * 100;
}

/** The n misses that were closest to being right — the near-misses hurt most. */
export function closestMisses(misses: readonly Miss[], n: number): Miss[] {
  return misses
    .slice()
    .sort((a, b) => a.gapSize - b.gapSize)
    .slice(0, n);
}

export type Bests = {
  length: Partial<Record<DeckId, number>>;
  streak: Partial<Record<DeckId, number>>;
};

export const EMPTY_BESTS: Bests = {length: {}, streak: {}};

export function bestLengthFor(bests: Bests, deckId: DeckId): number {
  return bests.length[deckId] ?? 0;
}

export function bestStreakFor(bests: Bests, deckId: DeckId): number {
  return bests.streak[deckId] ?? 0;
}

export function isNewBest(bests: Bests, result: RoundResult): boolean {
  return result.score > bestLengthFor(bests, result.deckId);
}

/** Folds a finished round into the running bests. Pure — returns a new object. */
export function mergeBests(bests: Bests, result: RoundResult): Bests {
  const prevLen = bestLengthFor(bests, result.deckId);
  const prevStreak = bestStreakFor(bests, result.deckId);
  return {
    length: {...bests.length, [result.deckId]: Math.max(prevLen, result.score)},
    streak: {
      ...bests.streak,
      [result.deckId]: Math.max(prevStreak, result.bestStreak),
    },
  };
}

/* ------------------------------------------------------------------ *
 * Lifetime (session) statistics, fed to Era Stats and the Archive
 * ------------------------------------------------------------------ */

export type Lifetime = {
  cardsSeen: number;
  cardsCorrect: number;
  seenIds: number[];
  eraSeen: Partial<Record<EraId, number>>;
  eraCorrect: Partial<Record<EraId, number>>;
};

export const EMPTY_LIFETIME: Lifetime = {
  cardsSeen: 0,
  cardsCorrect: 0,
  seenIds: [],
  eraSeen: {},
  eraCorrect: {},
};

function addTally(
  base: Partial<Record<EraId, number>>,
  extra: Partial<Record<EraId, number>>,
): Partial<Record<EraId, number>> {
  const out: Partial<Record<EraId, number>> = {...base};
  (Object.keys(extra) as EraId[]).forEach(k => {
    out[k] = (out[k] ?? 0) + (extra[k] ?? 0);
  });
  return out;
}

export function mergeLifetime(
  life: Lifetime,
  result: RoundResult,
  seenIds: readonly number[],
): Lifetime {
  const merged = new Set(life.seenIds);
  seenIds.forEach(id => merged.add(id));
  return {
    cardsSeen: life.cardsSeen + result.attempted,
    cardsCorrect: life.cardsCorrect + result.score,
    seenIds: Array.from(merged),
    eraSeen: addTally(life.eraSeen, result.eraSeen),
    eraCorrect: addTally(life.eraCorrect, result.eraCorrect),
  };
}

export function eraAccuracy(life: Lifetime, era: EraId): number {
  const seen = life.eraSeen[era] ?? 0;
  if (seen === 0) return 0;
  return accuracy(life.eraCorrect[era] ?? 0, seen);
}

/** The era with the best accuracy, ignoring eras with too little data. */
export function strongestEra(
  life: Lifetime,
  eras: readonly EraId[],
): EraId | null {
  let best: EraId | null = null;
  let bestPct = -1;
  eras.forEach(era => {
    const seen = life.eraSeen[era] ?? 0;
    if (seen < 2) return;
    const pct = eraAccuracy(life, era);
    if (pct > bestPct) {
      bestPct = pct;
      best = era;
    }
  });
  return best;
}
