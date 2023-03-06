// material-ui
import { Box, Grid, Stack, Typography } from '@mui/material';

// project import

// assets
import construction from 'assets/images/maintenance/under-construction.svg';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
  <Grid container spacing={1} direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '50vh', py: 2 }}>
    <Grid item xs={12}>
      <Box sx={{ width: { xs: 300, sm: 480 } }}>
        <img src={construction} alt="mantis" style={{ width: '100%', height: 'auto' }} />
      </Box>
    </Grid>
    <Grid item xs={12}>
      <Stack spacing={2} justifyContent="center" alignItems="center">
        <Typography align="center" variant="h1">
          Under Construction
        </Typography>
        <Typography color="textSecondary" align="center" sx={{ width: '85%' }}>
          Hey! Please check out this site later. We are doing some maintenance on it right now.
        </Typography>
      </Stack>
    </Grid>
  </Grid>
);

export default SamplePage;
