import 'react-native-get-random-values';
//
import { Realm, createRealmContext } from '@realm/react';
import { Transaction } from './schemas/transaction';

// Realm.flags.ALLOW_CLEAR_TEST_STATE = true;
// Realm.clearTestState();

Realm.copyBundledRealmFiles();
export const { RealmProvider, useRealm, useQuery, useObject } = createRealmContext({ schema: [Transaction], path: 'bundle.realm'  });
