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
    paddingBottom: {
      sm: theme.spacing[2],
      md: theme.spacing[3],
      lg: theme.spacing[5],
    },
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
