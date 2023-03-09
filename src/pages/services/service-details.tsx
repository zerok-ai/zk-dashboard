// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// ==============================|| SAMPLE PAGE ||============================== //

const ServiceDetailsPage = () => (
  <Grid container spacing={1} direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '50vh', py: 2 }}>
    <Grid item xs={12}>
      <Stack spacing={2} justifyContent="center" alignItems="center">
        <Typography align="center" variant="h1">
          Service Details Under Construction.
        </Typography>
        <Typography color="textSecondary" align="center" sx={{ width: '85%' }}>
          Hey! Please check out this site later. We are working on it right now.
        </Typography>
      </Stack>
    </Grid>
  </Grid>
);

export default ServiceDetailsPage;
