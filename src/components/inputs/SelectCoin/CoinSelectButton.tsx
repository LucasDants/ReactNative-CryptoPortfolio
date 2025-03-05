import React from 'react';

import { Text, TouchableOpacityProps } from 'react-native';

import { CoinAvailable } from '@/@types';
import { CoinImage } from '@/components/CoinImage';
import { Icon } from '@/components/Icon';
import { ListItem } from '@/components/list/Item';
import { CRYPTOCURRENCIES } from '@/config/cryptocurrencies';
import { StyleSheet } from 'react-native-unistyles';

type Props = TouchableOpacityProps & {
  coin?: CoinAvailable;
};

export function CoinSelectButton({ coin, style, ...rest }: Props) {

  return (
    <>
      <ListItem.Root style={style} {...rest}>
        {
          coin != null ? (
            <>
              <CoinImage coin={coin} />
              <ListItem.Column>
                <ListItem.Text>{coin}</ListItem.Text>
                <ListItem.Text typography="subtitle">{CRYPTOCURRENCIES[coin].name}</ListItem.Text>
              </ListItem.Column>
            </>
          ) : (
            <>
              <ListItem.Column>
                <Text style={styles.emptyText}>Select your coin</Text>
              </ListItem.Column>
            </>
          )
        }
        <ListItem.Column style={styles.iconWrapper} variant="reverse">
          <Icon name="chevron-down" color="primary" style={styles.icon} />
        </ListItem.Column>
      </ListItem.Root>
    </>
  );
}


const styles = StyleSheet.create(theme => ({
  emptyText: {
    color: theme.colors.white,
    fontFamily: theme.fonts.inter.regular,
    fontSize: {
      sm: theme.fontSize.lg,
      md: theme.fontSize.xl,
      lg: theme.fontSize['3xl'],
    },
  },
  iconWrapper: {
    width: {
      sm: 40,
      md: 46,
      lg: 60,
    },
    height: {
      sm: 40,
      md: 46,
      lg: 60,
    },
    justifyContent: 'center',
  },
  icon: {
    fontSize: {
      sm: theme.fontSize['2xl'],
      md: theme.fontSize['3xl'],
      lg: theme.fontSize['5xl'],
    },
  },
}));
