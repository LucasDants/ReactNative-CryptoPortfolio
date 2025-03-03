import React, { useCallback } from 'react';

import { CoinAvailable, CoinOperation } from '@/@types';
import { CoinScreenProps } from '@/@types/@react-navigation/stack';
import { CoinImage } from '@/components/CoinImage';
import { Header } from '@/components/Header';
import { TotalBalanceCard } from '@/components/TotalBalanceCard';
import { ButtonIcon } from '@/components/buttons/ButtonIcon';
import { AreaChart } from '@/components/charts/Area';
import { ListHeader } from '@/components/list/Header';
import { CRYPTOCURRENCIES } from '@/config/cryptocurrencies';
import { useQuery } from '@/database';
import { Transaction } from '@/database/schemas/transaction';
import { FlatList, ListRenderItem, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { TransactionListItem } from './components/TransactionListItem';


export default function CoinScreen({ navigation, route }: CoinScreenProps) {
  const { coin } = route.params;

  const coinColor = CRYPTOCURRENCIES[coin].color;

  const transactionsQuery = useQuery({
    type: Transaction,
    query: (collection) => {

      return collection.filtered('coin == $0', coin).sorted('date', true);
    },
  }, [coin]);

  const { totalFiatAmount, totalCoinAmount } = transactionsQuery.reduce((acc, current) => {
    const numberSign = current.type === 'buy' ? 1 : -1;

    acc.totalFiatAmount += current.pricePerCoin * current.quantity * numberSign;
    acc.totalCoinAmount += current.quantity * numberSign;

    return acc;
  }, { totalFiatAmount: 0, totalCoinAmount: 0 });


  const renderItem: ListRenderItem<Transaction> = useCallback(({ item }) => (
    <TransactionListItem
      coin={item.coin as CoinAvailable}
      type={item.type as CoinOperation}
      date={item.date}
      quantity={item.quantity}
      pricePerCoin={item.pricePerCoin}
    // onPress={() => navigation.navigate('Coin',
    //   { coin: item.coin, coinName: item.text, fiatAmount: item.value, coinAmount: item.coinAmount }
    // )}
    />
  ), []);


  return (
    <FlatList
      data={transactionsQuery}
      style={styles.container}
      ListHeaderComponent={
        <>
          <View style={styles.headerWrapper}>
            <Header.Root>
              <Header.Button iconName="chevron-left" onPress={() => navigation.goBack()} />
              <Header.Title>{coin} Transactions</Header.Title>
              <Header.Empty />
            </Header.Root>
          </View>
          <View style={styles.balanceCard}>
            <CoinImage style={styles.coinImage} coin={coin} />
            <TotalBalanceCard totalFiatAmount={totalFiatAmount} >
              <Text style={[styles.coinBalance, { color: coinColor }]}>{coin} {totalCoinAmount}</Text>
            </TotalBalanceCard>
          </View>
          <AreaChart transactions={transactionsQuery} color={CRYPTOCURRENCIES[coin].color} />
          <View style={styles.headerContentWrapper}>
            <ListHeader.Root>
              <ListHeader.Title>Transactions</ListHeader.Title>
              <ListHeader.Actions>
                <ButtonIcon iconName="plus" size="sm" color="primary" onPress={() => navigation.navigate('TransactionForm', { coin })} />
              </ListHeader.Actions>
            </ListHeader.Root>
          </View>
        </>
      }
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={item => String(item._id)}
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
  headerWrapper: {
    paddingHorizontal: theme.spacing[3],
  },
  balanceCard: {
    alignItems: 'center',
    gap: theme.spacing[3],
  },
  coinBalance: {
    fontSize: theme.fontSize.lg,
    lineHeight: theme.fontSize['2xl'],
  },
  coinImage: { height: 52, width: 52 },
  headerContentWrapper: {
    paddingHorizontal: theme.spacing[5],
    gap: theme.spacing[3],
  },
  contentContainerStyle: {
    gap: theme.spacing[3],
    paddingBottom: rt.insets.bottom + theme.spacing[3],
  },
})));
