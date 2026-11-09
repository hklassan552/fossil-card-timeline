import type {Card, DeckId} from './decks';

/**
 * Pure placement logic. No React, no animation, no side effects — everything
 * here is unit-testable and is the single source of truth for "was that right".
 */

export type Placement = {
  /** Where the player dropped it. */
  gapIndex: number;
  /** Where chronology says it belongs. */
  trueIndex: number;
  correct: boolean;
  /** Year of the neighbour the player implied, for the miss report. */
  guessedNeighbourYear: number | null;
  /** |guessedNeighbourYear - card.year| — how badly it missed. */
  gapSize: number;
};

export type Miss = {
  cardId: number;
  title: string;
  guessedYear: number | null;
  trueYear: number;
  gapSize: number;
};

/**
 * A drop into `gapIndex` is correct when the card's year sits between the
 * neighbours on either side of that gap. Both ends are open-ended.
 */
export function evaluate(
  placed: readonly Card[],
  card: Card,
  gapIndex: number,
): Placement {
  const idx = clampGap(gapIndex, placed.length);
  const left = idx > 0 ? placed[idx - 1] : null;
  const right = idx < placed.length ? placed[idx] : null;

  const afterLeft = left === null || card.year >= left.year;
  const beforeRight = right === null || card.year <= right.year;
  const correct = afterLeft && beforeRight;

  const trueIndex = resolveTrueIndex(placed, card.year);

  // The neighbour the player got wrong: whichever side the card overshot.
  let guessedNeighbourYear: number | null = null;
  if (!afterLeft && left) guessedNeighbourYear = left.year;
  else if (!beforeRight && right) guessedNeighbourYear = right.year;

  const gapSize =
    guessedNeighbourYear === null
      ? 0
      : Math.abs(guessedNeighbourYear - card.year);

  return {gapIndex: idx, trueIndex, correct, guessedNeighbourYear, gapSize};
}

/** The sorted insertion point for `year` in an already-sorted timeline. */
export function resolveTrueIndex(
  placed: readonly Card[],
  year: number,
): number {
  let i = 0;
  while (i < placed.length && placed[i].year < year) i++;
  return i;
}

export function clampGap(index: number, placedCount: number): number {
  if (!Number.isFinite(index)) return 0;
  if (index < 0) return 0;
  if (index > placedCount) return placedCount;
  return Math.round(index);
}

/** Immutably splices `card` into the timeline at `index`. */
export function insertAt(
  placed: readonly Card[],
  card: Card,
  index: number,
): Card[] {
  const idx = clampGap(index, placed.length);
  const next = placed.slice();
  next.splice(idx, 0, card);
  return next;
}

/* ------------------------------------------------------------------ *
 * Dealing
 * ------------------------------------------------------------------ */

/** Fisher-Yates, seeded off Math.random — a fresh order every round. */
export function shuffle<T>(items: readonly T[]): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
}

export type DealtRound = {
  deckId: DeckId;
  /** The pre-dated card already on the table. */
  anchor: Card;
  /** Face-down queue, `roundSize` long at most. */
  queue: Card[];
};

/**
 * Opens a round: one anchor card from the deck's midpoint plus a shuffled
 * queue drawn from the rest.
 */
export function dealRound(
  deckId: DeckId,
  cards: readonly Card[],
  roundSize: number,
): DealtRound {
  const midpoint = Math.floor(cards.length / 2);
  const anchor = cards[midpoint];
  const rest = cards.filter(c => c.id !== anchor.id);
  const queue = shuffle(rest).slice(0, Math.max(0, roundSize));
  return {deckId, anchor, queue};
}
