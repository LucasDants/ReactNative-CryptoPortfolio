import './src/theme/unistyles';
//

import { Routes } from '@/routes/index.routes';
import { theme } from '@/theme';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { RealmProvider } from './src/database';

function App() {
  return (
    <View style={styles.container}>
      <RealmProvider>
        <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
        <Routes />
      </RealmProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default App;
