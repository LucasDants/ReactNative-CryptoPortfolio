import React, { useMemo } from 'react';
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

  const pieData = useMemo(() => data.filter(item => item.value >= 0), [data]);

  return (
    <View
      style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      <View style={styles.chartContent}>
        <GiftedPieChart
          data={pieData}
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
    padding: {
      sm: theme.spacing[4],
      md: theme.spacing[5],
      lg: theme.spacing[7],
    },
    borderRadius: {
      sm: theme.shapes.md,
      lg: theme.shapes.lg,
    },
    backgroundColor: theme.colors.shape,
    gap: {
      sm: theme.spacing[3],
      md: theme.spacing[4],
      lg: theme.spacing[6],
    },
  },
  title: {
    color: theme.colors.white,
    fontSize: {
      sm: theme.fontSize.lg,
      md: theme.fontSize.xl,
      lg: theme.fontSize['3xl'],
    },
    fontFamily: theme.fonts.inter.bold,
  },
  chartContent: {
    alignItems: 'center',
    pointerEvents: 'none',
  },
}));
