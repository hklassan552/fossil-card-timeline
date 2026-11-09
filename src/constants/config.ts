import {Dimensions} from 'react-native';

const {width: SCREEN_W, height: SCREEN_H} = Dimensions.get('window');

export {SCREEN_W, SCREEN_H};

/* ------------------------------------------------------------------ *
 * Splash
 * ------------------------------------------------------------------ */
/** Rule #13 — EXACTLY 8000ms. Shorter values race the UI-test screenshot. */
export const LOADER_DURATION_MS = 8000;
export const LOADER_PROGRESS_MS = 7400;
export const LOADER_FADE_MS = 320;
export const LOADER_BAR_W = 200;

/* ------------------------------------------------------------------ *
 * Layout invariants
 * ------------------------------------------------------------------ */
export const HEADER_TOP_PAD = 44; // rule #6 — status bar
export const HEADER_H = 72; // content height below the top pad

/** Rule #5 — leave room for padding + border. */
export const BOARD_MAX_W = Math.min(SCREEN_W - 32, 380);

/** Rule #4 — the parent's padding + border, counted once per side. */
export const BOARD_PAD = 10;
export const BOARD_BORDER = 1;
export const BOARD_FRAME = BOARD_PAD + BOARD_BORDER; // 11

/* ------------------------------------------------------------------ *
 * Timeline geometry
 * ------------------------------------------------------------------ */
export const CARD_W = 132; // specimen label
export const CARD_H = 104;
export const GAP_W = 34; // closed drop gap
export const GAP_OPEN_W = 118; // opened gap during a drag
export const SLOT_W = CARD_W + GAP_W;
export const SPINE_LABEL_H = 44; // era ticks + labels above the spine
export const RAIL_H = CARD_H + 2 * BOARD_FRAME + SPINE_LABEL_H;
export const RAIL_PAD_H = 16; // contentContainer horizontal padding
/** The floating bar must never cover the rail. */
export const RAIL_PAD_BOTTOM = 168;

export const CURRENT_CARD_W = 150;
export const CURRENT_CARD_H = 118;
export const CURRENT_CARD_BOTTOM = 112;

export const FLOATING_BAR_H = 72;
export const FLOATING_BAR_BOTTOM = 24;

/** Within this many px of a rail edge the drag starts auto-scrolling. */
export const AUTOSCROLL_EDGE = 56;
export const AUTOSCROLL_TICK_MS = 16;
export const AUTOSCROLL_STEP = 9;

/** Switch the open gap only when a new one is this much nearer (anti-jitter). */
export const GAP_HYSTERESIS = 28;

/* ------------------------------------------------------------------ *
 * Round rules
 * ------------------------------------------------------------------ */
export const FOSSILS_PER_ROUND = 3;
export const ROUND_SIZE = 24; // cards dealt per round
export const MISSES_SHOWN = 3; // closest misses on the summary

/* ------------------------------------------------------------------ *
 * Timings (ms)
 * ------------------------------------------------------------------ */
export const T = {
  screenFade: 320,
  elementFade: 240,
  stamp: 180,
  gapOpen: 150,
  wrongGlide: 500,
  railRecentre: 350,
  fossilFade: 260,
  countUp: 900,
  stagger: 90,
  deckStagger: 60,
  breathe: 2200,
  handoff: 2500,
  resetArmWindow: 3000,
} as const;

/* ------------------------------------------------------------------ *
 * Settings
 * ------------------------------------------------------------------ */
export const FONT_SCALES = {S: 0.92, M: 1, L: 1.12} as const;
export type TextSizeKey = keyof typeof FONT_SCALES;
export type DateFormat = 'BCE' | 'BC';
