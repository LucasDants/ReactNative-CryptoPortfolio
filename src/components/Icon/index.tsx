import VectorIcon from '@react-native-vector-icons/feather';
import React, { ComponentProps } from 'react';
import { StyleSheet } from 'react-native-unistyles';

type IconProps = ComponentProps<typeof VectorIcon>

export type IconName = IconProps['name']

export function Icon({ style, ...rest }: IconProps) {
  return <VectorIcon style={[styles.icon, style]} {...rest} />;
}

const styles = StyleSheet.create(theme => ({
  icon: {
    fontSize: {
      sm: theme.fontSize.sm,
      md: theme.fontSize.md,
      lg: theme.fontSize.xl,
    },
    color: theme.colors.white,
  },
}));
