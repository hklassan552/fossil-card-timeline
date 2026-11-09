import {useCallback, useEffect, useRef} from 'react';
import type {ScrollView} from 'react-native';

import {
  AUTOSCROLL_EDGE,
  AUTOSCROLL_STEP,
  AUTOSCROLL_TICK_MS,
  SCREEN_W,
} from '../constants/config';

type Args = {
  scrollRef: React.RefObject<ScrollView>;
  /** Live scroll offset, kept in a ref so callbacks never read stale state. */
  offsetRef: React.MutableRefObject<number>;
  /** Total scrollable width minus the viewport; 0 when nothing overflows. */
  maxOffsetRef: React.MutableRefObject<number>;
};

/**
 * While a card is being dragged, nudges the rail when the finger sits inside
 * `AUTOSCROLL_EDGE` of either edge. All mutable data lives in refs (rule #8) —
 * the interval callback must never close over stale state.
 */
export function useAutoScroll({scrollRef, offsetRef, maxOffsetRef}: Args) {
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const directionRef = useRef(0);

  const stop = useCallback(() => {
    if (timer.current !== null) {
      clearInterval(timer.current);
      timer.current = null;
    }
    directionRef.current = 0;
  }, []);

  const tick = useCallback(() => {
    const dir = directionRef.current;
    if (dir === 0) return;
    const max = maxOffsetRef.current;
    const next = Math.max(
      0,
      Math.min(max, offsetRef.current + dir * AUTOSCROLL_STEP),
    );
    if (next === offsetRef.current) return;
    offsetRef.current = next;
    scrollRef.current?.scrollTo({x: next, y: 0, animated: false});
  }, [maxOffsetRef, offsetRef, scrollRef]);

  /** Call on every drag move with the finger's screen X. */
  const onFingerX = useCallback(
    (x: number) => {
      let dir = 0;
      if (x < AUTOSCROLL_EDGE) dir = -1;
      else if (x > SCREEN_W - AUTOSCROLL_EDGE) dir = 1;

      directionRef.current = dir;
      if (dir === 0) {
        stop();
        return;
      }
      if (timer.current === null) {
        timer.current = setInterval(tick, AUTOSCROLL_TICK_MS);
      }
    },
    [stop, tick],
  );

  /** Animated glide to a given offset — used to re-centre after a placement. */
  const scrollToOffset = useCallback(
    (x: number, animated = true) => {
      const max = maxOffsetRef.current;
      const clamped = Math.max(0, Math.min(max, x));
      offsetRef.current = clamped;
      scrollRef.current?.scrollTo({x: clamped, y: 0, animated});
    },
    [maxOffsetRef, offsetRef, scrollRef],
  );

  useEffect(() => stop, [stop]);

  return {onFingerX, stop, scrollToOffset};
}

export default useAutoScroll;
