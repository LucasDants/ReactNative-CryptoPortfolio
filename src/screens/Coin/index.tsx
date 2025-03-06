import React, { useCallback, useRef } from 'react';

import { CoinAvailable, CoinOperation } from '@/@types';
import { CoinScreenProps } from '@/@types/@react-navigation/stack';
import { CoinImage } from '@/components/CoinImage';
import { Header } from '@/components/Header';
import { TotalBalanceCard } from '@/components/TotalBalanceCard';
import { ButtonIcon } from '@/components/buttons/ButtonIcon';
import { AreaChart } from '@/components/charts/Area';
import { ListHeader } from '@/components/list/Header';
import { LIST_ITEM_HEIGHT } from '@/components/list/Item/Root';
import { CRYPTOCURRENCIES } from '@/config/cryptocurrencies';
import { useQuery } from '@/database';
import { Transaction } from '@/database/schemas/transaction';
import { FlatList, ListRenderItem, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { TransactionListItem } from './components/TransactionListItem';

export default function CoinScreen({ navigation, route }: CoinScreenProps) {
  const { coin } = route.params;

  const coinColor = CRYPTOCURRENCIES[coin].color;

  const flatListRef = useRef<FlatList>(null);

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


  const renderItem: ListRenderItem<Transaction> = useCallback(({ item }) => {
    const itemCoin = item.coin as CoinAvailable;
    const itemType = item.type as CoinOperation;
    return (
      <TransactionListItem
        coin={itemCoin}
        type={itemType}
        date={item.date}
        quantity={item.quantity}
        pricePerCoin={item.pricePerCoin}
        onPress={() => navigation.navigate('TransactionForm',
          {
            transaction: {
              id: item._id.toString(),
              coin: itemCoin,
              pricePerCoin: item.pricePerCoin,
              quantity: item.quantity,
              type: itemType,
              date: item.date.toISOString(),
            },
          }
        )}
      />
    );
  }, [navigation]);

  const toggleFlatListScroll = useCallback((isVisible: boolean) => {
    flatListRef.current?.setNativeProps({ scrollEnabled: !isVisible });
  }, []);

  const getItemLayout = useCallback((_: unknown, index: number) => (
    { length: LIST_ITEM_HEIGHT, offset: LIST_ITEM_HEIGHT * index, index }
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
          <AreaChart transactions={transactionsQuery} color={CRYPTOCURRENCIES[coin].color} onPointerShow={toggleFlatListScroll} />
          <View style={styles.headerContentWrapper}>
            <ListHeader.Root>
              <ListHeader.Title>Transactions</ListHeader.Title>
              <ListHeader.Actions>
                <ButtonIcon iconName="plus" size="sm" onPress={() => navigation.navigate('TransactionForm', { coin })} />
              </ListHeader.Actions>
            </ListHeader.Root>
          </View>
        </>
      }
      getItemLayout={getItemLayout}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={item => item._id.toString()}
      contentContainerStyle={styles.contentContainerStyle}
      ref={flatListRef}
    />
  );
}


const styles = StyleSheet.create(((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainerStyle: {
    gap: {
      sm: theme.spacing[3],
      md: theme.spacing[4],
      lg: theme.spacing[6],
    },
    paddingTop: {
      sm: rt.insets.top + theme.spacing[3],
      md: rt.insets.top + theme.spacing[4],
      lg: rt.insets.top + theme.spacing[6],
    },
    paddingBottom: {
      sm: rt.insets.bottom + theme.spacing[3],
      md: rt.insets.bottom + theme.spacing[4],
      lg: rt.insets.bottom + theme.spacing[6],
    },
  },
  headerWrapper: {
    paddingHorizontal: {
      sm: theme.spacing[4],
      md: theme.spacing[5],
      lg: theme.spacing[7],
    },
  },
  balanceCard: {
    alignItems: 'center',
    gap: {
      sm: theme.spacing[3],
      md: theme.spacing[4],
      lg: theme.spacing[6],
    },
  },
  coinBalance: {
    fontSize: {
      sm: theme.fontSize.lg,
      md: theme.fontSize.xl,
      lg: theme.fontSize['3xl'],
    },
    lineHeight: {
      sm: theme.fontSize['2xl'],
      md: theme.fontSize['3xl'],
      lg: theme.fontSize['5xl'],
    },
  },
  coinImage: {
    height: {
      sm: 52,
      md: 58,
      lg: 70,
    },
    width: {
      sm: 52,
      md: 58,
      lg: 70,
    },
  },
  headerContentWrapper: {
    paddingHorizontal: {
      sm: theme.spacing[4],
      md: theme.spacing[5],
      lg: theme.spacing[7],
    },
    gap: {
      sm: theme.spacing[3],
      md: theme.spacing[4],
      lg: theme.spacing[6],
    },
  },
})));
