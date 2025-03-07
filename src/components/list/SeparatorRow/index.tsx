import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export function ListSeparatorRow() {
  return (
    <View style={styles.container} />
  );
}

const styles = StyleSheet.create(theme => ({
  container: {
    height: {
      sm: theme.spacing[3],
      md: theme.spacing[4],
      lg: theme.spacing[6],
    },
  },
}));

export const LIST_ITEM_SEPARATOR_HEIGHT = styles.container.height;





