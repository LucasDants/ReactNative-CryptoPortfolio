import React from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type ItemTextProps = TextProps & {
  color?: 'primary'
  typography?: 'subtitle'
}

export function ListItemText({ color, typography, style, ...rest }: ItemTextProps) {
  styles.useVariants({ color, typography });

  return (
    <RNText style={[styles.text, style]} {...rest} />
  );
}

const styles = StyleSheet.create((theme) => ({
  text: {
    color: theme.colors.white,
    fontFamily: theme.fonts.inter.semibold,

    fontSize: {
      sm: theme.fontSize.lg,
      md: theme.fontSize.xl,
      lg: theme.fontSize['3xl'],
    },

    variants: {
      color: {
        primary: {
          color: theme.colors.primary,
        },
      },

      typography: {
        subtitle: {
          fontSize: {
            sm: theme.fontSize.sm,
            md: theme.fontSize.md,
            lg: theme.fontSize.xl,
          },
          fontFamily: theme.fonts.inter.regular,
        },
      },
    },
  },
}));



