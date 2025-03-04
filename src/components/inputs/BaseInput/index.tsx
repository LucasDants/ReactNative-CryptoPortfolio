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
    borderRadius: theme.shapes.md,
    padding: theme.spacing[4],
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing[3],

    color: theme.colors.white,
    fontSize: theme.fontSize.lg,
  },
}));
