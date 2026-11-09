import {useReducer, useMemo, useCallback} from 'react';

import {FOSSILS_PER_ROUND, ROUND_SIZE} from '../constants/config';
import type {Card, DeckId, EraId} from '../game/decks';
import {getDeck} from '../game/decks';
import {
  dealRound,
  evaluate,
  insertAt,
  type Miss,
  type Placement,
} from '../game/timelineEngine';
import type {RoundResult} from '../game/scoring';

export type Phase = 'idle' | 'revealing' | 'resolving' | 'over';

type Pending = {card: Card; placement: Placement};

type RoundState = {
  deckId: DeckId;
  queue: Card[];
  queueIdx: number;
  placed: Card[];
  fossils: number;
  streak: number;
  bestStreak: number;
  correct: number;
  attempted: number;
  misses: Miss[];
  eraSeen: Partial<Record<EraId, number>>;
  eraCorrect: Partial<Record<EraId, number>>;
  seenIds: number[];
  phase: Phase;
  pending: Pending | null;
  /** Index the last card landed at — drives the rail re-centre and enter glide. */
  lastIndex: number;
  paused: boolean;
};

type Action =
  | {type: 'DEAL'; deckId: DeckId}
  | {type: 'PLACE'; gapIndex: number}
  | {type: 'NEXT'}
  | {type: 'RESOLVED'}
  | {type: 'SET_PAUSED'; paused: boolean};

function bump(
  tally: Partial<Record<EraId, number>>,
  era: EraId,
): Partial<Record<EraId, number>> {
  return {...tally, [era]: (tally[era] ?? 0) + 1};
}

function init(deckId: DeckId): RoundState {
  const deck = getDeck(deckId);
  const {anchor, queue} = dealRound(deckId, deck.cards, ROUND_SIZE);
  return {
    deckId,
    queue,
    queueIdx: 0,
    placed: [anchor],
    fossils: FOSSILS_PER_ROUND,
    streak: 0,
    bestStreak: 0,
    correct: 0,
    attempted: 0,
    misses: [],
    eraSeen: {},
    eraCorrect: {},
    seenIds: [anchor.id],
    phase: 'idle',
    pending: null,
    lastIndex: 0,
    paused: false,
  };
}

function reducer(state: RoundState, action: Action): RoundState {
  switch (action.type) {
    case 'DEAL':
      return init(action.deckId);

    case 'SET_PAUSED':
      if (state.phase === 'over') return state;
      return {...state, paused: action.paused};

    case 'PLACE': {
      if (state.phase !== 'idle' || state.paused) return state;
      const card = state.queue[state.queueIdx];
      if (!card) return state;

      const placement = evaluate(state.placed, card, action.gapIndex);
      const streak = placement.correct ? state.streak + 1 : 0;
      const miss: Miss | null = placement.correct
        ? null
        : {
            cardId: card.id,
            title: card.title,
            guessedYear: placement.guessedNeighbourYear,
            trueYear: card.year,
            gapSize: placement.gapSize,
          };

      return {
        ...state,
        phase: 'revealing',
        pending: {card, placement},
        fossils: placement.correct ? state.fossils : state.fossils - 1,
        streak,
        bestStreak: Math.max(state.bestStreak, streak),
        correct: state.correct + (placement.correct ? 1 : 0),
        attempted: state.attempted + 1,
        misses: miss ? state.misses.concat(miss) : state.misses,
        eraSeen: bump(state.eraSeen, card.era),
        eraCorrect: placement.correct
          ? bump(state.eraCorrect, card.era)
          : state.eraCorrect,
      };
    }

    case 'NEXT': {
      const pending = state.pending;
      if (state.phase !== 'revealing' || !pending) return state;

      const {card, placement} = pending;
      const placed = insertAt(state.placed, card, placement.trueIndex);
      const queueIdx = state.queueIdx + 1;
      const exhausted = queueIdx >= state.queue.length;
      const dead = state.fossils <= 0;

      let phase: Phase;
      if (dead || exhausted) phase = 'over';
      else if (!placement.correct) phase = 'resolving';
      else phase = 'idle';

      return {
        ...state,
        placed,
        queueIdx,
        phase,
        pending: null,
        lastIndex: placement.trueIndex,
        seenIds: state.seenIds.concat(card.id),
      };
    }

    case 'RESOLVED':
      if (state.phase !== 'resolving') return state;
      return {...state, phase: 'idle'};

    default:
      return state;
  }
}

export type TimelineRound = {
  deckId: DeckId;
  placed: Card[];
  current: Card | null;
  phase: Phase;
  paused: boolean;
  pending: Pending | null;
  fossils: number;
  score: number;
  attempted: number;
  streak: number;
  bestStreak: number;
  /** 1-based card number within the round, for "CARD 8 / 24". */
  cardNumber: number;
  roundLength: number;
  lastIndex: number;
  seenIds: number[];
  result: RoundResult;
  place: (gapIndex: number) => void;
  next: () => void;
  resolved: () => void;
  setPaused: (paused: boolean) => void;
  restart: (deckId: DeckId) => void;
};

/** Owns one round of play. GameScreen renders it; App.tsx never sees it. */
export function useTimelineRound(deckId: DeckId): TimelineRound {
  const [state, dispatch] = useReducer(reducer, deckId, init);

  const place = useCallback((gapIndex: number) => {
    dispatch({type: 'PLACE', gapIndex});
  }, []);
  const next = useCallback(() => dispatch({type: 'NEXT'}), []);
  const resolved = useCallback(() => dispatch({type: 'RESOLVED'}), []);
  const setPaused = useCallback(
    (paused: boolean) => dispatch({type: 'SET_PAUSED', paused}),
    [],
  );
  const restart = useCallback(
    (nextDeck: DeckId) => dispatch({type: 'DEAL', deckId: nextDeck}),
    [],
  );

  const result: RoundResult = useMemo(
    () => ({
      deckId: state.deckId,
      score: state.correct,
      attempted: state.attempted,
      bestStreak: state.bestStreak,
      misses: state.misses,
      eraSeen: state.eraSeen,
      eraCorrect: state.eraCorrect,
    }),
    [
      state.deckId,
      state.correct,
      state.attempted,
      state.bestStreak,
      state.misses,
      state.eraSeen,
      state.eraCorrect,
    ],
  );

  return {
    deckId: state.deckId,
    placed: state.placed,
    current: state.queue[state.queueIdx] ?? null,
    phase: state.phase,
    paused: state.paused,
    pending: state.pending,
    fossils: state.fossils,
    score: state.correct,
    attempted: state.attempted,
    streak: state.streak,
    bestStreak: state.bestStreak,
    cardNumber: Math.min(state.queueIdx + 1, state.queue.length),
    roundLength: state.queue.length,
    lastIndex: state.lastIndex,
    seenIds: state.seenIds,
    result,
    place,
    next,
    resolved,
    setPaused,
    restart,
  };
}
