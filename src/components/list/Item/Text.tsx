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
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fonts.inter.semibold,

    variants: {
      color: {
        primary: {
          color: theme.colors.primary,
        },
      },

      typography: {
        subtitle: {
          fontSize: theme.fontSize.sm,
          fontFamily: theme.fonts.inter.regular,
        },
      },
    },
  },
}));



