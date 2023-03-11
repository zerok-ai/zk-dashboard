// material-ui
import { Grid, Box, Typography } from '@mui/material';
import IncomeAreaChart from 'sections/charts/IncomeAreaChart';
import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';
import { getServiceDetails } from 'store/reducers/services';
import { useParams } from 'react-router-dom';

const ServiceDetailsPage = () => {
  const { ns, name } = useParams();
  const [latencyData, setLatencyData] = useState([
    {
      name: '',
      data: [0]
    }
  ]);

  useEffect(() => {
    const data = getServiceDetails(ns, name);
    data.then((value) => {
      if (value) {
        setLatencyData(value);
        console.log(value);
      }
    });
  }, [name, ns]);

  return (
    <Grid container rowSpacing={1} columnSpacing={3}>
      <Grid item xs={12} md={6} lg={6}>
        <Grid item>
          <Typography variant="h5">Latency data</Typography>
        </Grid>
        <Grid item xs={12}>
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <Box sx={{ pt: 1, pr: 2 }}>
              <IncomeAreaChart series={latencyData} />
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
              <IncomeAreaChart series={latencyData} />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ServiceDetailsPage;
