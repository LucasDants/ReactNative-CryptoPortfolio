import { RootStackParamList } from '@/@types/@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CoinScreen from '../screens/Coin';
import HomeScreen from '../screens/Home';
import TransactionFormScreen from '../screens/TransactionForm';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function AppStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false, navigationBarColor: '#141716' }}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Coin" component={CoinScreen} />
      <Screen name="TransactionForm" component={TransactionFormScreen} />
    </Navigator>
  );
}
