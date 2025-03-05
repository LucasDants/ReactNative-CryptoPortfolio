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
    paddingHorizontal: theme.spacing[5],
  },
  textIcon: {
    color: theme.colors.primary,
    fontSize: theme.fontSize['4xl'],
  },
  sadIcon: {
    fontSize: theme.fontSize['7xl'],
    alignSelf: 'center',
    marginBottom: theme.spacing[2],
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSize.lg,
    textAlign: 'center',
    fontFamily: theme.fonts.inter.medium,
  },
}));



