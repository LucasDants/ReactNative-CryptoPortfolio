import React from 'react';

import { TextInput, TextInputProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type RefType = React.ForwardedRef<TextInput>;

type Props = TextInputProps

export const BaseInput = React.forwardRef(({ style, ...rest }: Props, ref: RefType) => {
  return (
    <TextInput
      placeholderTextColor="#FFFFFF80"
      keyboardAppearance="dark"
      style={[styles.container, style]}
      {...rest}
      ref={ref}
    />
  );
});


const styles = StyleSheet.create(theme => ({
  container: {
    minHeight: 60,

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

    color: theme.colors.white,
    fontFamily: theme.fonts.inter.regular,
    fontSize: {
      sm: theme.fontSize.lg,
      md: theme.fontSize.xl,
      lg: theme.fontSize['3xl'],
    },
  },
}));
