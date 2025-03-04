

export function formatNumberToMaxDisplay(number: number, maxLength = 10) {
   let numStr = String(number);

  // If the number exceeds maxLength, trim it
  if (numStr.length > maxLength) {
    if (numStr.includes('.')) {
      // Split into integer and decimal parts
      const [intPart, decimalPart] = numStr.split('.');
      const allowedDecimals = maxLength - intPart.length - 1; // Subtract 1 for the dot

      if (allowedDecimals > 0) {
        numStr = `${intPart}.${decimalPart.slice(0, allowedDecimals)}`;
      } else {
        numStr = intPart; // No space for decimals
      }
    } else {
      // If it's a pure integer, just slice to maxLength
      numStr = numStr.slice(0, maxLength);
    }
  }

  // Ensure we don't end with a dot (e.g., "123456789.")
  if (numStr.endsWith('.')) {
    numStr = numStr.slice(0, -1);
  }

  return Number(numStr);
}
