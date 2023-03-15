import { useTheme } from '@mui/material/styles';
import { InputAdornment, Stack, TextField, useMediaQuery, Button } from '@mui/material';

// types
import { ServicesFilter } from 'types/services';

// project imports
//import SortOptions from 'sections/apps/e-commerce/products/SortOptions';
import MainCard from 'components/MainCard';

// assets
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';

interface ServiceHeaderProps {
  handleDrawerOpen: () => void;
  setFilter: (filter: ServicesFilter) => void;
  filter: ServicesFilter;
  handleRefreshButtonClick: () => void;
}

const ServicesHeader = ({ filter, handleDrawerOpen, setFilter, handleRefreshButtonClick }: ServiceHeaderProps) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  // search filter
  const handleSearch = async (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    const newString = event?.target.value;
    setFilter({ ...filter, search: newString! });
  };

  return (
    <MainCard content={false}>
      <Stack
        direction={matchDownSM ? 'column' : 'row'}
        alignItems={matchDownSM ? 'space-between' : 'center'}
        justifyContent={matchDownSM ? 'center' : 'space-between'}
        sx={{ p: 2 }}
        spacing={2}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
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
          <Button variant={'outlined'} color={'secondary'} size={'large'} onClick={handleRefreshButtonClick} sx={{ ml: 4, p: 1.4 }}>
            <ReloadOutlined />
          </Button>
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default ServicesHeader;
