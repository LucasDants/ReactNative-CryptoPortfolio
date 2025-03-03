import { Transaction } from '@/database/schemas/transaction';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { Results } from 'realm';
import { AreaChartPointerLabel } from './PointerLabel';

type Props = {
  transactions: Results<Transaction>
  color?: string
}

export function AreaChart({ transactions, color = '#5DD44E' }: Props) {

  function getTotalBalancePerDay() {
    const dailyBalances: Record<string, number> = {};

    transactions.forEach((tx) => {
      const dateKey = dayjs(tx.date).format('YYYY-MM-DD');
      const numberSign = tx.type === 'buy' ? 1 : -1;
      const fiatAmount = tx.quantity * tx.pricePerCoin * numberSign;

      if (dailyBalances[dateKey] == null) {
        dailyBalances[dateKey] = 0;
      }

      dailyBalances[dateKey] += fiatAmount;
    });

    const orderedDates = Object.keys(dailyBalances).sort();

    let sum = 0;

    const result = orderedDates.map(date => {
      const dailyBalance = dailyBalances[date] || 0;
      sum += dailyBalance;

      return { date, value: sum };
    });

    return result;
  }

  const data = getTotalBalancePerDay();

  const PointerLabelComponent = useCallback((items: { value: number }[]) => <AreaChartPointerLabel data={items} />, []);

  return (
    <View style={{}}>
      <LineChart
        areaChart
        data={data}
        startFillColor={color}
        endFillColor={color}
        startOpacity={0.4}
        endOpacity={0.01}
        isAnimated
        thickness={5}
        color={color}
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
          pointerColor: color,
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
