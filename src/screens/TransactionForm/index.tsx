import { CoinOperation } from '@/@types';
import { TransactionFormScreenProps } from '@/@types/@react-navigation/stack';
import { Button } from '@/components/buttons/Button';
import { TransactionTypeButton } from '@/components/buttons/TransactionTypeButton';
import { Header } from '@/components/Header';
import { BaseInput } from '@/components/inputs/BaseInput';
import { SelectCoin } from '@/components/inputs/SelectCoin';
import { SelectDate } from '@/components/inputs/SelectDate';
import { useRealm } from '@/database';
import { Transaction } from '@/database/schemas/transaction';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Alert, Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import Realm from 'realm';

import { showToast } from '@/utils/showToast';
import { StyleSheet } from 'react-native-unistyles';
import * as z from 'zod';

const schema = z.object({
  coin: z.enum(['BTC', 'ETH', 'LTC', 'XRP', 'SOL', 'ADA'], { required_error: 'Select a coin is required' }),
  type: z.enum(['buy', 'sell']),
  pricePerCoin: z.coerce.number({ required_error: 'Pricer per coin is required', invalid_type_error: 'Pricer per coin is required' }).positive({ message: 'The price per coin needs to be positive' }),
  quantity: z.coerce.number({ required_error: 'Quantity is required', invalid_type_error: 'Quantity is required' }).positive({ message: 'The quantity needs to be positive' }),
  date: z.date(),
});

type Schema = z.infer<typeof schema>

export default function TransactionFormScreen({ navigation, route }: TransactionFormScreenProps) {
  const { coin, transaction } = route.params ?? {};

  const realm = useRealm();
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: {
      coin: transaction?.coin ?? coin,
      date: transaction?.date ? new Date(transaction.date) : new Date(),
      pricePerCoin: transaction?.pricePerCoin,
      quantity: transaction?.quantity,
      type: transaction?.type ?? 'buy',
    },
  });

  const typeWatch = useWatch({ control, name: 'type' });
  const coinWatch = useWatch({ control, name: 'coin' });
  const dateWatch = useWatch({ control, name: 'date' });

  function handleChangeNumericInput(value: string, onChange: (...event: any[]) => void) {
    if (value === '') {
      onChange(value);
    }

    let sanitized = value.replace(',', '.');

    const validRegex = new RegExp(/^\d+(\.\d*)?$/);

    if (validRegex.test(sanitized)) {
      onChange(sanitized);
    }
  }

  function handleChangeType(type: CoinOperation) {
    setValue('type', type, { shouldDirty: true });
  }

  function handleDeleteTransaction() {
    Alert.alert(
      'Delete transaction',
      'Are you sure you want to delete this transaction?',
      [
        {
          style: 'cancel',
          text: 'Cancel',
        },
        {
          style: 'destructive',
          text: 'Delete',
          onPress: onDeleteTransaction,
        },
      ],
      {
        cancelable: true,
        userInterfaceStyle: 'dark',
      }
    );

  }

  function onDeleteTransaction() {
    try {
      if (transaction?.id != null) {
        realm.write(() => {
          const object = realm.objectForPrimaryKey(Transaction, Transaction.getObjectId(transaction.id));
          realm.delete(object);
        });
      }

      showToast({ title: 'Success!', description: 'Transaction deleted with Success!' });
      const isEmpty = realm.objects(Transaction).isEmpty();

      if (isEmpty) {
        navigation.popToTop();
      } else {
        navigation.goBack();
      }

    } catch (err) {
      showToast({ title: 'Error!', description: 'Something went wrong deleting your transaction!', type: 'error' });
    }
  }

  function onSubmit(data: Schema) {
    try {
      if (transaction?.id != null) {
        const object = realm.objectForPrimaryKey(Transaction, Transaction.getObjectId(transaction.id));

        if (object != null) {
          realm.write(() => {
            object.coin = data.coin;
            object.type = data.type;
            object.quantity = data.quantity;
            object.pricePerCoin = data.pricePerCoin;
            object.date = data.date;
          });

          showToast({ title: 'Success!', description: 'Transaction updated with Success!', type: 'success' });

          navigation.goBack();
        }
      } else {
        realm.write(() => {
          realm.create('Transaction', Transaction.generate(data), Realm.UpdateMode.Modified);
        });

        showToast({ title: 'Success!', description: 'Transaction created with Success!', type: 'success' });

        navigation.goBack();
      }
    } catch (err) {
      showToast({ title: 'Error!', description: 'Transaction was not saved, try again!', type: 'error' });
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container} >
        <Header.Root>
          <Header.Button iconName="chevron-left" onPress={() => navigation.goBack()} />
          <Header.Title>Transaction Form</Header.Title>
          {
            transaction?.id ?
              <Header.Button iconName="trash-2" color="primary" onPress={handleDeleteTransaction} />
              :
              <Header.Empty />
          }
        </Header.Root>
        <View style={styles.form}>
          <SelectCoin coin={coinWatch} setSelectedCoin={(newCoin) => setValue('coin', newCoin, { shouldDirty: true, shouldValidate: isSubmitted })} />
          <Controller
            control={control}
            name="quantity"
            render={({ field: { onChange, onBlur, value } }) => (
              <BaseInput
                placeholder="Quantity"
                keyboardType="numeric"
                returnKeyType="next"
                onBlur={onBlur}
                value={value as unknown as string}
                defaultValue={String(transaction?.quantity ?? '')}
                onChangeText={(text) => handleChangeNumericInput(text, onChange)}
              />
            )}
          />
          <Controller
            control={control}
            name="pricePerCoin"
            render={({ field: { onChange, onBlur, value } }) => (
              <BaseInput
                placeholder="Price per coin"
                keyboardType="numeric"
                returnKeyType="done"
                onBlur={onBlur}
                value={value as unknown as string}
                defaultValue={String(transaction?.pricePerCoin ?? '')}
                onChangeText={(text) => handleChangeNumericInput(text, onChange)}
              />
            )}
          />
          <SelectDate date={dateWatch} onChangeDate={(newDate) => setValue('date', newDate, { shouldDirty: true })} />
          <View style={styles.transactionButtonWrapper}>
            <TransactionTypeButton title="Buy" type="buy" isActive={typeWatch === 'buy'} onPress={() => handleChangeType('buy')} />
            <TransactionTypeButton title="Sell" type="sell" isActive={typeWatch === 'sell'} onPress={() => handleChangeType('sell')} />
          </View>
          <Text style={styles.textError}>
            {Object.values(errors).map(item => '• ' + item.message + '\n').join('')}
          </Text>
        </View>


        <Button disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create(((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: rt.insets.top + theme.spacing[3],
    paddingHorizontal: theme.spacing[4],
    paddingBottom: rt.insets.bottom + theme.spacing[3],
  },
  form: {
    flex: 1,
    gap: theme.spacing[3],
  },
  textError: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.md,
    lineHeight: theme.fontSize.xl,
    fontFamily: theme.fonts.inter.regular,
  },
  transactionButtonWrapper: {
    flexDirection: 'row',
    gap: theme.spacing[4],
  },
})));
