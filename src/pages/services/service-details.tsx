// material-ui
import { Grid, Box, Typography } from '@mui/material';
import IncomeAreaChart from 'sections/charts/IncomeAreaChart';
import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';

const ServiceDetailsPage = () => {
  const [seriesData, setSeriesData] = useState([
    {
      name: '',
      data: [0]
    }
  ]);
  useEffect(() => {
    setSeriesData([
      {
        name: 'Page Views',
        data: [31, 40, 28, 51, 42, 109, 100]
      },
      {
        name: 'Sessions',
        data: [11, 32, 45, 32, 34, 52, 41]
      }
    ]);
  }, []);

  return (
    <Grid container rowSpacing={1} columnSpacing={3}>
      <Grid item xs={12} md={6} lg={6}>
        <Grid item>
          <Typography variant="h5">Example Data</Typography>
        </Grid>
        <Grid item xs={12}>
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <Box sx={{ pt: 1, pr: 2 }}>
              <IncomeAreaChart slot="week" series={seriesData}/>
            </Box>
          </MainCard>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Grid item>
          <Typography variant="h5">Other Example Data</Typography>
        </Grid>
        <Grid item xs={12}>
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <Box sx={{ pt: 1, pr: 2 }}>
              <IncomeAreaChart slot="week" series={seriesData}/>
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ServiceDetailsPage;
