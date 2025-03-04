import { CoinAvailable } from '@/@types';
import { CoinImage } from '@/components/CoinImage';
import { ListItem } from '@/components/list/Item';
import { formatNumberToFiat } from '@/utils/formatNumberToFiat';
import { formatNumberToMaxDisplay } from '@/utils/formatNumberToMaxDisplay';
import React, { memo } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type CoinListItemProps = TouchableOpacityProps & {
  coin: CoinAvailable
  coinName: string
  coinAmount: number
  fiatAmount: number
}

function CoinListItemComponent({ coin, coinName, coinAmount, fiatAmount, style, ...rest }: CoinListItemProps) {
  const fiatAmountFormatted = formatNumberToFiat({ number: fiatAmount });
  const coinAmountFormatted = formatNumberToMaxDisplay(coinAmount);

  return (
    <ListItem.Root style={[styles.container, style]} {...rest}>
      <CoinImage coin={coin} />
      <ListItem.Column>
        <ListItem.Text>{coin}</ListItem.Text>
        <ListItem.Text typography="subtitle">{coinName}</ListItem.Text>
      </ListItem.Column>
      <ListItem.Column variant="reverse">
        <ListItem.Text>{coinAmountFormatted}</ListItem.Text>
        <ListItem.Text typography="subtitle">{fiatAmountFormatted}</ListItem.Text>
      </ListItem.Column>
    </ListItem.Root>
  );
}

export const CoinListItem = memo(CoinListItemComponent, (prev, next) => prev.coinAmount === next.coinAmount && prev.fiatAmount === next.fiatAmount);

const styles = StyleSheet.create(theme => ({
  container: {
    marginHorizontal: theme.spacing[5],
  },
}));



