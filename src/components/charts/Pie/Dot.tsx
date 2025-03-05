import React from 'react';
import { ColorValue, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type Props = {
  color: ColorValue
}

export function PieLegendDot({ color }: Props) {

  return (
    <View
      style={[styles.container, { backgroundColor: color }]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: {
      sm: 10,
      md: 12,
      lg: 18,
    },
    width: {
      sm: 10,
      md: 12,
      lg: 18,
    },
    borderRadius: {
      sm: 5,
      md: 6,
      lg: 9,
    },
  },
});
