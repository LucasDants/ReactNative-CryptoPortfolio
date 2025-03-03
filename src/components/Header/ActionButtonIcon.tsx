import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { ButtonIcon } from '../buttons/ButtonIcon';
import { IconName } from '../Icon';

type HeaderActionButtonIconProps = Omit<TouchableOpacityProps, 'style'> & {
  iconName: IconName
  color?: 'primary'
}

export function HeaderActionButtonIcon({ ...rest }: HeaderActionButtonIconProps) {
  return (
    <ButtonIcon size="lg" {...rest} />
  );
}


