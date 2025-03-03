import { CoinAvailable } from '@/@types';
import { Transaction } from '@/database/schemas/transaction';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined
  Coin: {
    coin: CoinAvailable,
  }
  TransactionForm: {
    coin?: CoinAvailable
    transaction?: Transaction
  } | undefined
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type CoinScreenProps = NativeStackScreenProps<RootStackParamList, 'Coin'>;
type TransactionFormScreenProps = NativeStackScreenProps<RootStackParamList, 'TransactionForm'>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
