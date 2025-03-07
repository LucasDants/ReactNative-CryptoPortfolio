import { Transaction } from '@/database/schemas/transaction';
import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { StyleSheet } from 'react-native-unistyles';
import { Results } from 'realm';
import { AreaChartPointerLabel } from './PointerLabel';

type Props = {
  transactions: Results<Transaction>
  color?: string
  onPointerShow?: (isVisible: boolean) => void
}

export function AreaChart({ transactions, color = '#5DD44E', onPointerShow }: Props) {
  const data = useMemo(() => {
    const dailyBalances: Record<string, number> = {};

    if (transactions.length === 0) {
      return [{ value: 0 }, { value: 0 }];
    }

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

    return [{ value: 0 }, ...result];
  }, [transactions]);

  const PointerLabelComponent = useCallback((items: { value: number }[]) => <AreaChartPointerLabel data={items} />, []);

  return (
    <View>
      <LineChart
        areaChart
        data={data}
        startFillColor={color}
        endFillColor={color}
        startOpacity={0.4}
        endOpacity={0.01}
        thickness={styles.thickness.height}
        color={color}
        disableScroll
        animationDuration={1200}
        yAxisOffset={transactions.length === 0 ? -1 : 0}
        curved
        onlyPositive
        hideDataPoints
        hideAxesAndRules
        adjustToWidth
        yAxisLabelWidth={0}
        xAxisLabelsHeight={0}
        initialSpacing={0}

        pointerConfig={{
          pointerColor: color,
          radius: styles.radius.height,
          showPointerStrip: false,
          pointerLabelWidth: styles.pointerLabel.width,
          pointerLabelHeight: styles.pointerLabel.height,
          activatePointersOnLongPress: true,
          autoAdjustPointerLabelPosition: true,
          pointerLabelComponent: PointerLabelComponent,
        }}

        getPointerProps={(props: { pointerX: number }) => {
          if (onPointerShow != null) {
            onPointerShow(props?.pointerX > 0);
          }
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  thickness: {
    height: {
      sm: 5,
      md: 6,
      lg: 9,
    },
  },
  radius: {
    height: {
      sm: 6,
      md: 7,
      lg: 10,
    },
  },
  pointerLabel: {
    height: {
      sm: 90,
      md: 110,
      lg: 170,
    },
    width: {
      sm: 120,
      md: 140,
      lg: 200,
    },
  },
});
