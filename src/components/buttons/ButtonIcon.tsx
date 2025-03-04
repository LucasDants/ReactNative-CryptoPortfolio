
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
    padding: theme.spacing[1],
  },
  icon: {
    variants: {
      size: {
        sm: {
          fontSize: theme.fontSize.xl,
        },
        default: {
          fontSize: theme.fontSize['2xl'],
        },
        lg: {
          fontSize: theme.fontSize['3xl'],
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



