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
      data: [] as number[]
    }
  ]);

  const [httpData, setHttpData] = useState([
    {
      name: '',
      data: [] as number[]
    }
  ]);

  const [connsData, setConnsData] = useState([
    {
      name: '',
      data: [] as number[]
    }
  ]);

  const [timeStamps, setTimeStamps] = useState([] as string[]);

  useEffect(() => {
    const data = getServiceDetails(ns, name);
    data.then((value) => {
      if (value) {
        setLatencyData(value.latency);
        setHttpData(value.http);
        setConnsData(value.conns);
        setTimeStamps(value.time);
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
              <IncomeAreaChart series={latencyData} timeStamps={timeStamps} />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Grid item>
          <Typography variant="h5">Http data</Typography>
        </Grid>
        <Grid item xs={12}>
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <Box sx={{ pt: 1, pr: 2 }}>
              <IncomeAreaChart series={httpData} timeStamps={timeStamps} />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Grid item>
          <Typography variant="h5">Conns data</Typography>
        </Grid>
        <Grid item xs={12}>
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <Box sx={{ pt: 1, pr: 2 }}>
              <IncomeAreaChart series={connsData} timeStamps={timeStamps} />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ServiceDetailsPage;
