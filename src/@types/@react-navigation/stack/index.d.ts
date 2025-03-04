import { CoinAvailable, CoinOperation } from '@/@types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined
  Coin: {
    coin: CoinAvailable,
  }
  TransactionForm: {
    coin?: CoinAvailable
    transaction?: {
      id: string
      coin: CoinAvailable
      type: CoinOperation
      date: string
      quantity: number
      pricePerCoin: number
    }
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
