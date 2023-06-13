// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| PRODUCT - NO/EMPTY FILTER ITEMS ||============================== //

interface ServiceEmptyProps {
  handelFilter: () => void;
}

const ServiceEmpty = ({ handelFilter }: ServiceEmptyProps) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <MainCard content={false}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={3}
        sx={{ my: 3, height: { xs: 'auto', md: 'calc(100vh - 240px)' }, p: { xs: 2.5, md: 'auto' } }}
      >
        <Grid item>
          <Stack spacing={0.5}>
            <Typography variant={matchDownMD ? 'h3' : 'h1'} color="inherit">
              There is no Service.
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ServiceEmpty;
