import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import theme from '../constants/theme';

type Props = {
  /** Distance from the outer border, 4-6 in this design. */
  inset?: number;
  color?: string;
  radius?: number;
};

/**
 * The project's visual signature: a second hairline border set inside the
 * outer one, as on a museum specimen label. Purely decorative, so it never
 * intercepts a touch.
 */
export const DoubleRule = memo(function DoubleRule({
  inset = 4,
  color = theme.colors.borderSoft,
  radius = theme.radius.xs,
}: Props) {
  return (
    <View
      pointerEvents="none"
      style={[
        styles.rule,
        {
          top: inset,
          left: inset,
          right: inset,
          bottom: inset,
          borderColor: color,
          borderRadius: radius,
        },
      ]}
    />
  );
});

const styles = StyleSheet.create({
  rule: {
    position: 'absolute',
    borderWidth: 1,
  },
});

export default DoubleRule;
