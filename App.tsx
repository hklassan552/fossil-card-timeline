import React, {useCallback, useRef, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';

import theme from './src/constants/theme';
import {DEFAULT_DECK_ID, type DeckId} from './src/game/decks';
import {
  EMPTY_BESTS,
  EMPTY_LIFETIME,
  EMPTY_RESULT,
  bestLengthFor,
  mergeBests,
  mergeLifetime,
  type Bests,
  type Lifetime,
  type RoundResult,
} from './src/game/scoring';
import {SettingsProvider} from './src/hooks/useAppSettings';
import ArchiveScreen from './src/screens/ArchiveScreen';
import EraStatsScreen from './src/screens/EraStatsScreen';
import GameOverScreen from './src/screens/GameOverScreen';
import GameScreen from './src/screens/GameScreen';
import HowToPlayScreen from './src/screens/HowToPlayScreen';
import LoaderScreen from './src/screens/LoaderScreen';
import MenuScreen from './src/screens/MenuScreen';
import PassAndPlayScreen from './src/screens/PassAndPlayScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SourcesScreen from './src/screens/SourcesScreen';

type Screen =
  | 'loader'
  | 'menu'
  | 'game'
  | 'gameover'
  | 'archive'
  | 'erastats'
  | 'passplay'
  | 'settings'
  | 'howto'
  | 'sources';

/** Screens rendered on the dark museum-at-closing-time field. */
const DARK_SCREENS: Screen[] = ['loader', 'gameover'];

/**
 * State machine only — no gameplay lives here (rule #2).
 * loader -> menu -> game -> gameover -> menu is the mandatory core path;
 * the six secondary screens each return to 'menu' with a single onBack.
 */
function App(): React.JSX.Element {
  const [screen, setScreen] = useState<Screen>('loader');
  const [deckId, setDeckId] = useState<DeckId>(DEFAULT_DECK_ID);
  const [bests, setBests] = useState<Bests>(EMPTY_BESTS);
  const [lifetime, setLifetime] = useState<Lifetime>(EMPTY_LIFETIME);
  const [result, setResult] = useState<RoundResult>(EMPTY_RESULT);
  const [previousBest, setPreviousBest] = useState(0);
  const [players, setPlayers] = useState<string[] | null>(null);
  /** Bumped on every PLAY AGAIN so GameScreen remounts with a fresh deal. */
  const [roundKey, setRoundKey] = useState(0);

  // Read inside callbacks so the summary can compare against the pre-round best
  // without depending on the render that produced it.
  const bestsRef = useRef(bests);
  bestsRef.current = bests;

  // How-to is reachable from the floating bar mid-round, so it remembers where
  // it was opened from and the round stays mounted underneath.
  const screenRef = useRef<Screen>(screen);
  screenRef.current = screen;
  const helpFromRef = useRef<Screen>('menu');

  const goMenu = useCallback(() => {
    setPlayers(null);
    setScreen('menu');
  }, []);

  const startRound = useCallback(() => {
    setRoundKey(k => k + 1);
    setScreen('game');
  }, []);

  const startSolo = useCallback(() => {
    setPlayers(null);
    setRoundKey(k => k + 1);
    setScreen('game');
  }, []);

  const startSession = useCallback((names: string[]) => {
    setPlayers(names);
    setRoundKey(k => k + 1);
    setScreen('game');
  }, []);

  const handleGameOver = useCallback(
    (roundResult: RoundResult, seenIds: number[]) => {
      setPreviousBest(bestLengthFor(bestsRef.current, roundResult.deckId));
      setBests(prev => mergeBests(prev, roundResult));
      setLifetime(prev => mergeLifetime(prev, roundResult, seenIds));
      setResult(roundResult);
      setScreen('gameover');
    },
    [],
  );

  const resetProgress = useCallback(() => {
    setBests(EMPTY_BESTS);
    setLifetime(EMPTY_LIFETIME);
    setResult(EMPTY_RESULT);
    setPreviousBest(0);
  }, []);

  const showArchive = useCallback(() => setScreen('archive'), []);
  const showEraStats = useCallback(() => setScreen('erastats'), []);
  const showPassPlay = useCallback(() => setScreen('passplay'), []);
  const showSettings = useCallback(() => setScreen('settings'), []);
  const showHowTo = useCallback(() => {
    helpFromRef.current = screenRef.current === 'game' ? 'game' : 'menu';
    setScreen('howto');
  }, []);
  const closeHowTo = useCallback(() => setScreen(helpFromRef.current), []);
  const showSources = useCallback(() => setScreen('sources'), []);
  const loaderDone = useCallback(() => setScreen('menu'), []);

  const dark = DARK_SCREENS.indexOf(screen) >= 0;
  // Keep the round alive while the help sheet is open over it.
  const gameMounted =
    screen === 'game' || (screen === 'howto' && helpFromRef.current === 'game');

  return (
    <SettingsProvider>
      <View style={styles.root}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={dark ? 'light-content' : 'dark-content'}
        />

        {screen === 'loader' ? <LoaderScreen onDone={loaderDone} /> : null}

        {screen === 'menu' ? (
          <MenuScreen
            deckId={deckId}
            bests={bests}
            lifetime={lifetime}
            onSelectDeck={setDeckId}
            onPlay={startSolo}
            onArchive={showArchive}
            onEraStats={showEraStats}
            onPassPlay={showPassPlay}
            onSettings={showSettings}
            onHowTo={showHowTo}
            onSources={showSources}
          />
        ) : null}

        {gameMounted ? (
          <GameScreen
            key={`${deckId}-${roundKey}`}
            deckId={deckId}
            players={players}
            onGameOver={handleGameOver}
            onBack={goMenu}
            onHowTo={showHowTo}
          />
        ) : null}

        {screen === 'gameover' ? (
          <GameOverScreen
            result={result}
            previousBest={previousBest}
            bests={bests}
            onPlayAgain={startRound}
            onMenu={goMenu}
            onArchive={showArchive}
          />
        ) : null}

        {screen === 'archive' ? (
          <ArchiveScreen seenIds={lifetime.seenIds} onBack={goMenu} />
        ) : null}

        {screen === 'erastats' ? (
          <EraStatsScreen lifetime={lifetime} onBack={goMenu} />
        ) : null}

        {screen === 'passplay' ? (
          <PassAndPlayScreen onStart={startSession} onBack={goMenu} />
        ) : null}

        {screen === 'settings' ? (
          <SettingsScreen onBack={goMenu} onResetProgress={resetProgress} />
        ) : null}

        {screen === 'howto' ? (
          <View style={styles.overlay}>
            <HowToPlayScreen onBack={closeHowTo} />
          </View>
        ) : null}

        {screen === 'sources' ? <SourcesScreen onBack={goMenu} /> : null}
      </View>
    </SettingsProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
