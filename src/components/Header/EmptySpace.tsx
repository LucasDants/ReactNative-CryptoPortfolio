import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export function HeaderEmptySpace() {
  return (
    <View style={styles.container} />
  );
}

const styles = StyleSheet.create(theme => ({
  container: {
    width: {
      sm: theme.fontSize['3xl'],
      md: theme.fontSize['4xl'],
      lg: theme.fontSize['6xl'],
    },
  },
}));
