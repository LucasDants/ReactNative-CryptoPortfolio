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
    fontSize: theme.fontSize.xl,
    fontWeight: '600',
  },
}));



