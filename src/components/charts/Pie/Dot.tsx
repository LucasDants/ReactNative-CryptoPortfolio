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
    height: 10,
    width: 10,
    borderRadius: 5,
  },
});
