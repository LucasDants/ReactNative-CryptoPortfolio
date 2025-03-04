import { CoinAvailable, CoinOperation } from '@/@types';
import { ListItem } from '@/components/list/Item';
import { formatNumberToFiat } from '@/utils/formatNumberToFiat';
import React, { memo } from 'react';
import { TouchableOpacityProps, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Icon } from '@/components/Icon';
import { formatNumberToMaxDisplay } from '@/utils/formatNumberToMaxDisplay';
import dayjs from 'dayjs';


type CoinListItemProps = TouchableOpacityProps & {
  coin: CoinAvailable
  type: CoinOperation
  date: Date
  quantity: number
  pricePerCoin: number
}

const icons = {
  buy: 'arrow-up',
  sell: 'arrow-down',
} as const;

function TransactionListItemComponent({ coin, date, type, quantity, pricePerCoin, style, ...rest }: CoinListItemProps) {
  const dateFormatted = dayjs(date).format('DD/MM/YYYY');
  const quantityFormatted = formatNumberToMaxDisplay(quantity);
  const priceFormatted = formatNumberToFiat({ number: pricePerCoin, currencyDisplay: 'symbol' });

  styles.useVariants({ type });

  return (
    <ListItem.Root style={[styles.container, style]} {...rest}>
      <View style={styles.iconWrapper}>
        <Icon name={icons[type]} style={styles.icon} />
      </View>
      <ListItem.Column>
        <ListItem.Text style={styles.textType}>{type}</ListItem.Text>
        <ListItem.Text typography="subtitle">{dateFormatted}</ListItem.Text>
      </ListItem.Column>
      <ListItem.Column variant="reverse">
        <ListItem.Text>{quantityFormatted}</ListItem.Text>
        <ListItem.Text typography="subtitle">{priceFormatted}/{coin}</ListItem.Text>
      </ListItem.Column>
    </ListItem.Root>
  );
}

export const TransactionListItem = memo(TransactionListItemComponent, (prev, next) => prev.quantity === next.quantity && prev.pricePerCoin === next.pricePerCoin);

const styles = StyleSheet.create(theme => ({
  container: {
    marginHorizontal: theme.spacing[5],
  },
  textType: {
    textTransform: 'capitalize',
  },
  iconWrapper: {
    padding: theme.spacing[1],
    borderRadius: 120,
    variants: {
      type: {
        buy: {
          backgroundColor: theme.colors.success + '80',
        },
        sell: {
          backgroundColor: theme.colors.primary + '80',
        },
      },
    },
  },
  icon: {
    fontSize: theme.fontSize['3xl'],
  },
}));



