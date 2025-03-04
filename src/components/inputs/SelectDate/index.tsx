import { Icon } from '@/components/Icon';
import { ListItem } from '@/components/list/Item';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Text } from 'react-native';
import RNDatePicker from 'react-native-date-picker';

import { StyleSheet } from 'react-native-unistyles';

type DatePickerProps = {
  date: Date
  onChangeDate: (date: Date) => void
};

export function SelectDate({ date, onChangeDate }: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem.Root style={styles.container} onPress={() => setOpen(true)}>
        <ListItem.Column>
          <Text style={styles.text}>{dayjs(date).format('DD/MM/YYYY')}</Text>
        </ListItem.Column>
        <ListItem.Column variant="reverse">
          <Icon name="chevron-down" color="primary" style={styles.icon} />
        </ListItem.Column>
      </ListItem.Root>
      <RNDatePicker
        modal
        open={open}
        date={date}
        mode="date"
        theme="dark"
        title="Select the transaction date"
        cancelText="Cancel"
        confirmText="Confirm"
        maximumDate={new Date()}
        buttonColor={styles.primaryColor.color}
        dividerColor={styles.primaryColor.color}
        onConfirm={(newDate) => {
          console.log(newDate);
          onChangeDate(newDate);
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create(theme => ({
  container: {
    height: 60,
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSize.lg,
  },
  icon: {
    fontSize: theme.fontSize['2xl'],
  },
  primaryColor: {
    color: theme.colors.primary,
  },
}));
