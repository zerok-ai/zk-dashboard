// material-ui
import { Box, LinearProgress, LinearProgressProps, Typography } from '@mui/material';
import moment from 'moment';

type LinearWithLabelType = {
  values: number[];
};
// ==============================|| PROGRESS - LINEAR WITH LABEL ||============================== //

export default function LinearWithLabel({ values, ...others }: LinearProgressProps & LinearWithLabelType) {
  const getFormattedValue = (nsValue: number): string => {
    const digits = nsValue.toString().length;
    if (digits <= 3) {
      return Math.round(nsValue) + 'ns';
    } else if (digits <= 6) {
      return Math.round(nsValue / 10 ** (digits - 3)) + 'us';
    } else if (digits <= 9) {
      return Math.round(nsValue / 10 ** (digits - 3)) + 'ms';
    } else {
      return moment.duration(nsValue / 10 ** (digits - 9), 'seconds').humanize();
    }
  };

  const getTotalLatency = () => {
    const sum = values.reduce(function (a, b) {
      return a + b;
    }, 0);
    return sum;
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={getTotalLatency()} {...others} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${getFormattedValue(getTotalLatency())}`}</Typography>
      </Box>
    </Box>
  );
}
