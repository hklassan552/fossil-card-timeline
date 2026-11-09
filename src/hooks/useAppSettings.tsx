import React, {createContext, useContext, useMemo, useState} from 'react';

import {
  FONT_SCALES,
  type DateFormat,
  type TextSizeKey,
} from '../constants/config';

type SettingsValue = {
  soundOn: boolean;
  dateFormat: DateFormat;
  textSize: TextSizeKey;
  /** Multiplier applied to body copy, derived from textSize. */
  fontScale: number;
  setSoundOn: (v: boolean) => void;
  setDateFormat: (v: DateFormat) => void;
  setTextSize: (v: TextSizeKey) => void;
};

const FALLBACK: SettingsValue = {
  soundOn: true,
  dateFormat: 'BCE',
  textSize: 'M',
  fontScale: 1,
  setSoundOn: () => {},
  setDateFormat: () => {},
  setTextSize: () => {},
};

const SettingsContext = createContext<SettingsValue>(FALLBACK);

export function SettingsProvider({children}: {children: React.ReactNode}) {
  const [soundOn, setSoundOn] = useState(true);
  const [dateFormat, setDateFormat] = useState<DateFormat>('BCE');
  const [textSize, setTextSize] = useState<TextSizeKey>('M');

  const value = useMemo<SettingsValue>(
    () => ({
      soundOn,
      dateFormat,
      textSize,
      fontScale: FONT_SCALES[textSize],
      setSoundOn,
      setDateFormat,
      setTextSize,
    }),
    [soundOn, dateFormat, textSize],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

/** Pull only what a component needs — never the whole app state (rule: react-state-minimize). */
export function useSettings(): SettingsValue {
  return useContext(SettingsContext);
}

export function useDateFormat(): DateFormat {
  return useContext(SettingsContext).dateFormat;
}

export function useFontScale(): number {
  return useContext(SettingsContext).fontScale;
}

export default useSettings;
