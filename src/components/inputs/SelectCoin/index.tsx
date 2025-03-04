import { CoinAvailable } from '@/@types';
import { CoinImage } from '@/components/CoinImage';
import { ListHeader } from '@/components/list/Header';
import { ListItem } from '@/components/list/Item';
import { CRYPTOCURRENCIES } from '@/config/cryptocurrencies';
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useRef } from 'react';
import { Dimensions, Keyboard, ListRenderItem } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { CoinSelectButton } from './CoinSelectButton';

type CryptocurrenciesValues = (typeof CRYPTOCURRENCIES)[keyof typeof CRYPTOCURRENCIES]

type Props = {
  coin: CoinAvailable | undefined
  setSelectedCoin: (coin: CoinAvailable) => void;
};

export function SelectCoin({ coin, setSelectedCoin }: Props) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    Keyboard.dismiss();
    bottomSheetModalRef.current?.present();
  }, []);


  const BackdropComponent = useCallback((props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      opacity={0.7}
      appearsOnIndex={1}
      disappearsOnIndex={-1}
      pressBehavior="close"
    />
  ), []);

  const renderItem: ListRenderItem<CryptocurrenciesValues> = useCallback(({ item }) => {
    function handleSelectCryptocurrency(selectedCoin: CoinAvailable) {
      setSelectedCoin(selectedCoin);
      bottomSheetModalRef.current?.dismiss();
    }

    return (
      <ListItem.Root onPress={() => handleSelectCryptocurrency(item.coin)}>
        <CoinImage coin={item.coin} />
        <ListItem.Column>
          <ListItem.Text>{item.coin}</ListItem.Text>
          <ListItem.Text typography="subtitle">{item.name}</ListItem.Text>
        </ListItem.Column>
      </ListItem.Root>
    );
  }, [setSelectedCoin]);


  return (
    <>
      <CoinSelectButton
        coin={coin}
        onPress={handlePresentModalPress}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        backgroundStyle={styles.bottomSheetBackgroundStyle}
        maxDynamicContentSize={Dimensions.get('window').height * 0.8}
        style={styles.bottomSheetStyle}
        backdropComponent={BackdropComponent}>
        <ListHeader.Title style={styles.title}>Select your wallet</ListHeader.Title >
        <BottomSheetFlatList
          data={Object.values(CRYPTOCURRENCIES)}
          keyExtractor={item => item.coin}


          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.bottomSheetContentContainerStyle}
          renderItem={renderItem}
        />
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  bottomSheetContentContainerStyle: {
    gap: theme.spacing[3],
    paddingBottom: rt.insets.bottom + theme.spacing[3],
  },
  title: {
    marginBottom: theme.spacing[3],
  },
  bottomSheetStyle: {
    paddingHorizontal: theme.spacing[4],
  },
  bottomSheetBackgroundStyle: {
    backgroundColor: theme.colors.background,
  },

}));
