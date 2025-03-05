
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon, IconName } from '../Icon';

type ButtonIconProps = TouchableOpacityProps & {
  iconName: IconName
  size?: 'sm' | 'lg'
  color?: 'primary'
}

export function ButtonIcon({ iconName, size, color, style, ...rest }: ButtonIconProps) {
  styles.useVariants({ size, color });

  return (
    <TouchableOpacity style={[styles.container, style]} activeOpacity={0.7} {...rest} >
      <Icon name={iconName} style={styles.icon} />
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create(theme => ({
  container: {
    padding: {
      sm: theme.spacing[1],
      md: theme.spacing[1.5],
      lg: theme.spacing[2.5],
    },
  },
  icon: {
    variants: {
      size: {
        sm: {
          fontSize: {
            sm: theme.fontSize.xl,
            md: theme.fontSize['2xl'],
            lg: theme.fontSize['4xl'],
          },
        },
        default: {
          fontSize: {
            sm: theme.fontSize['2xl'],
            md: theme.fontSize['3xl'],
            lg: theme.fontSize['5xl'],
          },
        },
        lg: {
          fontSize: {
            sm: theme.fontSize['3xl'],
            md: theme.fontSize['4xl'],
            lg: theme.fontSize['6xl'],
          },
        },
      },
      color: {
        primary: {
          color: theme.colors.primary,
        },
      },
    },
  },
}));



