import React from 'react';
import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type ColumnProps = ViewProps & {
  variant?: 'reverse'
}

export function ListItemColumn({ variant, style, ...props }: ColumnProps) {
  styles.useVariants({ alignment: variant });

  return (
    <View style={[styles.container, style]} {...props} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    variants: {
      alignment: {
        reverse: {
          alignItems: 'flex-end',
        },
      },
    },
  },
});



