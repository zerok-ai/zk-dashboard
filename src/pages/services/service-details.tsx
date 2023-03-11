// material-ui
import { Grid, Box, Typography, FormControl, Select, MenuItem, ListItemIcon, SelectChangeEvent } from '@mui/material';
import IncomeAreaChart from 'sections/charts/IncomeAreaChart';
import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';
import { getServiceDetails } from 'store/reducers/services';
import { useParams } from 'react-router-dom';
import { CheckCircleOutlined } from '@ant-design/icons';

const ServiceDetailsPage = () => {
  const { ns, name } = useParams();
  const [interval, setInterval] = useState('-5m');

  function handleIntervalChange(e: SelectChangeEvent<string>) {
    setLatencyData([]);
    setHttpData([]);
    setInterval(e.target.value);
  }

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

  const [timeStamps, setTimeStamps] = useState([] as string[]);

  useEffect(() => {
    const data = getServiceDetails(ns, name, interval);
    data.then((value) => {
      if (value) {
        setLatencyData(value.latency);
        setHttpData(value.http);
        setTimeStamps(value.time);
        console.log(value);
      }
    });
  }, [name, ns, interval]);

  return (
    <Grid container rowSpacing={1} columnSpacing={3}>
      <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ mb: 3, ml: 3 }}>
        <Grid item xs={11} sx={{ pr: 2 }}>
          <Typography variant="subtitle1" color="GrayText">
            {ns}/
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'block',
              textDecoration: 'none'
            }}
          >
            {name}
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{ pr: 2 }}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select value={interval} onChange={handleIntervalChange} displayEmpty>
              <MenuItem value="" disabled>
                Select Interval
              </MenuItem>
              <MenuItem value={'-5m'}>
                <ListItemIcon color="success">
                  <CheckCircleOutlined />
                </ListItemIcon>
                -5m
              </MenuItem>
              <MenuItem value={'-10m'}>
                <ListItemIcon color="success">
                  <CheckCircleOutlined />
                </ListItemIcon>
                -10m
              </MenuItem>
              <MenuItem value={'-15m'}>
                <ListItemIcon color="success">
                  <CheckCircleOutlined />
                </ListItemIcon>
                -15m
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Grid item>
          <Typography variant="h4">Latency data</Typography>
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
    </Grid>
  );
};

export default ServiceDetailsPage;
