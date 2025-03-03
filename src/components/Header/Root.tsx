import React from 'react';
import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export function HeaderRoot({ style, ...rest }: ViewProps) {
  return (
    <View style={[styles.container, style]} {...rest} />
  );
}

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    marginBottom: theme.spacing[4],
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
