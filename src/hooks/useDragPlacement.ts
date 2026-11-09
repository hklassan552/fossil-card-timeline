import {useCallback, useRef, useState} from 'react';

import {
  CARD_W,
  GAP_HYSTERESIS,
  GAP_OPEN_W,
  GAP_W,
  RAIL_PAD_H,
} from '../constants/config';

/**
 * Content-space X of the centre of gap `i`, given which gap is currently
 * widened. Every gap after the open one is pushed right by the extra width.
 */
export function gapCentreX(i: number, openIndex: number): number {
  const extra = openIndex >= 0 && openIndex < i ? GAP_OPEN_W - GAP_W : 0;
  const start = RAIL_PAD_H + i * (GAP_W + CARD_W) + extra;
  const width = i === openIndex ? GAP_OPEN_W : GAP_W;
  return start + width / 2;
}

/**
 * Nearest gap to the finger. Because opening a gap moves the gaps after it,
 * the calculation feeds back on itself — `GAP_HYSTERESIS` stops it oscillating
 * between two neighbours.
 */
export function pickGap(
  fingerX: number,
  scrollOffset: number,
  openIndex: number,
  gapCount: number,
): number {
  let best = openIndex >= 0 ? openIndex : 0;
  let bestDist = Number.POSITIVE_INFINITY;

  for (let i = 0; i < gapCount; i++) {
    const screenX = gapCentreX(i, openIndex) - scrollOffset;
    const dist = Math.abs(fingerX - screenX);
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  }

  if (openIndex < 0 || best === openIndex) return best;

  const currentDist = Math.abs(
    fingerX - (gapCentreX(openIndex, openIndex) - scrollOffset),
  );
  return currentDist - bestDist > GAP_HYSTERESIS ? best : openIndex;
}

type Args = {
  /** placed.length + 1 gaps are available. */
  gapCount: number;
  offsetRef: React.MutableRefObject<number>;
  onFingerX: (x: number) => void;
  onStopAutoScroll: () => void;
  onCommit: (gapIndex: number) => void;
};

/**
 * Tracks which drop gap is open while a card is dragged. The committed value
 * lives in a ref so the release callback can never read a stale index; the
 * mirrored state exists only so the gaps re-render.
 */
export function useDragPlacement({
  gapCount,
  offsetRef,
  onFingerX,
  onStopAutoScroll,
  onCommit,
}: Args) {
  const openRef = useRef(-1);
  const gapCountRef = useRef(gapCount);
  gapCountRef.current = gapCount;

  const [openGap, setOpenGap] = useState(-1);
  const [dragging, setDragging] = useState(false);

  const apply = useCallback((index: number) => {
    if (openRef.current === index) return;
    openRef.current = index;
    setOpenGap(index);
  }, []);

  const onDragStart = useCallback(
    (fingerX: number) => {
      setDragging(true);
      // No hysteresis on the first pick — snap straight to the nearest gap.
      apply(pickGap(fingerX, offsetRef.current, -1, gapCountRef.current));
    },
    [apply, offsetRef],
  );

  const onDragMove = useCallback(
    (fingerX: number) => {
      apply(
        pickGap(
          fingerX,
          offsetRef.current,
          openRef.current,
          gapCountRef.current,
        ),
      );
      onFingerX(fingerX);
    },
    [apply, offsetRef, onFingerX],
  );

  const onDragEnd = useCallback(() => {
    onStopAutoScroll();
    setDragging(false);
    const target = openRef.current;
    apply(-1);
    if (target >= 0) onCommit(target);
  }, [apply, onCommit, onStopAutoScroll]);

  const onDragCancel = useCallback(() => {
    onStopAutoScroll();
    setDragging(false);
    apply(-1);
  }, [apply, onStopAutoScroll]);

  return {openGap, dragging, onDragStart, onDragMove, onDragEnd, onDragCancel};
}

export default useDragPlacement;
