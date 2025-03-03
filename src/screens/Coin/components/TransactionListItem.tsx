import { CoinAvailable, CoinOperation } from '@/@types';
import { CoinImage } from '@/components/CoinImage';
import { ListItem } from '@/components/list/Item';
import { formatNumberToFiat } from '@/utils/formatNumberToFiat';
import React, { memo } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import dayjs from 'dayjs';


type CoinListItemProps = TouchableOpacityProps & {
  coin: CoinAvailable
  type: CoinOperation
  date: Date
  quantity: number
  pricePerCoin: number
}

function TransactionListItemComponent({ coin, date, type, quantity, pricePerCoin, style, ...rest }: CoinListItemProps) {
  const dateFormatted = dayjs(date).format('DD/MM/YYYY');
  const priceFormatted = formatNumberToFiat({ number: pricePerCoin, currencyDisplay: 'symbol' });

  return (
    <ListItem.Root style={[styles.container, style]} {...rest}>
      <CoinImage coin={coin} />
      <ListItem.Column>
        <ListItem.Text style={styles.textType}>{type}</ListItem.Text>
        <ListItem.Text typography="subtitle">{dateFormatted}</ListItem.Text>
      </ListItem.Column>
      <ListItem.Column variant="reverse">
        <ListItem.Text>{quantity}</ListItem.Text>
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
}));



