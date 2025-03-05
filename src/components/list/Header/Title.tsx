import React from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type ListHeaderTitleProps = TextProps

export function ListHeaderTitle({ style, ...rest }: ListHeaderTitleProps) {
  return (
    <RNText style={[styles.text, style]} {...rest} />
  );
}

const styles = StyleSheet.create((theme) => ({
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSize.xl,
    fontFamily: theme.fonts.inter.semibold,
  },
}));



