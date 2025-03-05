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
    flexDirection: 'row',
    backgroundColor: theme.colors.shape,
    borderRadius: {
      sm: theme.shapes.md,
      lg: theme.shapes.lg,
    },
    padding: {
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



