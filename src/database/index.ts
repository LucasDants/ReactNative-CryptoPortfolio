import { Realm, createRealmContext } from '@realm/react';
import { Transaction } from './schemas/transaction';

Realm.copyBundledRealmFiles();
export const { RealmProvider, useRealm, useQuery, useObject } = createRealmContext({ schema: [Transaction], path: 'bundle.realm' });
