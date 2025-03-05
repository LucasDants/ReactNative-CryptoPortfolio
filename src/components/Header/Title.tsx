import React from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type HeaderTitleProps = TextProps

export function HeaderTitle({ style, ...rest }: HeaderTitleProps) {
  return (
    <RNText style={[styles.text, style]} {...rest} />
  );
}

const styles = StyleSheet.create((theme) => ({
  text: {
    color: theme.colors.white,
    fontFamily: theme.fonts.inter.semibold,
    fontSize: {
      sm: theme.fontSize.xl,
      md: theme.fontSize['2xl'],
      lg: theme.fontSize['4xl'],
    },
  },
}));



