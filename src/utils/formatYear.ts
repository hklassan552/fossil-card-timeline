import type {DateFormat} from '../constants/config';

/**
 * Renders a signed card year as museum-label text.
 *   -252000000 -> "252 MYA"
 *   -1200      -> "1200 BCE" (or "1200 BC")
 *    1440      -> "1440"
 */
export function formatYear(year: number, fmt: DateFormat = 'BCE'): string {
  if (year <= -20000) {
    const abs = Math.abs(year);
    if (abs >= 1000000) {
      const mya = abs / 1000000;
      const rounded = mya >= 100 ? Math.round(mya) : Math.round(mya * 10) / 10;
      return `${trimZero(rounded)} MYA`;
    }
    return `${Math.round(abs / 1000)} KYA`;
  }
  if (year < 0) return `${Math.abs(year)} ${fmt}`;
  return `${year}`;
}

function trimZero(n: number): string {
  return Number.isInteger(n) ? `${n}` : n.toFixed(1);
}

/** The hidden date on an unrevealed card. */
export const UNKNOWN_DATE = '? ? ? ?';

/** Compact form for narrow rows: drops the era suffix for deep time. */
export function formatYearShort(year: number, fmt: DateFormat = 'BCE'): string {
  const full = formatYear(year, fmt);
  return full.length > 10 ? full.replace(' ', '') : full;
}

/** How far apart two years are, in human terms, for a miss row. */
export function formatDistance(a: number, b: number): string {
  const d = Math.abs(a - b);
  if (d >= 1000000)
    return `${trimZero(Math.round((d / 1000000) * 10) / 10)}M YRS`;
  if (d >= 1000) return `${Math.round(d / 1000)}K YRS`;
  return `${d} YRS`;
}

export function formatPercent(n: number): string {
  return `${Math.round(n)}%`;
}
