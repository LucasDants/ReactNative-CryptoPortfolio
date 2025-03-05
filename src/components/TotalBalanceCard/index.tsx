import { formatNumberToFiat } from '@/utils/formatNumberToFiat';
import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

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


const styles = StyleSheet.create(theme => ({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: theme.fontSize['4xl'],
    fontFamily: theme.fonts.inter.bold,
    color: theme.colors.white,
  },
}));
