import React from 'react';
import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export function ListHeaderActions({ style, ...rest }: ViewProps) {

  return (
    <View style={[styles.container, style]} {...rest} />
  );
}

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: theme.spacing[3],
  },
}));
