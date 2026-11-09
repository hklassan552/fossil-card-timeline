import React, {memo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import assets from '../assets';
import {SCREEN_H, SCREEN_W} from '../constants/config';
import theme from '../constants/theme';

export type FrameVariant = 'loader' | 'menu' | 'game' | 'dark';

type Props = {
  variant: FrameVariant;
  children: React.ReactNode;
};

const C = theme.colors;

/**
 * Every screen sits on the same `bg_game` plate (asset contract) and is told
 * apart by its gradient wash and decor layer (rule #14).
 *
 * Depth, bottom to top:  photo plate -> gradient wash -> engraved decor -> content.
 */
export const ScreenFrame = memo(function ScreenFrame({
  variant,
  children,
}: Props) {
  const cfg = VARIANTS[variant];

  return (
    <View style={[styles.root, {backgroundColor: cfg.base}]}>
      <Image
        source={assets.bgGame}
        style={[StyleSheet.absoluteFill, {opacity: cfg.imageOpacity}]}
        resizeMode="cover"
      />
      <LinearGradient
        colors={cfg.gradient}
        locations={cfg.locations}
        start={START}
        end={END}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      {variant === 'loader' ? <LoaderDecor /> : null}
      {variant === 'menu' ? <MenuDecor /> : null}
      {variant === 'game' ? <GameDecor /> : null}
      {variant === 'dark' ? <DarkDecor /> : null}

      <View style={styles.content}>{children}</View>
    </View>
  );
});

/* ------------------------------------------------------------------ *
 * Decor layers — explicit per variant rather than boolean props
 * ------------------------------------------------------------------ */

const LoaderDecor = memo(function LoaderDecor() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {/* three concentric strata rules */}
      <View style={[styles.strata, {top: SCREEN_H * 0.32}]} />
      <View style={[styles.strata, {top: SCREEN_H * 0.46}]} />
      <View style={[styles.strata, {top: SCREEN_H * 0.6}]} />
      {/* amber blob behind the brand plate */}
      <LinearGradient
        colors={theme.gradients.blobAmber}
        style={[styles.blob, {top: SCREEN_H * 0.24, left: SCREEN_W / 2 - 140}]}
      />
    </View>
  );
});

const MenuDecor = memo(function MenuDecor() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={theme.gradients.blobAmber}
        style={[styles.blobSm, {top: -40, right: -50}]}
      />
      {ENGRAVED_ROWS.map(top => (
        <View key={top} style={[styles.engraved, {top}]} />
      ))}
    </View>
  );
});

const GameDecor = memo(function GameDecor() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {/* the moss "table edge" band behind the floating bar */}
      <View style={styles.tableEdge} />
      <LinearGradient
        colors={theme.gradients.blobMoss}
        style={[styles.blobSm, {top: -60, left: -60}]}
      />
    </View>
  );
});

const DarkDecor = memo(function DarkDecor() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={theme.gradients.blobAmber}
        style={[styles.blob, {top: -70, left: SCREEN_W / 2 - 140}]}
      />
      <View style={[styles.strata, {top: SCREEN_H * 0.54}]} />
      <View style={[styles.strata, {top: SCREEN_H * 0.66}]} />
    </View>
  );
});

const ENGRAVED_ROWS = [220, 246, 272, 298, 324];

const START = {x: 0, y: 0};
const END = {x: 0, y: 1};

const VARIANTS: Record<
  FrameVariant,
  {base: string; imageOpacity: number; gradient: string[]; locations: number[]}
> = {
  // Loader: dark, overlay well past 0.85 so no menu furniture could show through
  loader: {
    base: C.darkTop,
    imageOpacity: 0.22,
    gradient: [
      'rgba(26,28,23,0.93)',
      'rgba(34,37,31,0.90)',
      'rgba(47,58,48,0.87)',
    ],
    locations: [0, 0.55, 1],
  },
  // Menu: the limestone field
  menu: {
    base: C.bg,
    imageOpacity: 0.3,
    gradient: [
      'rgba(244,238,226,0.93)',
      'rgba(236,229,216,0.95)',
      'rgba(223,214,196,0.93)',
    ],
    locations: [0, 0.5, 1],
  },
  // Game: lighter wash than the menu, so the two screens read differently
  game: {
    base: C.bgLight,
    imageOpacity: 0.44,
    gradient: [
      'rgba(244,238,226,0.86)',
      'rgba(236,229,216,0.92)',
      'rgba(201,190,170,0.88)',
    ],
    locations: [0, 0.45, 1],
  },
  // GameOver: the museum at closing time
  dark: {
    base: C.darkMid,
    imageOpacity: 0.18,
    gradient: [
      'rgba(47,58,48,0.90)',
      'rgba(34,37,31,0.92)',
      'rgba(26,28,23,0.94)',
    ],
    locations: [0, 0.5, 1],
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  strata: {
    position: 'absolute',
    left: 48,
    right: 48,
    height: 1,
    backgroundColor: 'rgba(209,143,46,0.18)',
  },
  engraved: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: C.surfaceSunk,
  },
  blob: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
  },
  blobSm: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
  },
  tableEdge: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
    backgroundColor: 'rgba(74,93,78,0.08)',
  },
});

export default ScreenFrame;
