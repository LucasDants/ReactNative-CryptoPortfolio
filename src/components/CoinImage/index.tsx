import { CoinAvailable } from '@/@types';
import React from 'react';
import { Image, ImageProps } from 'react-native';

import ADA from '@/assets/coins/ADA.png';
import BTC from '@/assets/coins/BTC.png';
import ETH from '@/assets/coins/ETH.png';
import LTC from '@/assets/coins/LTC.png';
import SOL from '@/assets/coins/SOL.png';
import XRP from '@/assets/coins/XRP.png';


type CoinImageProps = ImageProps & {
  coin: CoinAvailable
}

const ImageSource = {
  BTC,
  ETH,
  XRP,
  LTC,
  SOL,
  ADA,
};

export function CoinImage({ coin, ...rest }: CoinImageProps) {
  return <Image source={ImageSource[coin]} style={{ height: 40, width: 40 }} {...rest} />;
}

