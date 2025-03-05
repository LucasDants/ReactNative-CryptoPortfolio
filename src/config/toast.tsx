import React from 'react';
import { Text } from 'react-native';
import { ErrorToast, SuccessToast, ToastProps } from 'react-native-toast-message';
import { StyleSheet } from 'react-native-unistyles';

export const toastConfig = {
  success: (props: ToastProps) => (
    <SuccessToast
      {...props}
      style={[styles.container, styles.successColor]}
      contentContainerStyle={styles.content}
      text1Style={styles.title}
      text2Style={styles.description}
      text1NumberOfLines={1}
      text2NumberOfLines={2}
      renderTrailingIcon={() => <Text style={styles.icon}>😁</Text>}
    />
  ),

  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={[styles.container, styles.errorColor]}
      contentContainerStyle={styles.content}
      text1Style={styles.title}
      text2Style={styles.description}
      text1NumberOfLines={1}
      text2NumberOfLines={2}
      renderTrailingIcon={() => <Text style={styles.icon}>😡</Text>}
    />
  ),
};


const styles = StyleSheet.create(theme => ({
  container: {
    width: '90%',
    height: undefined,
    alignItems: 'center',
    backgroundColor: theme.colors.shape,
    paddingVertical: {
      sm: theme.spacing[3],
      md: theme.spacing[4],
      lg: theme.spacing[6],
    },
    paddingHorizontal: {
      sm: theme.spacing[5],
      md: theme.spacing[6],
      lg: theme.spacing[8],
    },
    borderLeftWidth: {
      sm: 5,
      md: 6,
      lg: 9,
    },
    borderRadius: {
      sm: theme.shapes.md,
      lg: theme.shapes.lg,
    },
  },
  content: {
    paddingLeft: 0,
    gap: theme.spacing[0.5],
  },
  title: {
    color: theme.colors.white,
    fontFamily: theme.fonts.inter.medium,
    fontSize: {
      sm: theme.fontSize.sm,
      md: theme.fontSize.md,
      lg: theme.fontSize.xl,
    },
  },
  description: {
    color: theme.colors.white,
    fontFamily: theme.fonts.inter.regular,
    fontSize: {
      sm: theme.fontSize.xs,
      md: theme.fontSize.sm,
      lg: theme.fontSize.lg,
    },
  },
  successColor: {
    borderLeftColor: theme.colors.success,
  },
  errorColor: {
    borderLeftColor: theme.colors.primary + '80',
  },
  icon: {
    fontSize: {
      sm: theme.fontSize.xl,
      md: theme.fontSize['2xl'],
      lg: theme.fontSize['4xl'],
    },
  },
}));
