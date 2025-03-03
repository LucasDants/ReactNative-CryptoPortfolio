import React from 'react';
import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export function ListHeaderRoot({ style, ...rest }: ViewProps) {

  return (
    <View style={[styles.container, style]} {...rest} />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
