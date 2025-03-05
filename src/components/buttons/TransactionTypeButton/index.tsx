import { CoinOperation } from '@/@types';
import { Icon } from '@/components/Icon';
import React from 'react';
import { Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { StyleSheet } from 'react-native-unistyles';


const icons = {
  buy: 'arrow-up-circle',
  sell: 'arrow-down-circle',
} as const;

interface Props extends RectButtonProps {
  title: string;
  type: CoinOperation
  isActive: boolean
}

export function TransactionTypeButton({ title, type, isActive, style, ...rest }: Props) {
  styles.useVariants({ active: isActive, type });

  return (
    <View style={styles.container}>
      <RectButton style={[styles.button, style]} {...rest} >
        <Icon name={icons[type]} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.shape,
    borderRadius: theme.shapes.md,
    variants: {
      active: {
        true: {
          borderWidth: 0,
          backgroundColor: theme.colors.primary + '90',
        },
        false: {
          borderColor: theme.colors.shape,
          borderWidth: 1,
        },
      },
      type: {
        buy: {},
        sell: {},
      },
    },
    compoundVariants: [
      {
        active: true,
        type: 'buy',

        styles: {
          backgroundColor: theme.colors.success + '90',
        },
      },
      {
        active: true,
        type: 'sell',
        styles: {
          backgroundColor: theme.colors.primary + '90',
        },
      },
    ],
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing[4],
    gap: theme.spacing[2],
  },
  icon: {
    fontSize: theme.fontSize['2xl'],

    color: theme.colors.white,
  },
  title: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.white,
    fontFamily: theme.fonts.inter.medium,
  },
}));

