
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';


type ButtonProps = TouchableOpacityProps & {
  isLoading?: boolean
  children: string
}

export function Button({ isLoading, style, children, ...rest }: ButtonProps) {
  styles.useVariants({ disabled: rest.disabled });

  return (
    <TouchableOpacity style={[styles.button, style]} activeOpacity={0.7} {...rest} >
      {
        isLoading ?
          (<ActivityIndicator color="white" />)
          : (<Text style={styles.text}>{children}</Text>)
      }
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create(theme => ({
  button: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    paddingVertical: {
      sm: theme.spacing[4],
      md: theme.spacing[5],
      lg: theme.spacing[7],
    },
    borderRadius: {
      sm: theme.shapes.md,
      lg: theme.shapes.lg,
    },

    variants: {
      disabled: {
        true: {
          opacity: 0.6,
        },
        false: {
          opacity: 1,
        },
        default: {
          opacity: 1,
        },
      },
    },
  },
  text: {
    color: theme.colors.white,
    fontFamily: theme.fonts.inter.semibold,
    fontSize: {
      sm: theme.fontSize.lg,
      md: theme.fontSize.xl,
      lg: theme.fontSize['3xl'],
    },
  },

}));



