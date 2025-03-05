
import Toast, { ToastType } from 'react-native-toast-message';
import { UnistylesRuntime } from 'react-native-unistyles';

type Props = {
  type?: ToastType
  title: string
  description: string
}

export function showToast({ type = 'success', title, description}: Props) {
  Toast.show({
      type: type,
      text1: title,
      text2: description,
      topOffset: UnistylesRuntime.insets.top + 12,
    });
}
