import moment from "moment";

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

export const getFormattedValue = (nsValue: number): string => {
  const digits = nsValue.toString().length;
  if (digits <= 3) {
    return roundToTwoDecimals(nsValue) + 'ns';
  } else if (digits <= 6) {
    return roundToTwoDecimals(nsValue / 10 ** 3) + 'us';
  } else if (digits <= 9) {
    return roundToTwoDecimals(nsValue / 10 ** 6) + 'ms';
  } else {
    return moment.duration(nsValue / 10 ** 9, 'seconds').humanize();
  }
};
