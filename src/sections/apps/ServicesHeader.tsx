// import { useTheme } from '@mui/material/styles';
import { InputAdornment, TextField, Button, SelectChangeEvent, Grid } from '@mui/material';

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
  // const theme = useTheme();
  // const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  // search filter
  const handleSearch = async (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    const newString = event?.target.value;
    setFilter({ ...filter, search: newString! });
  };

  return (
    <MainCard content={false}>
      <Grid container direction="row" alignItems="center" justifyContent="left" sx={{ m: 1, p: 1 }}>
        <Grid item xs={9.5}>
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
        <Grid item xs={1.5} alignItems="center">
          {showTimeSelector ? <TimeSelector interval={interval} handleIntervalChange={handleIntervalChange} /> : <></>}
        </Grid>
        <Grid item xs={1} alignItems="center">
          <Button variant={'outlined'} color={'secondary'} size={'large'} onClick={handleRefreshButtonClick}>
            <ReloadOutlined />
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ServicesHeader;
