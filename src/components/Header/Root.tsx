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
    marginBottom: {
      sm: theme.spacing[4],
      md: theme.spacing[5],
      lg: theme.spacing[7],
    },
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
