import { Icon } from '@/components/Icon';
import { ListItem } from '@/components/list/Item';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Keyboard, Text } from 'react-native';
import RNDatePicker from 'react-native-date-picker';

import { StyleSheet } from 'react-native-unistyles';

type DatePickerProps = {
  date: Date
  onChangeDate: (date: Date) => void
};

export function SelectDate({ date, onChangeDate }: DatePickerProps) {
  const [open, setOpen] = useState(false);


  function handleOpen() {
    Keyboard.dismiss();
    setOpen(true);
  }

  return (
    <>
      <ListItem.Root style={styles.container} onPress={handleOpen}>
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
    minHeight: 60,
  },
  text: {
    color: theme.colors.white,
    fontSize: {
      sm: theme.fontSize.lg,
      md: theme.fontSize.xl,
      lg: theme.fontSize['3xl'],
    },
    fontFamily: theme.fonts.inter.regular,
  },
  icon: {
    fontSize: {
      sm: theme.fontSize['2xl'],
      md: theme.fontSize['3xl'],
      lg: theme.fontSize['5xl'],
    },
  },
  primaryColor: {
    color: theme.colors.primary,
  },
}));
