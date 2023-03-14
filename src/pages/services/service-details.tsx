// material-ui
import { Grid, Box, Typography, FormControl, Select, MenuItem, SelectChangeEvent, Tab, Tabs } from '@mui/material';
import IncomeAreaChart from 'sections/charts/IncomeAreaChart';
import MainCard from 'components/MainCard';
import { useState, useEffect, ReactNode } from 'react';
import { getServiceDetails } from 'store/reducers/services';
import { useParams } from 'react-router-dom';
import { NodeIndexOutlined, IssuesCloseOutlined, BarChartOutlined, AlertOutlined, MenuOutlined } from '@ant-design/icons';

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
  const { clusterId, ns, name } = useParams();
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
    const data = getServiceDetails(clusterId, ns, name, interval);
    data.then((value) => {
      if (value) {
        setLatencyData(value.latency);
        setHttpData(value.http);
        setTimeStamps(value.time);
        console.log(value);
      }
    });
  }, [name, ns, interval, clusterId]);

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
              {['-5m', '-10m', '-15m'].map((time) => {
                return (
                  <MenuItem value={time} key={time}>
                    {time}
                  </MenuItem>
                );
              })}
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
      <Grid item xs={12} md={12} lg={12} sx={{ mt: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
              <Tab label="Traces" icon={<NodeIndexOutlined />} iconPosition="start" {...a11yProps(0)} />
              <Tab label="Issues" icon={<IssuesCloseOutlined />} iconPosition="start" {...a11yProps(1)} />
              <Tab label="Metrics" icon={<BarChartOutlined />} iconPosition="start" {...a11yProps(2)} />
              <Tab label="Logs & Events" icon={<MenuOutlined />} iconPosition="start" {...a11yProps(3)} />
              <Tab label="Alers" icon={<AlertOutlined />} iconPosition="start" {...a11yProps(4)} />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <Typography variant="h6">Traces data to be shown here.</Typography>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6">Issues to be shown here.</Typography>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6">Metrics to be shown here.</Typography>
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <Typography variant="h6">Logs & Events to be shown here.</Typography>
          </TabPanel>
          <TabPanel value={tabValue} index={4}>
            <Typography variant="h6">Alerts to be shown here.</Typography>
          </TabPanel>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ServiceDetailsPage;
