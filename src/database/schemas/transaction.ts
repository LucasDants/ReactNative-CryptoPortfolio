import { Realm } from '@realm/react';
import { CoinAvailable, CoinOperation } from '../../@types';

type GenerateProps = {
  coin: CoinAvailable;
  type: CoinOperation;
  quantity: number;
  pricePerCoin: number;
  date: Date
}

export class Transaction extends Realm.Object<Transaction> {
  _id!: Realm.BSON.ObjectId;
  coin!: string;
  type!: string;
  quantity!: number;
  pricePerCoin!: number;
  date!: Date;

  static generate({ coin, type, quantity, pricePerCoin, date }: GenerateProps) {
    return {
      _id: new Realm.BSON.ObjectId(),
      coin,
      type,
      quantity,
      pricePerCoin,
      date,
    };
  }

  static getObjectId(id: string) {
    return new Realm.BSON.ObjectId(id);
  }

  static schema = {
    name: 'Transaction',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      coin: 'string',
      type: 'string',
      quantity: 'double',
      pricePerCoin: 'double',
      date: 'date',
    },
  };
}
