// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Chip, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// types
import { ServicesFilter } from 'types/services';

// project imports
//import ColorOptions from './ColorOptions';
import IconButton from 'components/@extended/IconButton';

// assets
import { CloseOutlined } from '@ant-design/icons';

// ==============================|| SERVICE GRID - FILTER VIEW ||============================== //

interface ServiceFilterViewProps {
  filter: ServicesFilter;
  initialState: ServicesFilter;
  filterIsEqual: (initialState: ServicesFilter, filter: ServicesFilter) => boolean;
  handelFilter: (type: string, params: string, rating?: number) => void;
}

const ServiceFilterView = ({ filter, filterIsEqual, handelFilter, initialState }: ServiceFilterViewProps) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      {!filterIsEqual(initialState, filter) && (
        <Stack spacing={2}>
          <Typography variant="h5">Active Filters</Typography>
          {!(initialState.search === filter.search) && (
            <Grid item>
              <Stack direction="row" alignItems="center" sx={{ ml: '-10px' }}>
                <Chip
                  size={matchDownMD ? 'small' : undefined}
                  label={filter.search}
                  sx={{
                    borderRadius: '4px',
                    textTransform: 'capitalize',
                    color: `grey.500`,
                    bgcolor: 'inherit',
                    '& .MuiSvgIcon-root': { color: `grey` }
                  }}
                />
                <IconButton
                  color="secondary"
                  size="small"
                  sx={{ '&:hover': { bgcolor: 'transparent' }, ml: -1.5 }}
                  onClick={() => handelFilter('search', '')}
                >
                  <CloseOutlined />
                </IconButton>
              </Stack>
            </Grid>
          )}
          <Grid item>
            <Button variant="text" color="primary" sx={{ ml: '-10px' }} onClick={() => handelFilter('reset', '')}>
              Reset all filters
            </Button>
          </Grid>
          <Grid item>
            <Divider sx={{ ml: '-8%', mr: '-8%' }} />
          </Grid>
        </Stack>
      )}
    </>
  );
};

export default ServiceFilterView;
