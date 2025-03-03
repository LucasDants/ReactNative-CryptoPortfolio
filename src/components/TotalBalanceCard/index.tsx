import { formatNumberToFiat } from '@/utils/formatNumberToFiat';
import React from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';

type Props = ViewProps & {
  totalFiatAmount: number
}

export function TotalBalanceCard({ totalFiatAmount, children, ...rest }: Props) {
  const fiatAmount = formatNumberToFiat({ number: totalFiatAmount });

  return (
    <View style={styles.container} {...rest}>
      <Text style={styles.title}>{fiatAmount}</Text>
      {children}
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
