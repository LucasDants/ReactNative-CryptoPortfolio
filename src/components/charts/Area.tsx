import { Transaction } from '@/database/schemas/transaction';
import { formatNumberToFiat } from '@/utils/formatNumberToFiat';
import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { Results } from 'realm';

type Props = {
  transactions: Results<Transaction>
}

export function AreaChart({ transactions }: Props) {

  function getTotalBalancePerDay() {
    const dailyBalances: Record<string, number> = {};
    let runningBalance = 0;

    transactions.forEach((tx) => {
      const dateKey = tx.date.toISOString().split('T')[0];
      const fiatAmount = tx.quantity * tx.pricePerCoin;

      runningBalance += tx.type === 'sell' ? -fiatAmount : fiatAmount;

      dailyBalances[dateKey] = runningBalance;
    });

    const allDates = Object.keys(dailyBalances).sort();
    let lastBalance = 0;

    const result = allDates.map((date) => {
      lastBalance = dailyBalances[date] || lastBalance;
      return { date, value: lastBalance };
    });

    return result;
  }

  const data = getTotalBalancePerDay();

  const PointerLabelComponent = useCallback((items: { value: number }[]) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: 'white', backgroundColor: 'hsl(144, 6%, 15%)' }}>
          <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }} numberOfLines={1} ellipsizeMode="tail">
            {formatNumberToFiat({ number: items[0].value, currencyDisplay: 'symbol' })}
          </Text>
        </View>
      </View>
    );
  }, []);

  return (
    <View style={{}}>
      <LineChart
        areaChart
        data={data}
        startFillColor="#5DD44E"
        endFillColor="#5DD44E"
        startOpacity={0.4}
        endOpacity={0.01}
        isAnimated
        thickness={5}
        color="#5DD44E"
        disableScroll
        animationDuration={1200}
        curved
        hideDataPoints
        hideAxesAndRules
        adjustToWidth
        yAxisLabelWidth={0}
        xAxisLabelsHeight={0}

        initialSpacing={0}

        pointerConfig={{
          pointerColor: '#5DD44E',
          radius: 6,
          showPointerStrip: false,
          pointerLabelWidth: 120,
          pointerLabelHeight: 90,
          activatePointersOnLongPress: true,
          autoAdjustPointerLabelPosition: true,
          pointerLabelComponent: PointerLabelComponent,
        }}
      />
    </View>
  );
}
