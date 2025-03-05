import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';


export function HomeEmptyList() {

  return (
    <View style={styles.container}>
      <Text style={styles.textIcon}>⤴</Text>
      <Text style={styles.sadIcon}>🥲</Text>
      <Text style={styles.text}>You do not have transactions yet, click on the plus (+) button to start storing your transactions!</Text>
    </View>
  );
}


const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: {
      sm: theme.spacing[4],
      md: theme.spacing[5],
      lg: theme.spacing[7],
    },
  },
  textIcon: {
    color: theme.colors.primary,
    fontSize: {
      sm: theme.fontSize['4xl'],
      md: theme.fontSize['5xl'],
      lg: theme.fontSize['7xl'],
    },
  },
  sadIcon: {
    fontSize: {
      sm: 60,
      md: 65,
      lg: 75,
    },
    alignSelf: 'center',
    marginBottom: {
      sm: theme.spacing[2],
      md: theme.spacing[3],
      lg: theme.spacing[5],
    },
  },
  text: {
    textAlign: 'center',
    color: theme.colors.white,
    fontFamily: theme.fonts.inter.medium,
    fontSize: {
      sm: theme.fontSize.lg,
      md: theme.fontSize.xl,
      lg: theme.fontSize['3xl'],
    },
  },
}));



