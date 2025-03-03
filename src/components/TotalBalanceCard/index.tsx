import { formatNumberToFiat } from '@/utils/formatNumberToFiat';
import React from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';

type Props = ViewProps & {
  totalFiatAmount: number
}

export function TotalBalanceCard({ totalFiatAmount, ...rest }: Props) {
  return (
    <View style={styles.container} {...rest}>
      <Text style={styles.title}>{formatNumberToFiat({ number: totalFiatAmount })}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
});
