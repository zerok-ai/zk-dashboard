import { useTheme } from '@mui/material/styles';
import MultiProgress from 'react-multi-progress';
import { Typography } from '@mui/material';
import { roundToTwoDecimals } from 'utils/math';
import moment from 'moment';

const TraceSnapshot = ({ spans, spanId }: { spans: any; spanId?: string }) => {
  const theme = useTheme();

  const getFormattedValue = (nsValue: number): string => {
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

  const getTotalLatency = (spans: any): number => {
    const sum = spans
      .map((x: any): number => x.latency)
      .reduce(function (a: number, b: number) {
        return a + b;
      }, 0);
    return sum;
  };

  const getColor = (idx: number, span: any): any => {
    if (spanId && span.span_id !== spanId) {
      return theme.palette.background.default;
    }
    if (span.type === 'EXCEPTION') {
      return theme.palette.error.dark;
    }
    const colors = [theme.palette.success.dark, theme.palette.info.dark, theme.palette.info.light, theme.palette.success.light];
    return colors[idx % colors.length];
  };

  const totalLatency = getTotalLatency(spans);
  const spanLatency = () => {
    if (!spanId) return totalLatency;
    return getTotalLatency(spans.filter((span: any) => span.span_id === spanId));
  };
  return (
    <>
      <MultiProgress
        round={false}
        backgroundColor={theme.palette.background.default}
        height={12}
        elements={spans.map((span: any, idx: number) => {
          return {
            value: (span.latency / totalLatency) * 100,
            color: getColor(idx, span)
          };
        })}
      />
      <Typography variant="caption">{getFormattedValue(spanLatency())}</Typography>
    </>
  );
};

export default TraceSnapshot;
