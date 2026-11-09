/**
 * WARM_EARTHY preset (design-system/presets.ts) with the FossilCardTimeline
 * brief overrides applied to the accent colours only.
 * The `name` field MUST stay exactly as in the preset (rule #11b).
 */
export const theme = {
  name: 'warm-earthy',

  colors: {
    // limestone field
    bg: '#ECE5D8',
    bgLight: '#F4EEE2',
    bgDeep: '#DFD6C4',

    // specimen-label surfaces
    surface: '#FAF6EC',
    surfaceAlt: 'rgba(255,255,255,0.55)',
    surfaceSunk: 'rgba(34,37,31,0.045)',

    // rules / hairlines
    border: '#B9AE97',
    borderSoft: 'rgba(185,174,151,0.55)',
    divider: 'rgba(74,93,78,0.18)',

    // moss green
    primary: '#4A5D4E',
    primaryDeep: '#3A4A3E',
    primarySoft: 'rgba(74,93,78,0.10)',

    // amber
    accent: '#D18F2E',
    accentDeep: '#C07E22',
    accentSoft: 'rgba(209,143,46,0.12)',
    accentShadow: '#8A5A14',

    // type
    text: '#22251F',
    textMid: '#3A3C33',
    textMuted: '#8E8878',
    onDark: '#ECE5D8',
    onDarkMuted: 'rgba(236,229,216,0.70)',

    // dark museum-at-closing-time field
    darkTop: '#1A1C17',
    darkMid: '#22251F',
    darkBottom: '#2F3A30',

    // semantic
    correct: '#5B7A54',
    wrong: '#B4542E',
  },

  gradients: {
    // Loader: dark, the inverse of the limestone menu
    loader: ['#1A1C17', '#22251F', '#2F3A30'],
    // GameOver: closing time
    dark: ['#2F3A30', '#22251F', '#1A1C17'],
    // Menu field
    light: ['#F4EEE2', '#ECE5D8', '#DFD6C4'],
    // Game field — lighter wash than the menu so the screens read differently
    game: [
      'rgba(244,238,226,0.88)',
      'rgba(236,229,216,0.94)',
      'rgba(201,190,170,0.90)',
    ],
    // amber CTA
    cta: ['#D18F2E', '#C07E22'],
    // moss -> amber progress fills
    progress: ['#4A5D4E', '#D18F2E'],
    blobAmber: ['rgba(209,143,46,0.16)', 'rgba(209,143,46,0)'],
    blobMoss: ['rgba(74,93,78,0.14)', 'rgba(74,93,78,0)'],
  },

  typography: {
    hero: {
      fontFamily: 'serif',
      fontSize: 34,
      fontWeight: '700' as const,
      letterSpacing: 5.5,
    },
    heroAlt: {
      fontFamily: 'serif',
      fontSize: 28,
      fontWeight: '700' as const,
      letterSpacing: 2.4,
    },
    title: {
      fontFamily: 'serif',
      fontSize: 22,
      fontWeight: '700' as const,
      letterSpacing: 1.2,
    },
    titleSm: {
      fontFamily: 'serif',
      fontSize: 15,
      fontWeight: '700' as const,
      letterSpacing: 0.6,
    },
    body: {
      fontSize: 15,
      fontWeight: '400' as const,
      lineHeight: 22,
      letterSpacing: 0.2,
    },
    bodySm: {
      fontSize: 13,
      fontWeight: '400' as const,
      lineHeight: 20,
      letterSpacing: 0.2,
    },
    caption: {fontSize: 11, fontWeight: '700' as const, letterSpacing: 1.6},
    captionXs: {fontSize: 10, fontWeight: '700' as const, letterSpacing: 1.8},
    button: {
      fontSize: 15,
      fontWeight: '800' as const,
      letterSpacing: 2.2,
      lineHeight: 24,
    },
  },

  // numerals: tabular everywhere a date / score / percent is printed
  numerals: {fontVariant: ['tabular-nums'] as const},

  radius: {xs: 4, sm: 6, md: 8, lg: 10, xl: 12, full: 999},

  spacing: {xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32},

  shadows: {
    // EDITORIAL style: almost no shadow. Elevation never exceeds 8.
    cta: {
      shadowColor: '#8A5A14',
      shadowOpacity: 0.32,
      shadowRadius: 10,
      shadowOffset: {width: 0, height: 5},
      elevation: 6,
    },
    bar: {
      shadowColor: '#22251F',
      shadowOpacity: 0.14,
      shadowRadius: 14,
      shadowOffset: {width: 0, height: 4},
      elevation: 8,
    },
    card: {
      shadowColor: '#22251F',
      shadowOpacity: 0.25,
      shadowRadius: 12,
      shadowOffset: {width: 0, height: 6},
      elevation: 7,
    },
    none: {elevation: 0},
  },

  animation: {
    card: {tension: 52, friction: 10},
    gap: {tension: 70, friction: 11},
    press: {tension: 300, friction: 18},
    plate: {tension: 46, friction: 9},
  },
  // NOTE: no `as const` on the object. LinearGradient's `colors` prop takes a
  // mutable (string | number)[], and a readonly tuple is not assignable to it.
};

export type Theme = typeof theme;
export default theme;
