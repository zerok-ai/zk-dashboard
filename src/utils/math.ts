export function convertNanoToMilliSeconds(value: number) {
  if (value != null) {
    let millis = parseFloat((value / 1000000).toFixed(2));
    return millis;
  }
  return 'NA';
}

export function convertNanoToMilliSecondsNumber(value: number) {
  if (value != null) {
    let millis = parseFloat((value / 1000000).toFixed(2));
    return millis;
  }
  return 0;
}

export function roundToTwoDecimals(value: number) {
  if (value != null) {
    return parseFloat(value.toFixed(2));
  }
  return 'NA';
}
