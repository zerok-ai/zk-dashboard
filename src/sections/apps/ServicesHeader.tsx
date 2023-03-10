import { useTheme } from '@mui/material/styles';
import { InputAdornment, Stack, TextField, useMediaQuery } from '@mui/material';

// types
import { ServicesFilter } from 'types/services';

// project imports
//import SortOptions from 'sections/apps/e-commerce/products/SortOptions';
import MainCard from 'components/MainCard';

// assets
import { SearchOutlined } from '@ant-design/icons';

interface ServiceHeaderProps {
  handleDrawerOpen: () => void;
  setFilter: (filter: ServicesFilter) => void;
  filter: ServicesFilter;
}

const ServicesHeader = ({ filter, handleDrawerOpen, setFilter }: ServiceHeaderProps) => {
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
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5}>
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
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default ServicesHeader;
