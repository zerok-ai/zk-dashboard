// material-ui
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface TimeSelectorProps {
  interval: string;
  handleIntervalChange: (e: SelectChangeEvent<string>) => void;
}

const TimeSelector = ({ interval, handleIntervalChange }: TimeSelectorProps) => {
  return (
    <FormControl sx={{ mx: 1, minWidth: 120 }}>
      <Select value={interval} onChange={handleIntervalChange} displayEmpty>
        <MenuItem value="" disabled>
          Select Interval
        </MenuItem>
        {['-5m', '-10m', '-15m'].map((time) => {
          return (
            <MenuItem value={time} key={time}>
              {time}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default TimeSelector;
