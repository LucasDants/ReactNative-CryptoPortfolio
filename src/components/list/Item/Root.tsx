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
    borderRadius: theme.shapes.md,
    padding: theme.spacing[4],
    justifyContent: 'space-between',
    gap: theme.spacing[3],
  },
}));



