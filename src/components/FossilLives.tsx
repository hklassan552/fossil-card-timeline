import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Bone} from 'lucide-react-native';

import theme from '../constants/theme';

type Props = {
  total: number;
  remaining: number;
  size?: 14 | 18;
};

/**
 * Three amber fossils. A spent one is not removed — it goes dark, so the row
 * keeps its width and the header never reflows mid-round.
 */
export const FossilLives = memo(function FossilLives({
  total,
  remaining,
  size = 18,
}: Props) {
  const slots: number[] = [];
  for (let i = 0; i < total; i++) slots.push(i);

  return (
    <View
      style={styles.row}
      accessibilityLabel={`${remaining} of ${total} fossils remaining`}>
      {slots.map(i => {
        const spent = i >= remaining;
        return (
          <View
            key={i}
            style={[
              styles.plate,
              {
                width: size + 8,
                height: size + 8,
                opacity: spent ? 0.22 : 1,
                borderColor: spent
                  ? 'rgba(185,174,151,0.5)'
                  : 'rgba(209,143,46,0.55)',
              },
            ]}>
            <Bone
              size={size}
              color={spent ? theme.colors.border : theme.colors.accent}
              strokeWidth={2.2}
            />
          </View>
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  plate: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.xs,
    borderWidth: 1,
  },
});

export default FossilLives;
