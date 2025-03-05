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
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fonts.inter.regular,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  icon: {
    fontSize: theme.fontSize['2xl'],
  },
}));
