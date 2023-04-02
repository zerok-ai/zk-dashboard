// material-ui
import { Grid, Box, Typography, SelectChangeEvent, Tab, Tabs } from '@mui/material';
import IncomeAreaChart from 'sections/charts/IncomeAreaChart';
import MainCard from 'components/MainCard';
import { useState, useEffect, ReactNode } from 'react';
import { getServiceDetails } from 'store/reducers/services';
import { useParams } from 'react-router-dom';
import { ServiceDetailsType, getTabBarItems } from './service-details-components/service-details-tabcontents';
import TimeSelector from 'components/TimeSelector';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const ServiceDetailsPage = () => {
  const { clusterId, ns, service } = useParams<ServiceDetailsType>();
  const [st, setST] = useState('-5m');

  function handleIntervalChange(e: SelectChangeEvent<string>) {
    setLatencyData([]);
    setHttpData([]);
    setST(e.target.value);
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
    const data = getServiceDetails(clusterId, ns, service, st);
    data.then((value) => {
      if (value) {
        setLatencyData(value.latency);
        setHttpData(value.http);
        setTimeStamps(value.time);
        console.log(value);
      }
    });
  }, [service, ns, st, clusterId]);

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const tabBarItems = getTabBarItems({ clusterId: clusterId || '', ns: ns || '', service: service || '', st });

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
            {service}
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{ pr: 2 }}>
          <TimeSelector interval={st} handleIntervalChange={handleIntervalChange} />
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
      <Grid item xs={12} md={12} lg={12} sx={{ mt: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleChange} variant="fullWidth">
              {tabBarItems.map((tabBarItem, idx: number) => (
                <Tab key={idx} label={tabBarItem.label} icon={tabBarItem.icon} iconPosition="start" {...a11yProps(idx)} />
              ))}
            </Tabs>
          </Box>
          {tabBarItems.map((tabBarItem, idx: number) => (
            <TabPanel value={tabValue} index={idx} key={idx}>
              {tabBarItem.tabContents}
            </TabPanel>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ServiceDetailsPage;
