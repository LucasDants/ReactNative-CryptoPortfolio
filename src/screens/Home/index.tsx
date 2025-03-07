import React, { useCallback, useMemo, useRef } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';

import { CoinAvailable } from '@/@types';
import { HomeScreenProps } from '@/@types/@react-navigation/stack';
import { ButtonIcon } from '@/components/buttons/ButtonIcon';
import { AreaChart } from '@/components/charts/Area';
import { PieChart } from '@/components/charts/Pie/index';
import { Header } from '@/components/Header';
import { ListHeader } from '@/components/list/Header';
import { LIST_ITEM_HEIGHT } from '@/components/list/Item/Root';
import { LIST_ITEM_SEPARATOR_HEIGHT, ListSeparatorRow } from '@/components/list/SeparatorRow';
import { TotalBalanceCard } from '@/components/TotalBalanceCard';
import { CRYPTOCURRENCIES } from '@/config/cryptocurrencies';
import { useQuery } from '@/database/index';
import { Transaction } from '@/database/schemas/transaction';
import { getGreeting } from '@/utils/getGreenting';
import { StyleSheet } from 'react-native-unistyles';
import { CoinListItem } from './components/CoinListItem';
import { HomeEmptyList } from './components/ListEmptyComponent';

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const transactionsQuery = useQuery(Transaction);
  const transactions = transactionsQuery;

  const flatListRef = useRef<FlatList>(null);

  const greeting = getGreeting();

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

    const coinsPositiveAmount = Object.values(amountPerCoin).reduce((acc, current) => {
      if (current.coinAmount < 0) {
        return acc;
      }
      return acc + current.coinAmount;
    }, 0);

    const coinsData = Object.entries(amountPerCoin)?.map(([key, value]) => {
      const coin = CRYPTOCURRENCIES[key as CoinAvailable];

      return {
        value: value.coinAmount,
        color: coin.color,
        text: coin.name,
        coin: value.coin,
        fiatAmount: value.fiatAmount,
        coinAmount: value.coinAmount,
        percentage: value.coinAmount < 0 ? '0' : Number((value.coinAmount / coinsPositiveAmount) * 100).toFixed(2),
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
      fiatAmount={item.fiatAmount}
      coinAmount={item.coinAmount}
      onPress={() => {
        navigation.navigate('Coin', { coin: item.coin });
      }}
    />
  ), [navigation]);

  const toggleFlatListScroll = useCallback((isVisible: boolean) => {
    flatListRef.current?.setNativeProps({ scrollEnabled: !isVisible });
  }, []);

  const getItemLayout = useCallback((_: unknown, index: number) => (
    { length: LIST_ITEM_HEIGHT, offset: (LIST_ITEM_HEIGHT + LIST_ITEM_SEPARATOR_HEIGHT) * index, index }
  ), []);

  return (
    <FlatList
      data={data}
      style={styles.container}
      ListHeaderComponent={
        <>
          <Header.Root style={styles.headerContentWrapper}>
            <Header.Title>{greeting}!</Header.Title>
          </Header.Root>
          <TotalBalanceCard totalFiatAmount={totalAmount} />
          <AreaChart transactions={transactions} onPointerShow={toggleFlatListScroll} />
          <View style={styles.headerContentWrapper}>
            {data.length > 0 ? <PieChart data={data} title="Coins Overview" /> : <></>}
            <ListHeader.Root>
              <ListHeader.Title>Coins</ListHeader.Title>
              <ListHeader.Actions>
                <ButtonIcon iconName="plus" size="sm" onPress={() => navigation.navigate('TransactionForm')} />
              </ListHeader.Actions>
            </ListHeader.Root>
          </View>
        </>
      }
      getItemLayout={getItemLayout}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={item => String(item.coin)}
      ItemSeparatorComponent={ListSeparatorRow}
      contentContainerStyle={styles.contentContainerStyle}
      ListEmptyComponent={<HomeEmptyList />}
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
    paddingTop: {
      sm: rt.insets.top + theme.spacing[5],
      md: rt.insets.top + theme.spacing[6],
      lg: rt.insets.top + theme.spacing[8],
    },
    paddingBottom: {
      sm: rt.insets.bottom + theme.spacing[3],
      md: rt.insets.bottom + theme.spacing[4],
      lg: rt.insets.bottom + theme.spacing[6],
    },
    flexGrow: 1,
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
