
import Toast, { ToastType } from 'react-native-toast-message';

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
    });
}
