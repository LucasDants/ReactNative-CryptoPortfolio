import { formatNumberToFiat } from '@/utils/formatNumberToFiat';
import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type Props = {
  data: { value: number }[]
}

export function AreaChartPointerLabel({ data }: Props) {
  const numberFormatted = formatNumberToFiat({ number: data[0].value, currencyDisplay: 'symbol' });

  return (
    <View
      style={styles.container}>
      <View style={styles.tooltip}>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {numberFormatted}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltip: {
    backgroundColor: theme.colors.shape,
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[1.5],
    borderRadius: theme.shapes.lg,
    borderWidth: 1,
    borderColor: theme.colors.white,
  },
  text: {
    fontWeight: 'bold',
    color: theme.colors.white,
    textAlign: 'center',
  },
}));
