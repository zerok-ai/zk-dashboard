// import { useTheme } from '@mui/material/styles';
import { InputAdornment, TextField, Button, SelectChangeEvent, Grid, FormControl } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// types
import { ServicesFilter } from 'types/services';

// project imports
//import SortOptions from 'sections/apps/e-commerce/products/SortOptions';
import MainCard from 'components/MainCard';

// assets
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import TimeSelector from 'components/TimeSelector';

interface ServiceHeaderProps {
  handleDrawerOpen: () => void;
  setFilter: (filter: ServicesFilter) => void;
  filter: ServicesFilter;
  handleRefreshButtonClick: () => void;
  showTimeSelector: boolean;
  interval: string;
  handleIntervalChange: (e: SelectChangeEvent<string>) => void;
}

const ServicesHeader = ({
  filter,
  handleDrawerOpen,
  setFilter,
  handleRefreshButtonClick,
  showTimeSelector,
  interval,
  handleIntervalChange
}: ServiceHeaderProps) => {
  const theme = useTheme();
  // const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  // search filter
  const handleSearch = async (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    const newString = event?.target.value;
    setFilter({ ...filter, search: newString! });
  };

  return (
    <MainCard content={false}>
      <Grid container direction="row" sx={{ m: 1, p: 1 }}>
        <Grid item xs={10} alignItems="center" justifyContent="left">
          <TextField
            sx={{ '& .MuiOutlinedInput-input': { pl: 0 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined style={{ fontSize: 'small' }} />
                </InputAdornment>
              )
            }}
            value={filter.search}
            placeholder="Search Service"
            size="medium"
            onChange={handleSearch}
          />
        </Grid>
        <Grid item xs={2} sx={{ pr: 2 }} display="flex" justifyContent="flex-end">
          {showTimeSelector ? <TimeSelector interval={interval} handleIntervalChange={handleIntervalChange} /> : <></>}
          <FormControl>
            <Button variant={'outlined'} sx={{ borderColor: theme.palette.grey[200], p: 1.6 }} onClick={handleRefreshButtonClick}>
              <ReloadOutlined />
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ServicesHeader;
