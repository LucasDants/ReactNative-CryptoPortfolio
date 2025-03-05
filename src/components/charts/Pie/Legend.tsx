import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { PieLegendDot } from './Dot';

type Props = {
  data: {
    percentage: string
    text: string
    color: string
  }[]
}

export function PieLegend({ data }: Props) {
  return (
    <View style={styles.container}>
      {data.map(item => (
        <View
          style={styles.item}
          key={item.text}
        >
          <PieLegendDot color={item.color} />
          <Text style={styles.text}>{item.text}: {item.percentage}%</Text>
        </View>
      ))}
    </View>
  );
}


const styles = StyleSheet.create(theme => ({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    rowGap: {
      sm: theme.spacing[3],
      md: theme.spacing[4],
      lg: theme.spacing[6],
    },
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    gap: {
      sm: theme.spacing[3],
      md: theme.spacing[4],
      lg: theme.spacing[6],
    },
  },
  text: {
    color: theme.colors.white,
    fontSize: {
      sm: theme.fontSize.sm,
      md: theme.fontSize.md,
      lg: theme.fontSize.xl,
    },
    fontFamily: theme.fonts.inter.regular,
  },
}));


