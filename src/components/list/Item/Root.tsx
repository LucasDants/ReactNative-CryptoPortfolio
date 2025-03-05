import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type Props = TouchableOpacityProps

export function ListItemRoot({ style, ...rest }: Props) {
  return (
    <TouchableOpacity style={[styles.container, style]} activeOpacity={0.7}  {...rest} />
  );
}

const styles = StyleSheet.create(theme => ({
  container: {
    height: {
      sm: 72,
      md: 86,
      lg: 116,
    },
    flexDirection: 'row',
    backgroundColor: theme.colors.shape,
    borderRadius: {
      sm: theme.shapes.md,
      lg: theme.shapes.lg,
    },
    paddingHorizontal: {
      sm: theme.spacing[4],
      md: theme.spacing[5],
      lg: theme.spacing[7],
    },
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: {
      sm: theme.spacing[3],
      md: theme.spacing[4],
      lg: theme.spacing[6],
    },
  },
}));

export const LIST_ITEM_HEIGHT = styles.container.height;



