

type Props = {
  number: number
  currencyDisplay?: 'code' | 'name' | 'symbol' | 'narrowSymbol'
}

export function formatNumberToFiat({ number, currencyDisplay = 'code' }: Props) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currencyDisplay: currencyDisplay, currency: 'USD' }).format(number);
}
