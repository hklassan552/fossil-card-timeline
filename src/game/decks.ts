/**
 * FossilCardTimeline — the eight themed decks.
 *
 * `era` is derived from `year` so the two can never drift out of sync.
 */

import {
  DEEP_TIME_CARDS,
  EVOLUTION_CARDS,
  EXPLORATION_CARDS,
  SCIENCE_CARDS,
  type RawCard,
} from './deckData';
import {
  MEDICINE_CARDS,
  EVERYDAY_CARDS,
  FLIGHT_SPACE_CARDS,
  COMMUNICATION_CARDS,
} from './deckData2';

export type EraId =
  | 'DEEP_TIME'
  | 'ANCIENT'
  | 'MEDIEVAL'
  | 'RENAISSANCE'
  | 'ENLIGHTENMENT'
  | 'INDUSTRIAL'
  | 'MODERN'
  | 'DIGITAL';

export type DeckId =
  | 'DEEP_TIME'
  | 'EVOLUTION'
  | 'EXPLORATION'
  | 'SCIENCE'
  | 'MEDICINE'
  | 'EVERYDAY_INVENTIONS'
  | 'FLIGHT_AND_SPACE'
  | 'COMMUNICATION';

export type Card = {
  id: number;
  title: string;
  year: number;
  era: EraId;
  fact: string;
};

export type Deck = {
  id: DeckId;
  name: string;
  span: string;
  blurb: string;
  cards: Card[];
};

export const ERA_LABEL: Record<EraId, string> = {
  DEEP_TIME: 'DEEP TIME',
  ANCIENT: 'ANCIENT WORLD',
  MEDIEVAL: 'MEDIEVAL',
  RENAISSANCE: 'RENAISSANCE',
  ENLIGHTENMENT: 'ENLIGHTENMENT',
  INDUSTRIAL: 'INDUSTRIAL AGE',
  MODERN: 'MODERN AGE',
  DIGITAL: 'DIGITAL AGE',
};

export const ERA_ORDER: EraId[] = [
  'DEEP_TIME',
  'ANCIENT',
  'MEDIEVAL',
  'RENAISSANCE',
  'ENLIGHTENMENT',
  'INDUSTRIAL',
  'MODERN',
  'DIGITAL',
];

export function eraForYear(year: number): EraId {
  if (year <= -20000) return 'DEEP_TIME';
  if (year < 500) return 'ANCIENT';
  if (year < 1400) return 'MEDIEVAL';
  if (year < 1650) return 'RENAISSANCE';
  if (year < 1780) return 'ENLIGHTENMENT';
  if (year < 1900) return 'INDUSTRIAL';
  if (year < 1975) return 'MODERN';
  return 'DIGITAL';
}

/** Short era caption printed above the spine tick of a placed card. */
export function eraTick(year: number): string {
  if (year <= -20000) {
    const mya = Math.round(Math.abs(year) / 1000000);
    return mya >= 1 ? `${mya} MYA` : 'PREHISTORY';
  }
  if (year < 0) return `${Math.abs(year)} BCE`;
  if (year < 1000) return `${Math.floor(year / 100) + 1}00s`;
  return `${Math.floor(year / 100)}00s`;
}

/* ------------------------------------------------------------------ *
 * Deck assembly
 * ------------------------------------------------------------------ */

type DeckSpec = {
  id: DeckId;
  name: string;
  span: string;
  blurb: string;
  raw: RawCard[];
};

const SPECS: DeckSpec[] = [
  {
    id: 'DEEP_TIME',
    name: 'Deep Time',
    span: 'TRIASSIC TO BRONZE AGE',
    blurb:
      'Oxygen, shells, dinosaurs and the first cities, measured against a clock that runs in millions of years.',
    raw: DEEP_TIME_CARDS,
  },
  {
    id: 'EVOLUTION',
    name: 'Evolution',
    span: 'STROMATOLITES TO DNA',
    blurb:
      'The branching record: cells, jaws, feathers, upright apes, and the people who worked out what it meant.',
    raw: EVOLUTION_CARDS,
  },
  {
    id: 'EXPLORATION',
    name: 'Exploration',
    span: 'SAHUL TO THE MOON',
    blurb:
      'Open-water crossings, trade roads and polar marches, from the first canoe to the Sea of Tranquillity.',
    raw: EXPLORATION_CARDS,
  },
  {
    id: 'SCIENCE',
    name: 'Science',
    span: 'BABYLON TO THE HIGGS',
    blurb:
      'Clay eclipse tables, ellipses, four equations and one stubborn bump at 125 billion electronvolts.',
    raw: SCIENCE_CARDS,
  },
  {
    id: 'MEDICINE',
    name: 'Medicine',
    span: 'TREPANATION TO mRNA',
    blurb:
      'Healed skulls, controlled trials, mould on a plate, and the only disease ever driven to extinction.',
    raw: MEDICINE_CARDS,
  },
  {
    id: 'EVERYDAY_INVENTIONS',
    name: 'Everyday Things',
    span: 'BREAD TO THE BARCODE',
    blurb:
      'Soap, spectacles, zips and shipping containers: the objects nobody writes histories about.',
    raw: EVERYDAY_CARDS,
  },
  {
    id: 'FLIGHT_AND_SPACE',
    name: 'Flight and Space',
    span: 'FIRE ARROWS TO WEBB',
    blurb:
      'Twelve seconds at Kitty Hawk, 108 minutes in orbit, and a mirror unfolding beyond the moon.',
    raw: FLIGHT_SPACE_CARDS,
  },
  {
    id: 'COMMUNICATION',
    name: 'Communication',
    span: 'CUNEIFORM TO SMS',
    blurb:
      'Wedges in clay, shutters on hilltops, a bit defined on paper, and a message nobody could reply to.',
    raw: COMMUNICATION_CARDS,
  },
];

let nextId = 1;

function buildDeck(spec: DeckSpec): Deck {
  const cards: Card[] = spec.raw.map(([title, year, fact]) => ({
    id: nextId++,
    title,
    year,
    era: eraForYear(year),
    fact,
  }));
  // Authoring safety net: the tables are written roughly in order, but the
  // engine relies on a strictly sorted deck for its true-index resolution.
  cards.sort((a, b) => a.year - b.year);
  return {
    id: spec.id,
    name: spec.name,
    span: spec.span,
    blurb: spec.blurb,
    cards,
  };
}

export const DECKS: Deck[] = SPECS.map(buildDeck);

export const DECK_BY_ID: Record<DeckId, Deck> = DECKS.reduce((acc, d) => {
  acc[d.id] = d;
  return acc;
}, {} as Record<DeckId, Deck>);

export const DEFAULT_DECK_ID: DeckId = 'DEEP_TIME';

export const ALL_CARDS: Card[] = DECKS.reduce<Card[]>(
  (acc, d) => acc.concat(d.cards),
  [],
);

export function getDeck(id: DeckId): Deck {
  return DECK_BY_ID[id] ?? DECK_BY_ID[DEFAULT_DECK_ID];
}
