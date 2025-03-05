import React from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { PieChart as GiftedPieChart } from 'react-native-gifted-charts';
import { StyleSheet } from 'react-native-unistyles';
import { PieLegend } from './Legend';


type PieChartProps = {
  data: {
    value: number,
    color: string,
    text: string,
    percentage: string
  }[]
  title: string
}

export function PieChart({ data = [], title }: PieChartProps) {

  const { width } = useWindowDimensions();

  return (
    <View
      style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      <View style={styles.chartContent}>
        <GiftedPieChart
          data={data}
          donut
          showGradient
          radius={width / 4}
          innerRadius={width / 7}
          innerCircleColor={styles.container.backgroundColor}
        />
      </View>
      <PieLegend data={data} />
    </View>

  );
}


const styles = StyleSheet.create(theme => ({
  container: {
    padding: theme.spacing[4],
    borderRadius: theme.shapes.md,
    backgroundColor: theme.colors.shape,
    gap: theme.spacing[3],
  },
  title: {
    color: theme.colors.white,
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fonts.inter.bold,
  },
  chartContent: {
    alignItems: 'center',
    pointerEvents: 'none',
  },
}));
