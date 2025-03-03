import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';

import { AreaChart } from '@/components/charts/Area';
import { PieChart } from '@/components/charts/Pie/index';
import { StyleSheet } from 'react-native-unistyles';

import { CoinAvailable } from '@/@types';
import { HomeScreenProps } from '@/@types/@react-navigation/stack';
import { ButtonIcon } from '@/components/buttons/ButtonIcon';
import { ListHeader } from '@/components/list/Header';
import { TotalBalanceCard } from '@/components/TotalBalanceCard';
import { CRYPTOCURRENCIES } from '@/config/cryptocurrencies';
import { useQuery } from '@/database/index';
import { Transaction } from '@/database/schemas/transaction';
import { CoinListItem } from './components/CoinListItem';

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const transactionsQuery = useQuery(Transaction);
  const transactions = transactionsQuery;

  const { data, totalAmount } = useMemo(() => {
    const amountPerCoin = {} as Record<CoinAvailable, { fiatAmount: number, coinAmount: number, coin: CoinAvailable, name: string }>;
    let amount = 0;

    transactions.forEach(item => {

      const coin = item.coin as CoinAvailable;
      const numberSign = item.type === 'buy' ? 1 : -1;
      const fiatAmount = item.quantity * item.pricePerCoin * numberSign;

      if (amountPerCoin[coin] == null) {
        amountPerCoin[coin] = {
          fiatAmount: 0,
          coinAmount: 0,
          coin,
          name: CRYPTOCURRENCIES[coin].name,
        };
      }

      amount += fiatAmount;
      amountPerCoin[coin].fiatAmount += fiatAmount;
      amountPerCoin[coin].coinAmount += item.quantity * numberSign;
    });



    const coinsData = Object.entries(amountPerCoin)?.map(([key, value]) => {
      const coin = CRYPTOCURRENCIES[key as CoinAvailable];

      return {
        value: value.fiatAmount,
        color: coin.color,
        text: coin.name,
        coin: value.coin,
        coinAmount: value.coinAmount,
        percentage: Number((value.fiatAmount / amount) * 100).toFixed(2),
      };
    }).sort((a, b) => b.value - a.value);


    return {
      data: coinsData,
      totalAmount: amount,
    };
  }, [transactions]);

  const renderItem: ListRenderItem<typeof data[0]> = useCallback(({ item }) => (
    <CoinListItem
      coin={item.coin as CoinAvailable}
      coinName={item.text}
      fiatAmount={item.value}
      coinAmount={item.coinAmount}
      onPress={() => {
        navigation.navigate('Coin', { coin: item.coin });
      }}
    />
  ), [navigation]);

  return (
    <FlatList
      data={data}
      style={styles.container}
      ListHeaderComponent={
        <View>
          <TotalBalanceCard totalFiatAmount={totalAmount} />
          <AreaChart transactions={transactions} />
          <View style={styles.headerContentWrapper}>
            <PieChart data={data} title="Coins Overview" />
            <ListHeader.Root>
              <ListHeader.Title>Coins</ListHeader.Title>
              <ListHeader.Actions>
                <ButtonIcon iconName="plus" size="sm" color="primary" onPress={() => navigation.navigate('TransactionForm')} />
              </ListHeader.Actions>
            </ListHeader.Root>
          </View>
        </View>
      }
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={item => String(item.coin)}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
}


const styles = StyleSheet.create(((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: rt.insets.top + theme.spacing[5],
  },
  contentContainerStyle: {
    gap: theme.spacing[3],
    paddingBottom: rt.insets.bottom + theme.spacing[3],
  },
  headerContentWrapper: {
    paddingHorizontal: theme.spacing[5],
    gap: theme.spacing[3],
  },
})));
